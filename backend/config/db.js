// config/db.js

const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Conectado con Mongodb");
    } catch (error) {
        console.error("Error con Mongodb");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;