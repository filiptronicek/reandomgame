//  function Strt() {

//}
var svg = ' <div id="nextround" style="display: inline;"><div class="wrapper"> <a class="cta"  href="index.html"> <span>Další kolo</span> <span> <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path> <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path> </g> </svg> </span> </a></div></div>';
var msg;
var gmfld = document.getElementById("gamefield");
var gameover = document.getElementById("gameover");
var nextround = document.getElementById("nextround");
var stop = true;

var rndbodHeight = parseInt($("#rndbod").height())/2;
var playgroundHeight = parseInt($("#playground").css("height"));
var playgroundWidth = parseInt($("#playground").css("width"));

var rychlost = 10;
var rychlostEnemy = 6;
var enemyCountDown = 0;
var rndDir;

var enemyCountDownSec = 0;
var rndDirSec;

$("#rndbod").css("left", Math.floor(Math.random() * (playgroundWidth - rndbodHeight*2)));
$("#rndbod").css("top", Math.floor(Math.random() *  (playgroundHeight - rndbodHeight*2)));

$("#rndbodsec").css("left", Math.floor(Math.random() * (playgroundWidth - rndbodHeight*2)));
$("#rndbodsec").css("top", Math.floor(Math.random() *  (playgroundHeight - rndbodHeight*2)));

var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

var rndhra = {
    score : 0
}
rndhra.pressedKeys = [];

generate();

$(function(){
    rndhra.timer = setInterval(gameloop, 30);
    $(document).keydown(function(e){
        rndhra.pressedKeys[e.which] = true;
    });
    $(document).keyup(function(e){
        rndhra.pressedKeys[e.which] = false;
    })
});

function Fun() {
    if(rndhra.score < 20 && rndhra.score > 5) {
var msg = "<img src='logo.png' width='100%' height='100%'><h1> Game OVER </h1><br /> <p id='gmvrmsg'> V tomto kole jsi nasbíral "+ rndhra.score+ " bodů. Není to špatné, ale dá se to ještě zlepšit."
} else if (rndhra.score > 20) {
var msg = "<img src='logo.png' width='100%' height='100%'><h1> Game OVER </h1><br /> <p id='gmvrmsg'> V tomto kole jsi nasbíral "+ rndhra.score+ " bodů. Velmi dobrý výsledek. Gratulace. ";
} else if (rndhra.score < 6) {
var msg = "<img src='logo.png' width='100%' height='100%'><h1> Game OVER </h1><br /> <p id='gmvrmsg'> V tomto kole jsi nasbíral "+ rndhra.score+ " bodů. Cos dělal kámo?! ";
}

  gamefield.style.display = "none";
  gameover.innerHTML = msg;
  gameover.innerHTML += svg;

  rychlost = 0;
  stop = true;
  var gameoversound = new Audio("Game over.flac"); // buffers automatically when created
gameoversound.play();

    
}

var fixed = document;

fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

}, false);

function ProgressCountdown(timeleft, bar, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
      }
    }, 1000);
  });
}
/*var playeravatar;
var avatar = Math.floor(Math.random() * 2);
var avatar0 = "enemy.png";
var avatar1 = "puma.jpg";
var avatar2 = "shark-bite.png";

if(avatar == 0) {
    var playeravatar = avatar0;
    document.getElementById("hrac").innerHTML += '<img src="'+playeravatar'" width="100%" height="100%">';

}
if(avatar == 1) {
    var playeravatar = avatar1;
    document.getElementById("hrac").innerHTML += '<img src="'+playeravatar'" width="100%" height="100%">';

}
if(avatar == 2) {
    var playeravatar = avatar2;
    document.getElementById("hrac").innerHTML += '<img src="'+playeravatar'" width="100%" height="100%">';

}

alert(playeravatar)
*/
function gameloop(){

    if((rndhra.pressedKeys[KEY.UP] || rndhra.pressedKeys[KEY.DOWN] || rndhra.pressedKeys[KEY.LEFT] || rndhra.pressedKeys[KEY.RIGHT]) && stop)
    {
        ProgressCountdown(60, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => Fun());
        stop = false;
    }
    generate();
    movePlayer();
    moveEnemy();
}

