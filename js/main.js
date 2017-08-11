var trackIds = [];

/* gen boxes */

$stage = $('#stage');
var x = -115;
var y = -115;

var standingPosition = [1,1]

while (y < $stage.height() - 230) {
    y = y + 230;
    simpleY = parseInt((y/230)+1);

    while (x < $stage.width() - 230) {
        x = x + 230;
        simpleX = parseInt((x/230)+1);

        var divId = 'box-'+simpleX+'-'+simpleY;
        trackIds.push(divId);

        $stage.append('<div id="'+divId+'" class="box" data-x='+x/115+' data-y='+y/115+' style="left:'+x+'px;top:'+y+'px;">box-'+simpleX+'-'+simpleY+'</div>');

    }
    x = -115;
}

/* animate gamer */
var backPosX = 0;
var moving = false;

function gamerMove() {
    backPosX = backPosX + 115;
    if (backPosX > 690) {
        backPosX = 0;
    }
    $('#gamer div').css('background-position-x',-backPosX+'px');

    if(moving === true) {
        setTimeout(gamerMove, 200);
    }
}

/* move gamer */
var gamerX = 0;
var gamerY = 0;

function updateGamerPos() {
    $('#gamer').css('left', gamerX+'px');
    $('#gamer').css('top', gamerY+'px');
}

/* event handlers */
$(document).keydown(function(e) {

    if (moving === false) {
        moving = true;
        gamerMove();
        setTimeout(function(){moving = false}, 250);
    }

    //event handlers
    //left
    if (e.keyCode == 37) {
        $('#gamer div').css('background-position-y','-230px');
        gamerX = gamerX - 115;
    }
    //right
    if (e.keyCode == 39) {
        $('#gamer div').css('background-position-y','-345px');
        gamerX = gamerX + 115;
    }
    //up
    if (e.keyCode == 38) {
        $('#gamer div').css('background-position-y','-115px');
        gamerY = gamerY - 115;
    }
    //down
    if (e.keyCode == 40) {
        $('#gamer div').css('background-position-y','0');
        gamerY = gamerY + 115;
    }

    standingPosition = [gamerX/115,gamerY/115];
    updateGamerPos();
    updateGameVol();
});

$(function(){
    cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
        alert('Pro gamer status confirmed!');
    });
});

/*youtube*/
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = [];

var videos = [{
    name:   'Frogger',
    idkey:  'l9fO-YuWPSk',
}, {
    name:   'Donkey Kong',
    idkey:  'Pp2aMs38ERY',
}, {
    name:   'Popeye',
    idkey:  'hErObuqvlHs',
}, {
    name:   'Centipede',
    idkey:  'V7XEmf02zEM',
}, {
    name:   'Galaga',
    idkey:  'CbPJhLpunXw',
}, {
    name:   'Commando',
    idkey:  '1qctKI_t5eY',
}, {
    name:   'Joust',
    idkey:  'BWoiLNri0OM',
}, {
    name:   'Tempest',
    idkey:  'G2Sv28sYUZc',
}, {
    name:   'Qbert',
    idkey:  'karPYs22ACc',
}, {
    name:   'Zaxxon',
    idkey:  'ul2vX8-dmTA',
}, {
    name:   'Spy Hunter',
    idkey:  'h34MviiKXXc',
}, {
    name:   'Jungle Hunt',
    idkey:  'DlKi0Is0nGQ'
}];

/* shuffle function */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
videos = shuffle(videos);

/* calculate distance away */
var distanceAway;
function calculateDistance(x,y) {
    var a = standingPosition[0] - x;
    var b = standingPosition[1] - y;
    distanceAway = Math.sqrt( a*a + b*b );
    distanceAway = distanceAway.toFixed(2);
    console.log(standingPosition[0],standingPosition[1],distanceAway,x,y);

    var multiplier = 14.14 * distanceAway;
    volume = 100 - multiplier;
    console.log('volume',volume);
    return volume;
}

function updateGameVol() {
    trackIds.forEach(function(event, i){
        var x = $('#'+trackIds[i]).data('x');
        var y = $('#'+trackIds[i]).data('y');
        calculateDistance(x,y);
        player[i].setVolume(volume);
    });

    //console.log('---');
}

/* youtube render videos */
function onYouTubeIframeAPIReady() {
    trackIds.forEach(function(event, i){
        player[i] = new YT.Player(event, {
            height: '115',
            width: '115',
            videoId: videos[i].idkey,
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.setVolume(0);
    event.target.playVideo();
}

// loop videos
function onPlayerStateChange(event){
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}
