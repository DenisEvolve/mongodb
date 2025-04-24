const mongoose = require('mongoose');
const config = require('./../../config.js');

const user = config.DB_USER;
const passwd = config.DB_PASS;
const dbname = config.DB_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://dnsjmnz:admin1234@cluster0.zspi3.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`Conexión a la base de datos ${dbname} establecida correctamente`);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 