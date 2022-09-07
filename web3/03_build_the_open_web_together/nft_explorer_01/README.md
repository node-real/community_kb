# Build your mobile NFT explorer with flutter

The NFT is getting its momentum, and as a develper, you must be very curious how to  build NFT application from scratch. Through this tutorial, you will be able to build your first NFT application for your iPhone from scratch. I will guide you through the journey to build our NFT application with the popular cross-platform framework flutter and NodeReal NFT API. We want to write once, adopt everywhere!

Being blocked to follow up? Follow our twitter and discord to ask any questions you like!

## Getting Started

This project is a starting point for your web3 journey! You will be able to learn the following topics.

1. What is flutter and why it is popular for developers
2. Why you need a NFT API
3. How to use NFT APIs to build your applications.

A few resources to get you started if this is your first Flutter project:

- [NodeReal NFT APIs](https://docs.nodereal.io/nodereal/meganode/api-docs/enhanced-api/nft-api)
- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

## Setup Your Environment

I assume you are using macbook like myself, the first thing you need to do is to install your flutter. 

If you are running a mac with Apple Silicon, the rosetta is a must. 

```shell
sudo softwareupdate --install-rosetta --agree-to-license
```

Download the binary from [link](https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.3.1-stable.zip), and extract the file in the desired location, for example:

```shell
cd ~/development
unzip ~/Downloads/flutter_macos_3.3.1-stable.zip
```

Add the `flutter` tool to your path:

```shell
export PATH="$PATH:`pwd`/flutter/bin"
```

Install XCode from your AppStore. Configure the Xcode command-line tools to use the newly-installed version of Xcode by running the following from the command line:

```shell
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Make sure the Xcode license agreement is signed by either opening Xcode once and confirming or running `sudo xcodebuild -license` from the command line.

## Clone the project





