var $botaoPlayPause = document.querySelector('#play-pause');
var $botaoNext = document.querySelector('#next-music');
var $botaoPrevious = document.querySelector('#previous-music');
var $playerAudio = document.querySelector('#player');
var $fileMp3 = document.querySelector('#file-mp3');
var $canvas = document.getElementById('canvas-barra');

var $nomeMusica = document.querySelector('#nome-musica');
var $artista = document.querySelector('#artista');
var $playlist = document.querySelector('#playlist');

var atual;

musicas = [
    {'id':'1', 'nome':'A Genoveva não sabe o que diz', 'artista':'Noel Rosa'},
    {'id':'2', 'nome':'Boas tensões', 'artista':'Noel Rosa'},
    {'id':'3', 'nome':'Cem Mil Réis', 'artista':'Noel Rosa'},
    {'id':'4', 'nome':'Deus sabe o que faz', 'artista':'Noel Rosa'},
    {'id':'5', 'nome':'Eu Queria um Retratinho de Você', 'artista':'Noel Rosa'},
    {'id':'6', 'nome':'Filosofia', 'artista':'Noel Rosa'},
    {'id':'7', 'nome':'Gosto, Mas Não é Muito', 'artista':'Noel Rosa'}
];


function initEvents() {

    loadPlaylist();
    loadMusic(0);

    $playerAudio.addEventListener("timeupdate", barraProgresso, true);
    $canvas.addEventListener("click", function(e) {
        if (!e) {
            e = window.event;
        }
        try {
            $playerAudio.currentTime = $playerAudio.duration * (e.offsetX / $canvas.clientWidth);
        }
        catch (err) {
            if (window.console && console.error("Error:" + err));
        }
    }, true);
}

window.addEventListener("DOMContentLoaded", initEvents, false);


$botaoPlayPause.addEventListener('click', function(e) {
  if ($playerAudio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}, true);


$botaoNext.addEventListener('click', function(e) {
    nextMusic();
}, true);


$botaoPrevious.addEventListener('click', function(e) {
    previousMusic();
}, true);


function loadMusic(index) {
    atual = index;
    $nomeMusica.textContent = musicas[index].nome;
    $artista.textContent = musicas[index].artista;
    $fileMp3.setAttribute('src', 'musics/'+ musicas[index].id +'.mp3');
    $playerAudio.load();
}


function playMusic() {
    $botaoPlayPause.textContent = 'pause';
    $playerAudio.play();
}


function pauseMusic() {
    $botaoPlayPause.textContent = 'play_arrow';
    $playerAudio.pause();
}


function nextMusic() {
    if (atual < (musicas.length-1)) {
        loadMusic(atual+1);
        playMusic();
    }
}


function previousMusic() {
    if (atual > 0) {
        loadMusic(atual-1);
        playMusic();
    }
}


function restartMusic() {
    $playerAudio.currentTime = 0;
}


function loadPlaylist() {
    for (var i = 0; i < musicas.length; i++) {
        playlist.innerHTML +=
            "<button class='faixa' onclick='loadMusic("+ i +");playMusic();'><i class='material-icons'>play_circle_filled</i> "+ musicas[i].nome +"</button>";
    }
}


function barraProgresso() {
    var elapsedTime = Math.round($playerAudio.currentTime);
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "#fff";
        var fWidth = (elapsedTime / $playerAudio.duration) * (canvas.clientWidth);
        if (fWidth > 0) {
            ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
        }
    }
}
