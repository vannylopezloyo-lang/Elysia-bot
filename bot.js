const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

let yaPidioCodigo = false;

client.on('qr', (qr) => {
    console.log('Escanea este QR');
    qrcode.generate(qr, { small: true });
});

client.on('code', (code) => {
    console.log('TU CODIGO DE ELYSIA ES:', code);
});

client.on('ready', () => {
    console.log('¡Elysia lista! Ya puede contestar');
});

client.on('authenticated', () => {
    console.log('¡Elysia autenticada!');
});

client.on('auth_failure', (msg) => {
    console.log('Fallo de autenticacion:', msg);
});

client.on('message', async (msg) => {
    console.log('Mensaje recibido:', msg.body);
    const texto = msg.body.toLowerCase();

    if (texto === 'hola') {
        msg.reply('Holaa, soy Elysia ✨ ¿En qué te ayudo?');
    }
});

client.initialize().then(async () => {
    // Solo pide codigo si NO esta autenticada
    setTimeout(async () => {
        if (!yaPidioCodigo) {
            yaPidioCodigo = true;
            try {
                console.log('Pidiendo codigo de vinculacion, espera...');
                const codigo = await client.requestPairingCode('5659447514');
                console.log('TU CODIGO DE ELYSIA ES:', codigo);
            } catch (e) {
                console.log('Ya esta vinculada o fallo:', e.message);
            }
        }
    }, 10000);
});
