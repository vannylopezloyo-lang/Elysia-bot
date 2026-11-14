const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ELYSIA esta activa');
}).listen(process.env.PORT || 10000);

const PHONE_NUMBER = '525659447514';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: puppeteer.executablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  }
});

let codigoPedido = false;

client.on('qr', async (qr) => {
  if (codigoPedido) return;
  codigoPedido = true;
  console.log('Pidiendo codigo de vinculacion...');
  try {
    const code = await client.requestPairingCode(PHONE_NUMBER);
    console.log('TU CODIGO DE ELYSIA ES: ' + code);
    console.log('Escribelo en WhatsApp > Dispositivos vinculados > Vincular con numero');
  } catch (e) {
    console.log('Error pidiendo codigo: ' + e.message);
  }
});

client.on('ready', () => {
  console.log('ELYSIA esta lista!');
});

client.on('message', async (msg) => {
  if (msg.body.toLowerCase() === 'hola') {
    msg.reply('Hola! Soy Elysia, ya estoy conectada 💜');
  }
});

client.initialize();
