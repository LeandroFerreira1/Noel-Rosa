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
    {'id':'1', 'nome':'Não morre tão cedo', 'artista':'Noel Rosa'},
    {'id':'2', 'nome':'Minha viola', 'artista':'Noel Rosa'},
    {'id':'3', 'nome':'Com que roupa', 'artista':'Noel Rosa'},
    {'id':'4', 'nome':'Gago apaixonado', 'artista':'Noel Rosa'},
    {'id':'5', 'nome':'Riso de criança', 'artista':'Noel Rosa'},
    {'id':'6', 'nome':'Fita amarela', 'artista':'Noel Rosa'},
    {'id':'7', 'nome':'Meu barracão', 'artista':'Noel Rosa'},
    {'id':'8', 'nome':'Não tem tradução', 'artista':'Noel Rosa'},
    {'id':'9', 'nome':'Três apitos', 'artista':'Noel Rosa'},
    {'id':'10', 'nome':'Rapaz folgado', 'artista':'Noel Rosa'},
    {'id':'11', 'nome':'Capricho de rapaz solteiro', 'artista':'Noel Rosa'},
    {'id':'12', 'nome':'Dama do cabaré', 'artista':'Noel Rosa'},
    {'id':'13', 'nome':'Conversa de botequim', 'artista':'Noel Rosa'},
    {'id':'14', 'nome':'Palpite infeliz', 'artista':'Noel Rosa'},
    {'id':'15', 'nome':'Só pode ser você', 'artista':'Noel Rosa'},
    {'id':'16', 'nome':'Eu sei sofrer', 'artista':'Noel Rosa'},
    {'id':'17', 'nome':'Último desejo', 'artista':'Noel Rosa'}
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
