/* ============================================
   CONFIG LOCAL (EXEMPLO)
   Copie este arquivo para js/config.local.js e
   preencha com os dados reais. O config.local.js
   esta no .gitignore e nao vai pro repositorio.
   ============================================ */
(function (global) {
  if (!global.AppConfig) return;

  // Numero no formato DDI+DDD+numero, somente digitos.
  // Ex.: 5511999999999
  global.AppConfig.whatsapp.number = '5500000000000';

  // (Opcional) Texto da mensagem ao clicar em "Confirmar Presenca".
  // global.AppConfig.whatsapp.message = 'Oi! Confirmo presenca...';
})(window);
