/* ============================================
   MUSICA DE FUNDO
   Controla play/pause e o botao mute do convite.
   ============================================ */
(function (global) {
  const cfg = global.AppConfig;

  const bgMusic = document.getElementById('bgMusic');
  const soundToggle = document.getElementById('soundToggle');
  let musicPlaying = false;

  function play() {
    bgMusic.volume = cfg.musicVolume;
    bgMusic.play().then(() => {
      musicPlaying = true;
      soundToggle.textContent = '🔊';
    }).catch(() => {
      musicPlaying = false;
      soundToggle.textContent = '🔇';
    });
  }

  function pause() {
    bgMusic.pause();
    musicPlaying = false;
    soundToggle.textContent = '🔇';
  }

  function isPlaying() {
    return musicPlaying;
  }

  soundToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (musicPlaying) pause(); else play();
  });

  global.AppMusic = { play, pause, isPlaying };
})(window);