function movePlayer(){
    if (rndhra.pressedKeys[KEY.UP]){
        var top = parseInt($("#hrac").css("top"));
        if(top > 0){
            $("#hrac").css("top", top-rychlost);
        }
    }

    if (rndhra.pressedKeys[KEY.DOWN]){
        var top = parseInt($("#hrac").css("top"));
        var bottom = parseInt($("#playground").css("height"));
        var hrac = parseInt($(".hrac").css("height"));
        if(top+hrac < bottom){
            $("#hrac").css("top", top+rychlost);
        }
    }

    if (rndhra.pressedKeys[KEY.LEFT]){
        var left = parseInt($("#hrac").css("left"));
        if(left > 0){
            $("#hrac").css("left", left-rychlost);
        }
    }

    if (rndhra.pressedKeys[KEY.RIGHT]){
        var left = parseInt($("#hrac").css("left"));
        var right = parseInt($("#playground").css("width"));
        var hrac = parseInt($(".hrac").css("height"));
        if(left+hrac < right){
            $("#hrac").css("left", left+rychlost);
        }
    }
}

function generate(){
    var rndbodHeight = parseInt($("#rndbod").height())/2;
    var rndbodLeft = parseInt($("#rndbod").css("left"));
    var rndbodTop = parseInt($("#rndbod").css("top"));

    var rndbodsecHeight = parseInt($("#rndbodsec").height())/2;
    var rndbodsecLeft = parseInt($("#rndbodsec").css("left"));
    var rndbodsecTop = parseInt($("#rndbodsec").css("top"));

    var hracHeight = parseInt($("#hrac").height())/2;
    var hracLeft = parseInt($("#hrac").css("left"));
    var hracTop = parseInt($("#hrac").css("top"));

    var playgroundHeight = parseInt($("#playground").css("height"));
    var playgroundWidth = parseInt($("#playground").css("width"));

    if( Math.abs((hracLeft + hracHeight) - (rndbodLeft + rndbodHeight)) <= (rndbodHeight + hracHeight) && Math.abs((hracTop + hracHeight) - (rndbodTop + rndbodHeight)) <= (rndbodHeight + hracHeight) ){
        rndhra.score++;
        var point = new Audio("Laser_Gun.wav"); // buffers automatically when created
        point.play();

        $("#score").html(rndhra.score);
        $("#rndbod").css("left", Math.floor(Math.random() * (playgroundWidth - rndbodHeight*2)));
        $("#rndbod").css("top", Math.floor(Math.random() *  (playgroundHeight - rndbodHeight*2)));
    }

    if( Math.abs((hracLeft + hracHeight) - (rndbodsecLeft + rndbodsecHeight)) <= (rndbodsecHeight + hracHeight) && Math.abs((hracTop + hracHeight) - (rndbodsecTop + rndbodsecHeight)) <= (rndbodsecHeight + hracHeight) ){
        rndhra.score++;
        var point = new Audio("Laser_Gun.wav"); // buffers automatically when created
        point.play();

        $("#score").html(rndhra.score);
        $("#rndbodsec").css("left", Math.floor(Math.random() * (playgroundWidth - rndbodHeight*2)));
        $("#rndbodsec").css("top", Math.floor(Math.random() *  (playgroundHeight - rndbodHeight*2)));
    }
}

