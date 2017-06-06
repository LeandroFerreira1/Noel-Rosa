var numeros = [], cont = 0, musicaAtual = 0, flagShuffle = false;

var $botaoPlayPause = document.querySelector('#play-pause');
var $botaoNext = document.querySelector('#next-music');
var $botaoPrevious = document.querySelector('#previous-music');
var $botaoVolumeOff = document.querySelector('#volume-off');
var $botaoShuffle = document.querySelector('#shuffle-music');
var $botaoDownload = document.querySelector('#download-music');

var $playerAudio = document.querySelector('#player');
var $capaAlbum = document.querySelector('#capa-album');
var $fileMp3 = document.querySelector('#file-mp3');

var $nomeMusica = document.querySelector('#nome-musica');
var $progresso = document.querySelector('#progresso');
var $playlist = document.querySelector('#lista');

var musicas = [
    {'id':'01_nao_morre_tao_cedo', 'nome':'Não morre tão cedo', 'artista':'Noel Rosa', 'capa':'Vol_7.jpg'},
    {'id':'02_minha_viola', 'nome':'Minha viola', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'03_com_que_roupa', 'nome':'Com que roupa', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'04_gago_apaixonado', 'nome':'Gago apaixonado', 'artista':'Noel Rosa', 'capa':'Vol_1.jpg'},
    {'id':'05_riso_de_crianca', 'nome':'Riso de criança', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'06_fita_amarela', 'nome':'Fita amarela', 'artista':'Noel Rosa', 'capa':'Vol_7.jpg'},
    {'id':'07_meu_barraco', 'nome':'Meu barracão', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'08_nao_tem_traducao', 'nome':'Não tem tradução', 'artista':'Noel Rosa', 'capa':'Vol_4.jpg'},
    {'id':'09_tres_apitos', 'nome':'Três apitos', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'},
    {'id':'10_rapaz_folgado', 'nome':'Rapaz folgado', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'},
    {'id':'11_capricho_de_rapaz_solteiro', 'nome':'Capricho de rapaz solteiro', 'artista':'Noel Rosa', 'capa':'Vol_3.jpg'},
    {'id':'12_dama_do_cabare', 'nome':'Dama do cabaré', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'13_conversa_de_botequim', 'nome':'Conversa de botequim', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'14_palpite_infeliz', 'nome':'Palpite infeliz', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'15_so_pode_ser_voce', 'nome':'Só pode ser você', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'16_eu_sei_sofrer', 'nome':'Eu sei sofrer', 'artista':'Noel Rosa', 'capa':'Vol_5.jpg'},
    {'id':'17_ultimo_desejo', 'nome':'Último desejo', 'artista':'Noel Rosa', 'capa':'Vol_6.jpg'}
];


loadPlaylist();
loadMusic(musicaAtual);

$playerAudio.addEventListener('timeupdate', barraProgresso, true);
$botaoNext.addEventListener('click', nextMusic, true);
$botaoPrevious.addEventListener('click', previousMusic, true);
$playerAudio.addEventListener('ended', nextMusic, true);
$botaoShuffle.addEventListener('click', statusShuffle, true);
$progresso.addEventListener('click', seek);

function seek(e) {
    var percentual = e.offsetX / this.offsetWidth;
    $playerAudio.currentTime = percentual * $playerAudio.duration;
    $progresso.value = percentual / 100;
}

$botaoPlayPause.addEventListener('click', function(e) {
  if ($playerAudio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
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


function loadMusic(index) {
    musicaAtual = index;
    $nomeMusica.textContent = musicas[index].nome;
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

    var pausado = $playerAudio.paused;
    var finalizado = $playerAudio.ended;

    if (flagShuffle) {
        shuffleMusic();
    } else if (musicaAtual < (musicas.length-1)) {
        loadMusic(musicaAtual+1);
        if (!pausado || finalizado) {
            playMusic();
        }
    }
}


function previousMusic() {
    var pausado = $playerAudio.paused;
    if (flagShuffle) {
        shuffleMusic();
    } else if (musicaAtual > 0) {
        loadMusic(musicaAtual-1);
        if (!pausado)
            playMusic();
    }
}


function restartMusic() {
    $playerAudio.currentTime = 0;
}


function statusShuffle() {

    flagShuffle = !flagShuffle;
    $botaoShuffle.textContent = 'shuffle';

    if (flagShuffle) {
        $botaoShuffle.textContent = 'format_list_numbered';
    }
}


function shuffleMusic() {

    var sort = Math.round(Math.random() * (musicas.length-1-cont));
    var pausado = $playerAudio.paused;

    if (numeros.length > 0) {

        var id = numeros[sort];
        numeros.splice(sort, 1);
        cont++;

        loadMusic(id);

        if (!pausado)
            playMusic();

    } else {
        cont=0;
        for (var i=0; i<musicas.length; i++) {
           numeros[i] = i;
        }
        shuffleMusic();
    }

}


function loadPlaylist() {
    for (var i = 0; i < musicas.length; i++) {
        $playlist.innerHTML +=
            "<div>"+
                "<button class='faixa' onclick='loadMusic("+ i +");playMusic();'>" +
                    "<i class='material-icons icon-play'>play_circle_filled</i> "+ musicas[i].nome +
                "</button>" +
            "</div>";
    }
}


function barraProgresso() {
    var tempoExecutado = Math.round($playerAudio.currentTime);
    $progresso.setAttribute('max', $playerAudio.duration);
    $progresso.setAttribute('value', tempoExecutado);
}
