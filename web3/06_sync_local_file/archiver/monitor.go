package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/fsnotify/fsnotify"
)

var uploadMutex sync.Mutex

func main() {
	bucketName := "jimmy-bucket"

	if len(os.Args) != 2 {
		fmt.Println("Usage: go run monitor.go <your_folder_path>")
		os.Exit(1)
	}

	folderPath := os.Args[1]
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	done := make(chan bool)
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				filename := filepath.Base(event.Name)
				if event.Op&fsnotify.Write == fsnotify.Write || event.Op&fsnotify.Create == fsnotify.Create {
					log.Println("modified file:", event.Name)
					uploadFileToGreenfield(folderPath, event.Name, bucketName)
				} else if event.Op&fsnotify.Remove == fsnotify.Remove {
					log.Println("deleted file:", event.Name)
					deleteFileFromGreenfield(filename, bucketName)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println("error:", err)
			}
		}
	}()

	err = watcher.Add(folderPath)
	if err != nil {
		log.Fatal(err)
	}
	<-done
}

func deleteFileFromGreenfield(filename string, bucketName string) {
	uploadMutex.Lock()
	defer uploadMutex.Unlock()

	cmd := exec.Command("./gnfd/greenfield-cmd/build/gnfd-cmd", "-c", "./gnfd/greenfield-cmd/build/config.toml", "del-obj", fmt.Sprintf("gnfd://%s/%s", bucketName, filename))
	log.Println(cmd.String())
	_, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("Failed to delete object: %s", err)
	}
	time.Sleep(10 * time.Second)
}

func uploadFileToGreenfield(folderPath string, absolutePath string, bucketName string) {
	uploadMutex.Lock()
	defer uploadMutex.Unlock()

	filename := filepath.Base(absolutePath)

	// List the objects in the bucket
	cmd := exec.Command("./gnfd/greenfield-cmd/build/gnfd-cmd", "-c", "./gnfd/greenfield-cmd/build/config.toml", "ls", fmt.Sprintf("gnfd://%s", bucketName))
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("Failed to execute command: %s", err)
	}

	// Check if the object exists in the bucket
	outputStr := string(output)
	log.Println(outputStr)
	if strings.Contains(outputStr, filename) {
		// If the object exists, delete it
		cmd = exec.Command("./gnfd/greenfield-cmd/build/gnfd-cmd", "-c", "./gnfd/greenfield-cmd/build/config.toml", "del-obj", fmt.Sprintf("gnfd://%s/%s", bucketName, filename))
		log.Println(cmd.String())
		_, err = cmd.CombinedOutput()
		if err != nil {
			log.Fatalf("Failed to delete object: %s", err)
		}
	}
	time.Sleep(10 * time.Second)

	// Upload the updated file
	cmd = exec.Command("./gnfd/greenfield-cmd/build/gnfd-cmd", "-c", "./gnfd/greenfield-cmd/build/config.toml", "put", "--visibility", "private", fmt.Sprintf("%s%s", folderPath, filename), fmt.Sprintf("gnfd://%s/%s", bucketName, filename))
	log.Printf(cmd.String())
	output, err = cmd.CombinedOutput()
	if err != nil {
		log.Fatalf("Failed to upload file: %s", err)
		log.Fatalf("Command output: %s", string(output))
		log.Fatalf("Command: %s", cmd.String())
	}
	time.Sleep(10 * time.Second)
}
