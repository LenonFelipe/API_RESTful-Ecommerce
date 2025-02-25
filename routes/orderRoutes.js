const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).json({ error: err});
        res.json(results);
    });
});

router.post('/', (req,res) =>{
    const {usuario_id, total } = req.body;

    db.query('INSERT INTO orders (usuarios_id, total) VALUES (?, ?)', [usuario_id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.status(201).json({message: 'Pedido criado!'});
    }); 
});

module.exports = router;
