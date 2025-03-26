const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');
const helmet = require('helmet');
// Protección con límite de peticiones por IP
const rateLimit = require('express-rate-limit');
// Protección contra consultas NoSQL maliciosas (inyección)
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

// Middleware para parsear JSON
app.use(express.json());// Devuelve un middleware

// Evitar conflictos CORS
app.use(cors()); 

// Protección en cabeceras y otros
app.use(helmet());

// Protección contra consulta maliciosas
app.use(mongoSanitize());

// Ejemplo de ataque prevenido:
// Un atacante envía: { "email": { "$ne": "" }, "password": "123" }
// Se convierte en: { "email": {}, "password": "123" }

const apiLimiter = rateLimit({ // ESTO SE LLAMA LIMITADOR 
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP'
});

//Toda mi API queda protegida de peticiones recurrentes excesivas
app.use('/', apiLimiter);
  
// Montamos las rutas en diferentes paths base
app.use('/users', userRoutes);     // Todas las rutas de usuarios empezarán con /users
app.use('/products', productRoutes); // Todas las rutas de productos empezarán con /products

// Manejador de rutas no encontradas
app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;