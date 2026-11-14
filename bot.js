const http = require('http');
http.createServer((req, res) => res.end('Elysia esta viva')).listen(process.env.PORT || 10000);

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('ESCANEA ESTE QR:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Elysia esta lista!');
});

client.on('authenticated', () => {
    console.log('Elysia autenticada!');
});

client.on('auth_failure', (msg) => {
    console.log('Fallo auth:', msg);
});

client.on('message', async (msg) => {
    try {
        if (msg.from === 'status@broadcast') return;
        const texto = msg.body.toLowerCase();

        if (texto === 'hola' || texto === 'ola' || texto === 'hi') {
            await msg.reply('Holaa, soy Elysia 💜 ¿Cómo estás?');
            return;
        }

        if (texto.includes('como estas')) {
            await msg.reply('Bien, ¿y tú? Aquí ando contigo 💜');
            return;
        }

        // Aquí puedes agregar más respuestas después

    } catch (e) {
        console.log('Error en mensaje:', e.message);
    }
});

// Para que no se duerma y no se llene la memoria
setInterval(() => {
    console.log('Elysia sigue viva... ' + new Date().toLocaleString());
}, 30000);

client.initialize();
