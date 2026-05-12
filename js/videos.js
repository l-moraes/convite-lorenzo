/* ============================================
   SEQUENCIA DE VIDEOS
   Detecta mobile, carrega os videos certos e
   orquestra a transicao porta -> convida ->
   comemoracao -> convite.
   ============================================ */
(function (global) {
  const cfg = global.AppConfig;

  // ---- Deteccao de mobile e selecao das fontes de video ----
  const isMobile = window.matchMedia('(max-width: ' + cfg.mobileBreakpointPx + 'px)').matches
    || /Android|iPhone|iPad|iPod|Mobile|Opera Mini/i.test(navigator.userAgent);
  const sources = isMobile ? cfg.videos.mobile : cfg.videos.desktop;
  document.documentElement.classList.add(isMobile ? 'is-mobile' : 'is-desktop');

  // ---- Elementos ----
  const cover = document.getElementById('cover');
  const screenConvida = document.getElementById('screenConvida');
  const screenComemoracao = document.getElementById('screenComemoracao');
  const videoPorta = document.getElementById('videoPorta');
  const videoConvida = document.getElementById('videoConvida');
  const videoComemoracao = document.getElementById('videoComemoracao');

  videoPorta.src = sources.porta;
  videoConvida.src = sources.convida;
  videoComemoracao.src = sources.comemoracao;

  let sequenceStarted = false;

  // Garante que o video da porta toque mesmo se autoplay falhar inicialmente.
  function tryPlayPorta() {
    const p = videoPorta.play();
    if (p && p.catch) p.catch(() => {});
  }
  tryPlayPorta();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !sequenceStarted) tryPlayPorta();
  });

  function fadeOut(el, ms = 1000) {
    return new Promise(resolve => {
      el.classList.remove('active');
      setTimeout(() => {
        el.style.display = 'none';
        resolve();
      }, ms);
    });
  }

  function fadeIn(el) {
    el.style.display = 'flex';
    void el.offsetWidth;
    el.classList.add('active');
  }

  function playVideo(videoEl) {
    return new Promise(resolve => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        videoEl.removeEventListener('ended', done);
        videoEl.removeEventListener('error', done);
        resolve();
      };
      videoEl.addEventListener('ended', done);
      videoEl.addEventListener('error', done);
      try { videoEl.currentTime = 0; } catch (e) {}
      const p = videoEl.play();
      if (p && p.catch) {
        p.catch(() => { done(); });
      }
      // Failsafe: 60s.
      setTimeout(done, 60000);
    });
  }

  async function startSequence() {
    if (sequenceStarted) return;
    sequenceStarted = true;

    const tapHint = document.querySelector('.tap-hint');
    const playInd = document.querySelector('.play-indicator');
    if (tapHint) tapHint.style.display = 'none';
    if (playInd) playInd.style.display = 'none';

    global.AppMusic.pause();

    // 1) porta -> convida
    fadeIn(screenConvida);
    const convidaEnd = playVideo(videoConvida);
    setTimeout(() => {
      cover.classList.add('hidden');
      try { videoPorta.pause(); } catch (e) {}
      setTimeout(() => { cover.style.display = 'none'; }, 1000);
    }, 1000);
    await convidaEnd;

    // 2) convida -> comemoracao
    fadeIn(screenComemoracao);
    const comemoracaoEnd = playVideo(videoComemoracao);
    await new Promise(r => setTimeout(r, 1000));
    try { videoConvida.pause(); } catch (e) {}
    await fadeOut(screenConvida);
    await comemoracaoEnd;

    // 3) comemoracao -> convite
    const invitation = document.getElementById('invitation');
    invitation.classList.add('visible');
    await new Promise(r => setTimeout(r, 1000));
    try { videoComemoracao.pause(); } catch (e) {}
    await fadeOut(screenComemoracao);

    if (!global.AppMusic.isPlaying()) global.AppMusic.play();

    global.AppEffects.createConfetti();
    global.AppWoody.startInviteWoody();
  }

  cover.addEventListener('click', function (e) {
    if (e.target.closest('.sound-toggle')) return;
    startSequence();
  });

  global.AppVideos = { startSequence };
})(window);
