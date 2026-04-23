const express = require('express'); // Importando o express
const app = express();
const port = 3000; // Definindo a porta

app.get("/", (req, res) => {
    res.send("Servidor de Usuários")
})

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});