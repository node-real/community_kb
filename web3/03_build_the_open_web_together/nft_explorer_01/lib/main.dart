import 'dart:convert';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NFT Explorer',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.purple,
      ),
      home: const MyHomePage(title: 'NodeReal NFT Explorer Tutorials'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  String _nft_address = "";
  String _nft_tokenid = "";

  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final nftAddController = TextEditingController();
  final nftTokenIDController = TextEditingController();

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  void _retrieveNFTMetadata(){
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen
      _nft_address = nftAddController.text;
      _nft_tokenid = nftTokenIDController.text;
      // showDialog(
      //       context: context,
      //       builder: (context) {
      //         return AlertDialog(
      //           // Retrieve the text the that user has entered by using the
      //           // TextEditingController.
      //           content: Text(_nft_address),
      //         );
      //       },
      //     );
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called.
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Container(
        // const Image(
        //       image: NetworkImage('https://www.nodereal.io/static/nodereal/images/home/logo-nodereal.png'),
        // )
        child: Column(
          children: [
            Image(
              image: NetworkImage('https://www.nodereal.io/static/nodereal/images/home/logo-nodereal.png'),
            ),
            TextField(
              decoration: new InputDecoration(
                border: new OutlineInputBorder(
                  borderSide: new BorderSide(color: Colors.teal)
                  ),
                  hintText: 'Your NFT Contract Address',
                  labelText: 'Address'
              ),
              controller: nftAddController,
            ),
            SizedBox(height: 5),
            TextField(
              decoration: new InputDecoration(
                border: new OutlineInputBorder(
                  borderSide: new BorderSide(color: Colors.teal)
                  ),
                  hintText: 'NFT TokenID 0x:',
                  labelText: 'TokenID'
              ),
              controller: nftTokenIDController,
            ),
            SizedBox(height: 5),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _retrieveNFTMetadata,
        tooltip: 'Query',
        child: const Icon(Icons.send),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
