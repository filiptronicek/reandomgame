console.log(localStorage.mute);
if (highscore !== null) {
	var highscore = localStorage.getItem('highscore');
} else {
	localStorage.setItem('highscore', 0);
}

$(document).on('keyup', function (e) {
	e.preventDefault();
	if (e.which == 9) {
		modal.style.display = 'none';
	}
});

$(document).on('keydown', function (e) {
	e.preventDefault();
	if (e.which == 116) {
		location.href = 'index.html';
	}
});

//score popup (Tabulator)
var modal = document.getElementById('myModal');

var svg = $('#nextround');
svg.hide();

var msg;
var gmfld = $('#gamefield');
var gameover = document.getElementById('gameover');
var nextround = document.getElementById('nextround');
var stop = true;
var logoCode = "<img src='assets/img/logo.png' width='100%' height='100%'>";
var overTxt;


var rndbodHeight = parseInt($('#rndbod').height()) / 2;
var playgroundHeight = parseInt($('#playground').css('height'));
var playgroundWidth = parseInt($('#playground').css('width'));

var gameTime = 60; // in secs
var rychlost = 10;
var rychlostEnemy = 6;
var enemyCountDown = 0;
var rndDir;

var enemyCountDownSec = 0;
var rndDirSec;

function muteMe(elem) {
	elem.muted = true;
	elem.pause();
}

// Try to mute all video and audio elements on the page
function mutePage() {
	var elems = document.querySelectorAll("video, audio");

	[].forEach.call(elems, function (elem) {
		muteMe(elem);
	});
}
if (localStorage.mute !== "true") {
	var gameoversound = new Audio('./assets/sounds/Game over.flac'); // buffers automatically when created
	var point = new Audio('./assets/sounds/Laser_Gun.wav');
} else {
	var gameoversound = new Audio();
	var point = new Audio();
}


