const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://dnsjmnz:admin1234@cluster0.zspi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 