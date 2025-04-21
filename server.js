const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./config');

// Función principal asíncrona
const startServer = async () => {
    try {
        //Conexión con la base de datos 
        await connectDB();

        //Levantamos el servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://${config.DB_HOST}:${config.PORT}`);
        });

    } catch(error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
}

startServer();
