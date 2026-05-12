/* ============================================
   WOODY FALANTE
   Efeito de digitacao no balao de fala +
   pequena animacao na imagem enquanto "fala".
   ============================================ */
(function (global) {
  const cfg = global.AppConfig;

  class WoodyTalker {
    constructor(speechElementId, imgElementId, phrases, speed = 50) {
      this.speechEl = document.getElementById(speechElementId);
      this.imgEl = document.getElementById(imgElementId);
      this.phrases = phrases;
      this.speed = speed;
      this.currentPhrase = 0;
    }

    async typePhrase(text) {
      if (!this.speechEl) return;
      if (this.imgEl) this.imgEl.classList.add('talking');
      this.speechEl.innerHTML = '<span class="cursor"></span>';
      for (let i = 0; i < text.length; i++) {
        await this.wait(this.speed + Math.random() * 30);
        this.speechEl.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
      }
      if (this.imgEl) this.imgEl.classList.remove('talking');
      await this.wait(800);
      this.speechEl.innerHTML = text;
    }

    async erasePhrase() {
      if (!this.speechEl) return;
      const current = this.speechEl.textContent;
      for (let i = current.length; i >= 0; i--) {
        await this.wait(25);
        this.speechEl.innerHTML = current.substring(0, i) + '<span class="cursor"></span>';
      }
    }

    async start() {
      while (true) {
        const phrase = this.phrases[this.currentPhrase];
        await this.typePhrase(phrase);
        await this.wait(3500);
        await this.erasePhrase();
        await this.wait(400);
        this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      }
    }

    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  let inviteWoodyStarted = false;
  function startInviteWoody() {
    if (inviteWoodyStarted) return;
    inviteWoodyStarted = true;
    setTimeout(() => {
      new WoodyTalker('inviteSpeech', 'inviteWoodyImg', cfg.invitePhrases, 45).start();
    }, 1500);
  }

  global.AppWoody = { WoodyTalker, startInviteWoody };
})(window);