function moveEnemy(){
    var enemysecondHeight = parseInt($("#enemysecond").height())/2;
    var enemysecondLeft = parseInt($("#enemysecond").css("left"));
    var enemysecondTop = parseInt($("#enemysecond").css("top"));

    var enemyHeight = parseInt($("#enemy").height())/2;
    var enemyLeft = parseInt($("#enemy").css("left"));
    var enemyTop = parseInt($("#enemy").css("top"));

    var hracHeight = parseInt($("#hrac").height())/2;
    var hracLeft = parseInt($("#hrac").css("left"));
    var hracTop = parseInt($("#hrac").css("top"));
    
    var playgroundHeight = parseInt($("#playground").css("height"));
    var playgroundWidth = parseInt($("#playground").css("width"));

    if( Math.abs((hracLeft + hracHeight) - (enemysecondLeft + enemysecondHeight)) <= (enemysecondHeight + hracHeight) && Math.abs ((hracTop + hracHeight) - (enemysecondTop + enemysecondHeight)) <= (enemysecondHeight + hracHeight) ){
        Fun();
    }

     if( Math.abs((hracLeft + hracHeight) - (enemyLeft + enemyHeight)) <= (enemyHeight + hracHeight) && Math.abs ((hracTop + hracHeight) - (enemyTop + enemyHeight)) <= (enemyHeight + hracHeight) ){
        Fun();
    }

    if(enemyCountDown < 1){
        enemyCountDown = Math.random()*Math.random()*1000;
        rndDir = Math.random();
    }
    enemyCountDown--;       
    if (rndDir >= 0 && rndDir < 0.25){
        var top = parseInt($("#enemy").css("top"));
        if(top > 0){
            $("#enemy").css("top", top-rychlostEnemy);
        }
        else
        {
            rndDir = 0.25;
            enemyCountDown = 100;
        }
    }
    if (rndDir >= 0.25 && rndDir < 0.5){
        var top = parseInt($("#enemy").css("top"));
        var bottom = parseInt($("#playground").css("height"));
        var enemy = parseInt($(".enemy").css("height"));
        if(top+enemy < bottom){
            $("#enemy").css("top", top+rychlostEnemy);
        }
        else
        {
            rndDir = 0;
            enemyCountDown = 100;
        }
    }
    if (rndDir >= 0.5 && rndDir < 0.75){
        var left = parseInt($("#enemy").css("left"));
        if(left > 0){
            $("#enemy").css("left", left-rychlostEnemy);
        }
        else
        {
            rndDir = 0.75;
            enemyCountDown = 100;
        }
    }
    if (rndDir >= 0.75 && rndDir <= 1){
        var left = parseInt($("#enemy").css("left"));
        var right = parseInt($("#playground").css("width"));
        var enemy = parseInt($(".enemy").css("height"));
        if(left+enemy < right){
            $("#enemy").css("left", left+rychlostEnemy);
        }
        else
        {
            rndDir = 0.5;
            enemyCountDown = 100;
        }
    }

    //second enemy

    if(enemyCountDownSec < 1){
        enemyCountDownSec = Math.random()*Math.random()*1000;
        rndDirSec = Math.random();
    }
    enemyCountDownSec--;       
    if (rndDirSec >= 0 && rndDirSec < 0.25){
        var top = parseInt($("#enemysecond").css("top"));
        if(top > 0){
            $("#enemysecond").css("top", top-rychlostEnemy);
        }
        else
        {
            rndDirSec = 0.25;
            enemyCountDownSec = 100;
        }
    }
    if (rndDirSec >= 0.25 && rndDirSec < 0.5){
        var top = parseInt($("#enemysecond").css("top"));
        var bottom = parseInt($("#playground").css("height"));
        var enemy = parseInt($(".enemysecond").css("height"));
        if(top+enemy < bottom){
            $("#enemysecond").css("top", top+rychlostEnemy);
        }
        else
        {
            rndDirSec = 0;
            enemyCountDownSec = 100;
        }
    }
    if (rndDirSec >= 0.5 && rndDirSec < 0.75){
        var left = parseInt($("#enemysecond").css("left"));
        if(left > 0){
            $("#enemysecond").css("left", left-rychlostEnemy);
        }
        else
        {
            rndDirSec = 0.75;
            enemyCountDownSec = 100;
        }
    }
    if (rndDirSec >= 0.75 && rndDirSec <= 1){
        var left = parseInt($("#enemysecond").css("left"));
        var right = parseInt($("#playground").css("width"));
        var enemy = parseInt($(".enemysecond").css("height"));
        if(left+enemy < right){
            $("#enemysecond").css("left", left+rychlostEnemy);
        }
        else
        {
            rndDirSec = 0.5;
            enemyCountDownSec = 100;
        }
    }




}
