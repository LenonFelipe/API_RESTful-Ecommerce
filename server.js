require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(cors());

// Rota inicial 

app.get('/', (req,res) => {
    res.send('Você está na rota inicial')
});

app.listen(PORT, () => {
    console.log("Servidor aberto")
});