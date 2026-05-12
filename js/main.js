/* ============================================
   ENTRYPOINT
   Liga os modulos depois do DOM carregar.
   Ordem de dependencias:
     config -> music, effects, woody -> videos -> main
   ============================================ */
(function (global) {
  // Monta o link do WhatsApp a partir do AppConfig (numero vem de config.local.js).
  const waBtn = document.getElementById('btn-whatsapp');
  const wa = global.AppConfig && global.AppConfig.whatsapp;
  if (waBtn && wa && wa.number) {
    waBtn.href = `https://wa.me/${wa.number}?text=${encodeURIComponent(wa.message || '')}`;
  }

  // Inicia os personagens flutuantes no fundo do convite.
  global.AppEffects.createFloatingChars();

  // Anima entrada de card/actions/footer ao entrarem na viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.card, .actions, .footer').forEach(el => observer.observe(el));
})(window);
