const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ELYSIA esta activa');
}).listen(process.env.PORT || 10000);
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: puppeteer.executablePath(),
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu']
    }
});

client.on('qr', (qr) => {
    console.log('Escanea este QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('ELYSIA esta lista!');
});

client.on('message', async (msg) => {
    const text = msg.body.toLowerCase().trim();
    if (text === 'hola' || text === 'hi' || text === 'hola elysia') {
        msg.reply('Holaa 💕 Soy ELYSIA, tu asistente. ¿En qué te ayudo hoy? Escribe *menu* para ver lo que puedo hacer.');
    } else if (text === 'menu') {
        msg.reply('✨ *MENÚ ELYSIA* ✨\n\n1. Escribe *hola* para saludarme\n2. Escribe *chiste* para un chiste\n3. Escribe *hora* para saber la hora');
    } else if (text === 'chiste') {
        msg.reply('¿Por qué el libro de matemáticas estaba triste? Porque tenía muchos problemas 😂');
    } else if (text === 'hora') {
        const ahora = new Date().toLocaleTimeString('es-MX');
        msg.reply(`Son las ${ahora} ⏰`);
    }
});

client.initialize();
