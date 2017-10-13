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
var gamerX = -115;
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
    //enter
    if (e.keyCode == 13) {
        console.log('gamerX',gamerX,'gamerY',gamerY);
        checkCollisions();
    }  
    //escape
    if (e.keyCode == 27) {
        $('.box').removeClass('box-zoom');
    }        

    standingPosition = [gamerX/115,gamerY/115];
    /*console.log(standingPosition);
    console.log('#box-'+standingPosition[0]+'-'+standingPosition[1]);

    console.log(gamerX,gamerY);
    console.log($('#gamer').offset());
    console.log($('#box-2-1').offset());

    setTimeout(function(){
        $('#box-'+standingPosition[0]+'-'+standingPosition[1]).hide();
    }, 250);*/

    updateGamerPos();
    updateGameVol();
});

/*youtube*/
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoPlayer = [];

var videos = [{
    name:   'Frogger',
    idkey:  'l9fO-YuWPSk',
    volume: 0
}, {
    name:   'Donkey Kong',
    idkey:  'Pp2aMs38ERY',
    volume: 0
}, {
    name:   'Pacman',
    idkey:  'dScq4P5gn4A',
    volume: 0
}, {
    name:   'Ms Packman',
    idkey:  'c4n_6NFYvLY',
    volume: 0
}, {
    name:   'Paperboy',
    idkey:  'l6DEL9GY-VU',
    volume: 0            
}, {
    name:   'Tron',
    idkey:  'GmPbeHCkAmc&t',
    volume: 0
}, {
    name:   'Time Pilot',
    idkey:  'cNv0_wY5jp8',
    volume: 0
}, {    
    name:   'Popeye',
    idkey:  'hErObuqvlHs',
    volume: 0
}, {
    name:   'Centipede',
    idkey:  'V7XEmf02zEM',
    volume: 0
}, {
    name:   'Galaga',
    idkey:  'CbPJhLpunXw',
    volume: 0
}, {
    name:   'Commando',
    idkey:  'iAcGGEd_y6k',
    volume: 0
}, {
    name:   'Joust',
    idkey:  'BWoiLNri0OM',
    volume: 0
}, {
    name:   'Tempest',
    idkey:  'G2Sv28sYUZc',
    volume: 0
}, {
    name:   'Qbert',
    idkey:  'karPYs22ACc',
    volume: 0
}, {
    name:   'Zaxxon',
    idkey:  'ul2vX8-dmTA',
    volume: 0
}, {
    name:   'Spy Hunter',
    idkey:  'h34MviiKXXc',
    volume: 0
}, {
    name:   'Jungle Hunt',
    idkey:  'DlKi0Is0nGQ',
    volume: 0                               
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

/* calculate farthest distance between games */
var farthestDistance;
function farthestDistance() {
    var numberGames = trackIds.length;
    var gamePositionFirst = $('#'+trackIds[0]).offset();
    var gamePositionLast = $('#'+trackIds[numberGames-1]).offset();
    var a =  gamePositionLast.left - gamePositionFirst.left;
    var b =  gamePositionLast.top - gamePositionFirst.top;
    farthestDistance = Math.sqrt( a*a + b*b ) / 115;
    farthestDistance = farthestDistance.toFixed(2);
}


/* calculate game distances away from gamer */
var distanceAway;
var multiplier;
var percentage;
function calculateDistance(x,y,i) {
    var a = standingPosition[0] - x;
    var b = standingPosition[1] - y;
    distanceAway = Math.sqrt( a*a + b*b );
    distanceAway = distanceAway.toFixed(2);
    //console.log(standingPosition[0],standingPosition[1],distanceAway,x,y);
    percentage = 100 / distanceAway;
    multiplier = farthestDistance * distanceAway;
    volume = (100 - multiplier) - 66;
    videos[i].volume = volume;
    //console.log('volume',volume);
    return volume;
}

function updateGameVol() {
    trackIds.forEach(function(event, i){
        var x = $('#'+trackIds[i]).data('x');
        var y = $('#'+trackIds[i]).data('y');
        calculateDistance(x,y,i);
        videoPlayer[i].setVolume(volume);
    }); 
}

function checkCollisions() {
    trackIds.forEach(function(event, i){
        var currentId = '#'+trackIds[i];
        var currentX = $(currentId).attr('data-x');
        var currentY = $(currentId).attr('data-y');
        // Check if gamer position is above a video
        if(currentX == standingPosition[0] && currentY == standingPosition[1]) {
            console.log('match',currentId);
            console.log('volume',volume);
            videoPlayer[i].setVolume(100);
            //videoPlayer[i].setSize(width=1200, height=850);
            $(currentId).addClass('box-zoom');
        }
    });
}

/* youtube render videos */
function onYouTubeIframeAPIReady() {
    //console.log(trackIds[trackIds.length-1]);
    trackIds.forEach(function(event, i){
        videoPlayer[i] = new YT.Player(event, {
            height: '115',
            width: '115',
            videoId: videos[i].idkey,
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    });
    farthestDistance();
}    

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.setVolume(0);
}

// loop videos
function onPlayerStateChange(event){
    if (event.data === YT.PlayerState.ENDED) {
        event.target.playVideo(); 
    }
}
