
var $botaoPlayPause = document.querySelector('#play-pause');
var $playerAudio = document.querySelector('#player');
var $fileMp3 = document.querySelector('#file-mp3');
var $duration = document.querySelector('#duration');

$fileMp3.setAttribute('src', 'musics/001.mp3');
$playerAudio.load();

$botaoPlayPause.addEventListener('click', function() {

  if ($playerAudio.paused) {
    $botaoPlayPause.setAttribute('value', 'Pause');
    $playerAudio.play();
  } else {
    $botaoPlayPause.setAttribute('value', 'Play');
    $playerAudio.pause();
  }

});
