// var express = require('express');
// var app = express();
//
// app.use(express.static(__dirname + "/public" ));
//
// app.get('/',(req,res) => {
//     res.redirect('index.html');
// });

// var firebase = require(firebase/)
//
// var config = {
//     apiKey: "AIzaSyCfCMSzugyV69uoSyh3LidMRSNvhJ7iHpo",
//     authDomain: "watchtogether-555f5.firebaseapp.com",
//     databaseURL: "https://watchtogether-555f5.firebaseio.com",
//     projectId: "watchtogether-555f5",
//     storageBucket: "watchtogether-555f5.appspot.com",
//     messagingSenderId: "382915300377",
//     appId: "1:382915300377:web:a869162cebcab92e962e88",
//     measurementId: "G-7E1KVTNEEV"
//   };
//
//   var connections  = 0;
//
//   firebase.initializeApp(config);
//
//     // Get a reference to the database service
//     // var database = firebase.database();

  // var connectedRef = firebase.database().ref(".info/connected");
  //
  // connectedRef.on("value", (snap) => {
  //   if (snap.val() === true) {
  //     connections++;
  //     console.log('Connected: %s connections', connections);
  //   } else {
  //     connections--;
  //     console.log('Disconnected: %s connections', connections);
  //   }
  // });
  //
  //
  // var refPlay  = firebase.database().ref().child('Play');
  // refPlay.on('value', snap => {
  //   console.log(snap.val());
  //   if(snap.val() === 'True') {
  //       player.playVideo();
  //   }
  // });
  //
  // var refPause = firebase.database().ref().child('Pause');
  // refPause.on('value', snap => {
  //   console.log(snap.val());
  //   if(snap.val() === 'True') {
  //     player.pauseVideo();
  //   }
  // });
  //
  // var refSeekTime = firebase.database().ref().child('SeekTime');
  // refSeekTime.on('value', snap => {
  //   console.log(snap.val());
  //   var vidTime = player.getCurrentTime();
  //   if (vidTime < snap.val() - 0.2 || vidTime > snap.val() + 0.2) {
  //     player.seekTo(snap.val());
  //     player.playVideo();
  //   }
  // });