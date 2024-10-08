const express = require('express');
const router = express.Router();
const db = require('./db');
const bcrypt = require('bcryptjs');


// ROTA PARA CADASTRAR UM NOVO USUÁRIO
router.post('/', async (req, res) => {
    const {email, senha } = req.body;

    if (!email || !senha){
        return res.status(400).json({message: 'Email e senha são obrigatórios.'});   
    }

    // CRIPTOGRAFAR A SENHA
    const senhaHash = await bcrypt.hash(senha, 10);

    // Inserir p usuário no banco de dados
    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    db.query(query, [email, senhaHash], (erro, results) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({message: 'Erro ao cadastrar usuário.'})
        }
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!'})
    })
})

// ROTA DE LOGIN
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios'})
    }

    // Verificar se o usuário existe no banco de dados
    const query = 'SELECT * FROM usuarios WHERE email = ?'
    db.query(query, [email], async (erro, results) => {
        if(erro) {
            console.Error(erro);
            return res.status(500).json({ message: 'Erro no servidor'})            
        }

        if  (results.length === 0) {
            return res.status(401).json({message: 'Usuário não encontrado'});
        }

        // Comparar a senha
        const usuario = results[0];
        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta.'})
        }
        return res.status(200).json({ message: 'Login bem-sucedido!'})
    })
})


module.exports = router;
