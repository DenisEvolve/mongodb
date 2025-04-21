require('dotenv').config; 

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_HOST || 3000,
}