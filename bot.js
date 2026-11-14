const { Client, LocalAuth } = require('whatsapp-web.js');

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

let yaPidio = false;

client.on('ready', () => {
    console.log('¡Elysia lista! Ya puede contestar');
    yaPidio = true;
});

client.on('authenticated', () => {
    console.log('¡Elysia autenticada!');
    yaPidio = true;
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

client.initialize();

// Esperamos 30 segundos para que Chrome abra bien antes de pedir codigo
setTimeout(async () => {
    if (yaPidio) {
        console.log('Ya esta vinculada, no pido codigo');
        return;
    }
    try {
        console.log('Pidiendo codigo de vinculacion, espera...');
        const codigo = await client.requestPairingCode('5659447514');
        console.log('TU CODIGO DE ELYSIA ES:', codigo);
    } catch (e) {
        console.log('Ya esta vinculada o fallo:', e.message);
    }
}, 30000);
