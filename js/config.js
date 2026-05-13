/* ============================================
   CONFIGURACOES EDITAVEIS
   Centraliza textos e caminhos de midia.
   Edite este arquivo para personalizar o convite.
   ============================================ */
(function (global) {
  global.AppConfig = {
    // Caminhos dos videos (relativos ao index.html).
    videos: {
      mobile: {
        porta: 'assets/portamobile.mp4',
        convida: 'assets/convidamobile.mp4',
        comemoracao: 'assets/comemora%C3%A7%C3%A3omobile.mp4'
      },
      desktop: {
        porta: 'assets/portadeskp.mp4',
        convida: 'assets/convida.mp4',
        comemoracao: 'assets/comemora%C3%A7%C3%A3o.mp4'
      }
    },

    // Frases que o Woody fala na capa (nao usadas atualmente).
    coverPhrases: [
      "Howdy, parceiro! 🤠",
      "Abre o convite ai! 🎁",
      "Tem uma festa chegando! 🎉",
      "Toca aqui, xerife! 👆",
      "O Lorenzo tá chamando! 🌟"
    ],

    // Frases que o Woody fala no convite principal.
    invitePhrases: [
      "Amigo estou aqui! 🎶",
      "O Lorenzo vai fazer 5 anos! 🎂",
      "Venha pra essa aventura! 🌟",
      "Essa festa vai ser demais! 🤩",
      "Yeehaw! Te espero lá! 🤠",
      "Tem uma cobra na minha bota! 🐍",
    ],

    // Emojis usados nas decoracoes animadas.
    floatingChars: ['⭐', '🌟', '✨', '🚀', '🤠', '🧸', '🎈', '🎉', '💫', '🌙'],
    confettiEmojis: ['⭐', '🌟', '✨', '💫', '🎉', '🎈'],

    // Limite para considerar o dispositivo "mobile".
    mobileBreakpointPx: 900,

    // Volume do audio de fundo (0.0 a 1.0).
    musicVolume: 0.4,

    // Dados sensiveis (telefone etc.) ficam em js/config.local.js,
    // que NAO e versionado. Veja js/config.local.example.js.
    whatsapp: {
      number: '',                                                  // sobrescrito por config.local.js
      message: 'Oi! Confirmo presença na festa do Lorenzo!'      
    }
  };
})(window);
