const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async (req,res) => {
    const {nome, email, senha} = req.body;
    const hashedPassword = await ncrypt.hash(senha,10);

    db.query('INSERT INTO users (nome, email, senha) VALUES (?,?,?)', [nome, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({error: err});
        res.status(201).json({ message: 'Usuário criado com sucesso!'});
    });
});

router.post('/login', (req,res) => {
    const { email, senha} = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
        if(err || results.length === 0) return res.status(400).json({ message: 'Credenciais inválidas'});

        const user = results[0];
        if(!(await ncrypt.compare(senha, user.senha))) {
            return res.status(400).json({message: 'Credenciais Inválidas'});
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({ token });
    });
});

module.exports = router;