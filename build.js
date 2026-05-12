/* ============================================
   BUILD - gera js/config.local.js a partir de
   variaveis de ambiente do Vercel.
   So roda no deploy; localmente o arquivo
   existente nao e tocado.
   ============================================ */
const fs = require('fs');
const path = require('path');

const number = process.env.WHATSAPP_NUMBER;

if (!number) {
  console.log('[build] WHATSAPP_NUMBER nao definida; pulando geracao de config.local.js');
  process.exit(0);
}

const content =
`/* Gerado automaticamente pelo build. Nao editar. */
(function (global) {
  if (!global.AppConfig) return;
  global.AppConfig.whatsapp.number = ${JSON.stringify(number)};
})(window);
`;

const outPath = path.join(__dirname, 'js', 'config.local.js');
fs.writeFileSync(outPath, content);
console.log('[build] js/config.local.js gerado com numero do env');
