const express = require('express'); // Importando o express
const app = express();
app.use(express.json());
const port = 3000; // Definindo a porta

app.get("/hello", (req, res) => {
    res.send("Olá, Mundo!")
})


let tarefas = [
    {id: 1, nome: "Estudar"}
];

// Mostra tarefas
app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});

// Adiciona tarefa
app.post("/tarefas", (req, res) => {
    const grupo = req.params.grupo;
    const{nome, telefone} = req.body;
    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }
    if(!nome || !telefone){
        return res.status(400).json({erro: "Nome e telefone são obrigatórios"});
    }

    dados[grupo].push({nome, telefone});

    salvarDados(dados);

    res.status(201).json({
        mensagem: "Contato Adicionado com Sucesso!",
        contato: {nome, telefone}
    });

});


app.delete("/contatos/:grupo/:index", (req, res) => {
    const grupo = req.params.grupo;
    const index = parseInt(req.params.index);

    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    if(index < 0 || index >= dados[grupo].length){
        return res.status(404).json({erro: "Contato não encontrado"});
    }

    const removido = dados[grupo].splice(index, 1);
    salvarDados(dados);
    
    res.json({
        mensagem: "Contato Excluido com Sucesso!",
        contato: removido[0]
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});