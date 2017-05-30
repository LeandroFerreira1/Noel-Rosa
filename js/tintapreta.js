
var $botaoPlayPause = document.querySelector('#play-pause');
var $playerAudio = document.querySelector('#player');
var $fileMp3 = document.querySelector('#file-mp3');

var $nomeMusica = document.querySelector('#nome-musica');
var $duration = document.querySelector('#duration');

musicas = [
    {'id':'1', 'nome':'Música XY 001'},
    {'id':'2', 'nome':'Música XY 002'},
    {'id':'3', 'nome':'Música XY 003'},
    {'id':'4', 'nome':'Música XY 004'},
    {'id':'5', 'nome':'Música XY 005'},
    {'id':'6', 'nome':'Música XY 006'},
    {'id':'7', 'nome':'Música XY 007'}
];

loadMusic(0);

$botaoPlayPause.addEventListener('click', function() {
  if ($playerAudio.paused) {
    playMusic();
  } else {
    $botaoPlayPause.setAttribute('value', 'Play');
    $playerAudio.pause();
  }

});

function loadMusic(index) {
    $nomeMusica.innerText = musicas[index].nome;
    $fileMp3.setAttribute('src', 'musics/'+ musicas[index].id +'.mp3');
    $playerAudio.load();
}

function playMusic() {
    $botaoPlayPause.setAttribute('value', 'Pause');
    $playerAudio.play();
}
