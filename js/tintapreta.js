var $botaoPlayPause = document.querySelector('#play-pause');
var $botaoNext = document.querySelector('#next-music');
var $botaoPrevious = document.querySelector('#previous-music');
var $botaoVolumeOff = document.querySelector('#volume-off');
var $botaoShuffle = document.querySelector('#shuffle-music');
var $botaoDownload = document.querySelector('#download-music');

var $playerAudio = document.querySelector('#player');
var $capaAlbum = document.querySelector('#capa-album');
var $fileMp3 = document.querySelector('#file-mp3');
var $canvas = document.getElementById('canvas-barra');

var $nomeMusica = document.querySelector('#nome-musica');
var $artista = document.querySelector('#artista');
var $playlist = document.querySelector('#playlist');

var musicaAtual = 0;
var flagShuffle = false;

var musicas = [
    {'id':'1', 'nome':'Não morre tão cedo', 'artista':'Noel Rosa', 'capa':'Vol_7.jpg'},
    {'id':'2', 'nome':'Minha viola', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'3', 'nome':'Com que roupa', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'4', 'nome':'Gago apaixonado', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'5', 'nome':'Riso de criança', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'6', 'nome':'Fita amarela', 'artista':'Noel Rosa', 'capa':'Vol_7.jpg'},
    {'id':'7', 'nome':'Meu barracão', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'8', 'nome':'Não tem tradução', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'9', 'nome':'Três apitos', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'},
    {'id':'10', 'nome':'Rapaz folgado', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'},
    {'id':'11', 'nome':'Capricho de rapaz solteiro', 'artista':'Noel Rosa', 'capa':'Vol_3.jpg'},
    {'id':'12', 'nome':'Dama do cabaré', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'13', 'nome':'Conversa de botequim', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'14', 'nome':'Palpite infeliz', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'15', 'nome':'Só pode ser você', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'16', 'nome':'Eu sei sofrer', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'17', 'nome':'Último desejo', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'}
];

loadPlaylist();
loadMusic(musicaAtual);

function initEvents() {

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
$playerAudio.addEventListener("timeupdate", barraProgresso, true);


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


$playerAudio.addEventListener('ended', function(e) {
    nextMusic();
}, true);


$botaoVolumeOff.addEventListener('click', function(e) {
    if ($playerAudio.volume != 0) {
        $playerAudio.volume = 0;
        $botaoVolumeOff.textContent = 'volume_off';
    } else {
        $playerAudio.volume = 1;
        $botaoVolumeOff.textContent = 'volume_up';
    }
}, true);


$botaoShuffle.addEventListener('click', function(e) {
    flagShuffle = true;
    shuffleMusic();
}, true);


function loadMusic(index) {
    musicaAtual = index;
    $nomeMusica.textContent = musicas[index].nome;
    $artista.textContent = musicas[index].artista;
    $capaAlbum.setAttribute('src', 'img/' + musicas[index].capa);
    $botaoDownload.setAttribute('href', 'musics/'+ musicas[index].id +'.mp3');
    $botaoDownload.setAttribute('download', musicas[index].nome +'.mp3');
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
    if (musicaAtual < (musicas.length-1)) {
        loadMusic(musicaAtual+1);
        playMusic();
    }
}


function previousMusic() {
    if (musicaAtual > 0) {
        loadMusic(musicaAtual-1);
        playMusic();
    }
}


function restartMusic() {
    $playerAudio.currentTime = 0;
}


function shuffleMusic() {
    var sort = Math.round(Math.random() * 8); //(musicas.length-1));
    loadMusic(sort);
    playMusic();
}


function loadPlaylist() {
    for (var i = 0; i < musicas.length; i++) {
        playlist.innerHTML +=
            "<button class='faixa' onclick='loadMusic("+ i +");playMusic();'>" +
                "<i class='material-icons'>play_circle_filled</i> "+ musicas[i].nome +
            "</button>";
    }
}


function barraProgresso() {
    var elapsedTime = Math.round($playerAudio.currentTime);
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.fillStyle = "#fff";
        var fWidth = (elapsedTime / $playerAudio.duration) * (canvas.clientWidth);
        console.log($playerAudio.duration);
        if (fWidth > 0) {
            ctx.fillRect(0, 0, fWidth, canvas.clientHeight);
        }
    }
}
