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

//when user clicks play, set play to true in database and set pause to false in database
function justPlay() {
    firebase.database().ref('Play').set('True');
    firebase.database().ref('Pause').set('False');
    if(playerStatus === -1 || playerStatus === 2) {
        player.playVideo();
    }
    console.log("hi");
}

//when user clicks pause, set pause to true in database and set play to false in database
function justPause() {
    firebase.database().ref('Pause').set("True");
    firebase.database().ref('Play').set('False');
    player.pauseVideo();
    console.log("hihi")
}

//when user seek to new timing, set the seek time to the new timing in database
function justSeek(currTime) {
    firebase.database().ref('SeekTime').set(currTime);
    var vidTime = player.getCurrentTime();
    if (vidTime < currTime - 0.2 || vidTime > currTime + 0.2) {
        player.seekTo(currTime);
        player.playVideo();
    }
    console.log("hihihih");
}

//when user enter a new youtube link and clicks on the change video buttton, save the new video id in database
function changeVideo() {
    var videoURL = document.getElementById("inputVideoId").value;
    console.log(videoURL);
    var idParsed = idParse(videoURL);
    if(idParsed !== "invalid") {
        firebase.database().ref('VideoID').set(idParsed);
        player.loadVideoById(idParsed);
    } else {
        invalidURL(idParsed);
    }

}

//parse the url  user gave to a youtube embedded id for the api
function idParse(url) {
    if (url.includes("https://") || url.includes("http://") || url.includes(".com/")) {
        // Do some string processing with regex
        var myRegex;
        var match;
        if (url.includes("youtu.be")) {
            myRegex = /.+youtu\.be\/([A-Za-z0-9\-_]+)/g;
            match = myRegex.exec(url);
            if (match != null) {
                return match[1];
            }
        } else {
            myRegex = /.+watch\?v=([A-Za-z0-9\-_]+)/g;
            match = myRegex.exec(url);
            if (match != null) {
                return match[1];
            }
        }
        url = "invalid"
    }

    return url;
}

//if user enter invalid youtube url, an invalid pop up alert will be shown
function invalidURL(url) {
    console.log(url);
    window.alert("Invalid Youtube URL");
}




