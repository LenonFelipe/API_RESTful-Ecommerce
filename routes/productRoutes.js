const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req,res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.json(results);
    });
});

router.post('/', (req,res) => {
    const { nome, descricao, preco, estoque, categoria, imagem} = req.body;

    db.query('INSERT INTO products (nome, descricao, preco, estoque, categoria, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, descricao, preco, estoque, categoria, imagem],
        (err, results) => {
            if(err) return res.status(500).json({error: err});
            res.status(201).json({ message: 'Produto criado!'});
        }
    );
});

module.exports = router;