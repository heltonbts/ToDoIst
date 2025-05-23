const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://admin:password@localhost:27017/meu_app?authSource=admin',
    {
        useNewUrlParser: true,
    }

);
mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão:', err);
});

mongoose.connection.on('open', () => {
    console.log('Conectado ao MongoDB com sucesso!');
});

mongoose.connection.on('connecting', () => {
    console.log('Tentando conectar...');
});