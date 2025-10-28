const express = require('express');
const usuarioRouter = require('./router/usuario_router');
const categoriaRouter = require('./router/categoria_router');
const transacaoRouter = require('./router/transacao_router');

const app = express();
const port = 3000;

app.use(express.json()); // Essencial para ler o req.body

// Registra os roteadores
app.use('/api/usuarios', usuarioRouter);
app.use('/api/categorias', categoriaRouter);
app.use('/api/transacoes', transacaoRouter);

app.listen(port, () => {
  console.log(`API de Finanças rodando na porta ${port}`);
});