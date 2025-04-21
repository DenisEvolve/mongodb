const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dnsjmnz:admin1234@cluster0.zspi3.mongodb.net/empresaDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 