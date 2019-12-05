const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;

var playerStatus = -1;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        host: 'https://www.youtube.com',
        videoId: 'eMygau1Yy_0',
        playerVars: {
            autoplay: 0,
            rel: 0,
            controls: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    console.log(document.getElementById('player').src)
}

function onPlayerReady(event) {
    document.getElementById('player').style.borderColor = '#00000000';
}

function onPlayerStateChange(event) {
    playerStatus = event.data;

    // Event Listeners
    switch (playerStatus) {
        case 0:
            // Video Ended
            //do nothing
            break;
        case 1:
            justPlay();
            break;
        case 2:
            justPause();
            break;
        case 3:
            var currTime = player.getCurrentTime();
            justSeek(currTime);
            break;
    }

}

function play() {
    if (playerStatus === -1 || playerStatus === 2) {
        player.playVideo();
    } else {
        player.pauseVideo();
    }
}

function justPlay() {
    firebase.database().ref('Play').set('True');
    firebase.database().ref('Pause').set('False');
    if(playerStatus === -1 || playerStatus === 2) {
        player.playVideo();
    }
    console.log("hi");
}

function justPause() {
    firebase.database().ref('Pause').set("True");
    firebase.database().ref('Play').set('False');
    player.pauseVideo();
    console.log("hihi")
}


function justSeek(currTime) {
    firebase.database().ref('SeekTime').set(currTime);
    var vidTime = player.getCurrentTime();
    if (vidTime < currTime - 0.2 || vidTime > currTime + 0.2) {
        player.seekTo(currTime);
        player.playVideo();
    }
    console.log("hihihih");
}