$(document).on('keydown', function (e) {
	e.preventDefault();
	if (e.which == 9) {
		modal.style.display = 'block';
	}
});
$(document).ready(function () {
	$('#rndbod').css('left', Math.floor(Math.random() * (playgroundWidth - rndbodHeight * 2)));
	$('#rndbod').css('top', Math.floor(Math.random() * (playgroundHeight - rndbodHeight * 2)));

	$('#rndbodsec').css('left', Math.floor(Math.random() * (playgroundWidth - rndbodHeight * 2)));
	$('#rndbodsec').css('top', Math.floor(Math.random() * (playgroundHeight - rndbodHeight * 2)));

	var KEY = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	};

	var rndhra = {
		score: 0
	};
	rndhra.pressedKeys = [];

	generate();

	$(function () {
		rndhra.timer = setInterval(gameloop, 30);
		$(document).keydown(function (e) {
			rndhra.pressedKeys[e.which] = true;
		});
		$(document).keyup(function (e) {
			rndhra.pressedKeys[e.which] = false;
		});
	});

	var Fun = (function () {
		var executed = false;
		return function () {
			if (!executed) {
				executed = true;
				// do something
				overTxt =
					"<h1> Game OVER </h1><br /> <p id='gmvrmsg'> In this round you got " + rndhra.score + ' points.';
				if (rndhra.score < 35 && rndhra.score > 5) {
					var msg = logoCode + overTxt + "That's not bad, but it can be better.";
				} else if (rndhra.score > 35) {
					var msg = logoCode + overTxt + 'Very good result. Congratulations. ';
				} else if (rndhra.score < 6 && rndhra.score != 1) {
					var msg = logoCode + overTxt + ' Dude, what were you doing?! ';
				} else if (rndhra.score == 1) {
					var msg =
						logoCode +
						"<h1> Game OVER </h1><br /> <p id='gmvrmsg'> In this round you got just " +
						rndhra.score +
						' point.' +
						' Dude, what were you doing?! ';
				}

				svg.show();

				gmfld.hide();
				gameover.innerHTML += msg;

				rychlost = 0;
				rychlostEnemy = 0;
				stop = true;

				if (localStorage.mute !== "true") gameoversound.play();
				console.log('Game Over');
				var score = rndhra.score;

				if (highscore !== null) {
					if (score > highscore) {
						localStorage.setItem('highscore', score);
						alert('You have a new highscore: ' + score + ' your previous highscore was: ' + highscore);
					} else {}
				} else {
					localStorage.setItem('highscore', score);
				}
			}
		};
	})();

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

	function gameloop() {
		if (
			(rndhra.pressedKeys[KEY.UP] ||
				rndhra.pressedKeys[KEY.DOWN] ||
				rndhra.pressedKeys[KEY.LEFT] ||
				rndhra.pressedKeys[KEY.RIGHT]) &&
			stop
		) {
			ProgressCountdown(gameTime, 'pageBeginCountdown', 'pageBeginCountdownText').then((value) => Fun());
			stop = false;
		}
		generate();
		movePlayer();
		moveEnemy();
	}

	function movePlayer() {
		if (rndhra.pressedKeys[KEY.UP]) {
			var top = parseInt($('#hrac').css('top'));
			if (top > 0) {
				$('#hrac').css('top', top - rychlost);
			}
		}

		if (rndhra.pressedKeys[KEY.DOWN]) {
			var top = parseInt($('#hrac').css('top'));
			var bottom = parseInt($('#playground').css('height'));
			var hrac = parseInt($('.hrac').css('height'));
			if (top + hrac < bottom) {
				$('#hrac').css('top', top + rychlost);
			}
		}

		if (rndhra.pressedKeys[KEY.LEFT]) {
			var left = parseInt($('#hrac').css('left'));
			if (left > 0) {
				$('#hrac').css('left', left - rychlost);
			}
		}

		if (rndhra.pressedKeys[KEY.RIGHT]) {
			var left = parseInt($('#hrac').css('left'));
			var right = parseInt($('#playground').css('width'));
			var hrac = parseInt($('.hrac').css('height'));
			if (left + hrac < right) {
				$('#hrac').css('left', left + rychlost);
			}
		}
	}

	function generate() {
		var rndbodHeight = parseInt($('#rndbod').height()) / 2;
		var rndbodLeft = parseInt($('#rndbod').css('left'));
		var rndbodTop = parseInt($('#rndbod').css('top'));

		var rndbodsecHeight = parseInt($('#rndbodsec').height()) / 2;
		var rndbodsecLeft = parseInt($('#rndbodsec').css('left'));
		var rndbodsecTop = parseInt($('#rndbodsec').css('top'));

		var hracHeight = parseInt($('#hrac').height()) / 2;
		var hracLeft = parseInt($('#hrac').css('left'));
		var hracTop = parseInt($('#hrac').css('top'));

		var playgroundHeight = parseInt($('#playground').css('height'));
		var playgroundWidth = parseInt($('#playground').css('width'));

		if (
			Math.abs(hracLeft + hracHeight - (rndbodLeft + rndbodHeight)) <= rndbodHeight + hracHeight &&
			Math.abs(hracTop + hracHeight - (rndbodTop + rndbodHeight)) <= rndbodHeight + hracHeight
		) {
			rndhra.score++;
			document.getElementById('modaltext').innerHTML =
				'Your score: ' + rndhra.score + '<br /> Your highscore: ' + highscore;

			if (localStorage.mute !== "true") point.play();

			$('#score').html(rndhra.score);
			$('#rndbod').css('left', Math.floor(Math.random() * (playgroundWidth - rndbodHeight * 2)));
			$('#rndbod').css('top', Math.floor(Math.random() * (playgroundHeight - rndbodHeight * 2)));
		}

		if (
			Math.abs(hracLeft + hracHeight - (rndbodsecLeft + rndbodsecHeight)) <= rndbodsecHeight + hracHeight &&
			Math.abs(hracTop + hracHeight - (rndbodsecTop + rndbodsecHeight)) <= rndbodsecHeight + hracHeight
		) {
			rndhra.score++;
			document.getElementById('modaltext').innerHTML =
				'Your score: ' + rndhra.score + '<br /> Your highscore: ' + highscore;
			if (localStorage.mute !== "true") point.play();

			$('#score').html(rndhra.score);
			$('#rndbodsec').css('left', Math.floor(Math.random() * (playgroundWidth - rndbodHeight * 2)));
			$('#rndbodsec').css('top', Math.floor(Math.random() * (playgroundHeight - rndbodHeight * 2)));
		}
	}

	function moveEnemy() {
		var enemysecondHeight = parseInt($('#enemysecond').height()) / 2;
		var enemysecondLeft = parseInt($('#enemysecond').css('left'));
		var enemysecondTop = parseInt($('#enemysecond').css('top'));

		var enemyHeight = parseInt($('#enemy').height()) / 2;
		var enemyLeft = parseInt($('#enemy').css('left'));
		var enemyTop = parseInt($('#enemy').css('top'));

		var hracHeight = parseInt($('#hrac').height()) / 2;
		var hracLeft = parseInt($('#hrac').css('left'));
		var hracTop = parseInt($('#hrac').css('top'));

		var playgroundHeight = parseInt($('#playground').css('height'));
		var playgroundWidth = parseInt($('#playground').css('width'));

		if (
			Math.abs(hracLeft + hracHeight - (enemysecondLeft + enemysecondHeight)) <= enemysecondHeight + hracHeight &&
			Math.abs(hracTop + hracHeight - (enemysecondTop + enemysecondHeight)) <= enemysecondHeight + hracHeight
		) {
			Fun();
		}

		if (
			Math.abs(hracLeft + hracHeight - (enemyLeft + enemyHeight)) <= enemyHeight + hracHeight &&
			Math.abs(hracTop + hracHeight - (enemyTop + enemyHeight)) <= enemyHeight + hracHeight
		) {
			Fun();
		}

		if (enemyCountDown < 1) {
			enemyCountDown = Math.random() * Math.random() * 1000;
			rndDir = Math.random();
		}
		enemyCountDown--;
		if (rndDir >= 0 && rndDir < 0.25) {
			var top = parseInt($('#enemy').css('top'));
			if (top > 0) {
				$('#enemy').css('top', top - rychlostEnemy);
			} else {
				rndDir = 0.25;
				enemyCountDown = 100;
			}
		}
		if (rndDir >= 0.25 && rndDir < 0.5) {
			var top = parseInt($('#enemy').css('top'));
			var bottom = parseInt($('#playground').css('height'));
			var enemy = parseInt($('.enemy').css('height'));
			if (top + enemy < bottom) {
				$('#enemy').css('top', top + rychlostEnemy);
			} else {
				rndDir = 0;
				enemyCountDown = 100;
			}
		}
		if (rndDir >= 0.5 && rndDir < 0.75) {
			var left = parseInt($('#enemy').css('left'));
			if (left > 0) {
				$('#enemy').css('left', left - rychlostEnemy);
			} else {
				rndDir = 0.75;
				enemyCountDown = 100;
			}
		}
		if (rndDir >= 0.75 && rndDir <= 1) {
			var left = parseInt($('#enemy').css('left'));
			var right = parseInt($('#playground').css('width'));
			var enemy = parseInt($('.enemy').css('height'));
			if (left + enemy < right) {
				$('#enemy').css('left', left + rychlostEnemy);
			} else {
				rndDir = 0.5;
				enemyCountDown = 100;
			}
		}

		//second enemy

		if (enemyCountDownSec < 1) {
			enemyCountDownSec = Math.random() * Math.random() * 1000;
			rndDirSec = Math.random();
		}
		enemyCountDownSec--;
		if (rndDirSec >= 0 && rndDirSec < 0.25) {
			var top = parseInt($('#enemysecond').css('top'));
			if (top > 0) {
				$('#enemysecond').css('top', top - rychlostEnemy);
			} else {
				rndDirSec = 0.25;
				enemyCountDownSec = 100;
			}
		}
		if (rndDirSec >= 0.25 && rndDirSec < 0.5) {
			var top = parseInt($('#enemysecond').css('top'));
			var bottom = parseInt($('#playground').css('height'));
			var enemy = parseInt($('.enemysecond').css('height'));
			if (top + enemy < bottom) {
				$('#enemysecond').css('top', top + rychlostEnemy);
			} else {
				rndDirSec = 0;
				enemyCountDownSec = 100;
			}
		}
		if (rndDirSec >= 0.5 && rndDirSec < 0.75) {
			var left = parseInt($('#enemysecond').css('left'));
			if (left > 0) {
				$('#enemysecond').css('left', left - rychlostEnemy);
			} else {
				rndDirSec = 0.75;
				enemyCountDownSec = 100;
			}
		}
		if (rndDirSec >= 0.75 && rndDirSec <= 1) {
			var left = parseInt($('#enemysecond').css('left'));
			var right = parseInt($('#playground').css('width'));
			var enemy = parseInt($('.enemysecond').css('height'));
			if (left + enemy < right) {
				$('#enemysecond').css('left', left + rychlostEnemy);
			} else {
				rndDirSec = 0.5;
				enemyCountDownSec = 100;
			}
		}
	}
}); //konec funkce document.ready v jQuery
function refresh() {
	window.location = window.location;
}
// Theme switch

initTheme(); // if user has already selected a specific theme -> apply it

function initTheme() {
	var darkThemeSelected =
		localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark';
	// update body data-theme attribute
	darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
}