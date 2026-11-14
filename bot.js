const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ELYSIA esta activa');
}).listen(process.env.PORT || 10000);

const PHONE_NUMBER = '5215659447514';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: puppeteer.executablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  }
});

client.on('qr', async (qr) => {
  console.log('Pidiendo codigo de vinculacion, espera...');
  await new Promise(r => setTimeout(r, 10000));
  try {
    const code = await client.requestPairingCode(PHONE_NUMBER);
    console.log('TU CODIGO DE ELYSIA ES: ' + code);
  } catch (e) {
    console.log('Fallo: ' + e.message);
  }
});

client.on('authenticated', () => {
  console.log('AUTENTICADO! Ya esta vinculado, cargando chats...');
});

client.on('auth_failure', (msg) => {
  console.log('FALLO DE AUTENTICACION: ' + msg);
});

client.on('ready', () => {
  console.log('ELYSIA esta lista!');
});

client.on('message', async (msg) => {
  console.log('Mensaje recibido de ' + msg.from + ': ' + msg.body);
  if (msg.body.toLowerCase().trim() === 'hola') {
    await msg.reply('Hola! Soy Elysia, ya estoy conectada 💜');
    console.log('Respondi hola');
  }
});

client.initialize();
