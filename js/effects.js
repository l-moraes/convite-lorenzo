/* ============================================
   EFEITOS VISUAIS
   Personagens flutuantes no fundo + chuva de
   confetti ao abrir o convite.
   ============================================ */
(function (global) {
  const cfg = global.AppConfig;

  function createFloatingChars() {
    const container = document.getElementById('floatingChars');
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('div');
      el.className = 'float-char';
      el.textContent = cfg.floatingChars[Math.floor(Math.random() * cfg.floatingChars.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = (15 + Math.random() * 20) + 's';
      el.style.animationDelay = Math.random() * 15 + 's';
      el.style.fontSize = (20 + Math.random() * 25) + 'px';
      container.appendChild(el);
    }
  }

  function createConfetti() {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = cfg.confettiEmojis[Math.floor(Math.random() * cfg.confettiEmojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-20px';
        particle.style.fontSize = (14 + Math.random() * 18) + 'px';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particle.style.animationDelay = '0s';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 7000);
      }, i * 100);
    }
  }

  global.AppEffects = { createFloatingChars, createConfetti };
})(window);
