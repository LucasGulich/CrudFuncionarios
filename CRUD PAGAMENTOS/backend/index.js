const express = require("express"); // Importa o framework Express, para criação de servidores web.
const app = express(); // Cria uma instância do aplicativo Express.
const mysql = require("mysql2"); // Importa o módulo MySQL2 para interagir com o banco de dados MySQL.
const cors = require("cors"); // Importa o módulo CORS.

const db = mysql.createPool({ // Criando conexão de pool MySQL para comunicação com o banco de dados.
  host: "localhost",
  user: "root",
  password: "root",
  database: "salarios",
});

app.use(express.json());
app.use(cors());

// Rota para registrar um novo funcionário no banco de dados.
app.post("/register", (req, res) => {
  const { Nome, Cargo, SalarioInicial, SalarioAtual } = req.body;
  const sql = "INSERT INTO salarios (Nome, Cargo, SalarioInicial, SalarioAtual) VALUES (?, ?, ?, ?)";
  db.query(sql, [Nome, Cargo, SalarioInicial, SalarioAtual], (err, result) => {
    if (err) res.send(err);
    res.json(result.insertId);
  });
});

// Rota para obter todos os registros da tabela 'salarios'.
app.get("/getCards", (req, res) => {
  const sql = "SELECT * FROM salarios";
  db.query(sql, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Rota para editar um funcionário existente no banco de dados.
app.put("/edit", (req, res) => {
  const { Nome, Cargo, SalarioInicial, SalarioAtual, id} = req.body;
  let mysql = "UPDATE salarios SET Nome = ?, Cargo = ?, SalarioInicial = ?, SalarioAtual = ? WHERE id = ?";
  db.query(
    mysql,
    [Nome, Cargo, SalarioInicial, SalarioAtual, id],
    (err, result) => {
      if (err) res.send(err);
      res.send(result);
    }
  );
});

// Rota para excluir um funcionário com base no ID.
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM salarios WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Inicializa o servidor na porta 3001.
app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});
