// Importações necessárias
import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

// Componente principal da aplicação React
export default function App() {
  const [values, setValues] = useState({ 
    id: "",
    Nome: "",
    Cargo: "",
    SalarioInicial: "",
    SalarioAtual: "",
  });

  const [listCard, setListCard] = useState([]); // Lista de cartões de funcionários
  const [errorMsg, seterrorMsg] = useState(""); // Mensagem de erro durante as operações
  const [editMode, setEditMode] = useState(false); // Modo de edição para o formulário

 // Const p/ limpa os valores do formulário
  const clearValues = () => {
    setValues({
      Nome: "",
      Cargo: "",
      SalarioInicial: "",
      SalarioAtual: "",
    });
  }

  // Manipula o registro de um novo item
  const handleRegisterEmployee = () => {
    seterrorMsg("");
    if (!values.Nome) {
      seterrorMsg("Nome é um campo obrigatório");
      return;
    }

    // Realiza uma solicitação POST para o servidor para registrar um novo item
    Axios.post("http://localhost:3001/register", values)
      .then((response) => {
        console.log("Registro bem-sucedido:", response.data);
        const newEmployee = {...values, id:`${response.data}`};
        setListCard([...listCard, newEmployee]);
        clearValues();
      })
      .catch((error) => {
        console.error("Erro ao registrar:", error);
      });
  };

  // Manipula a exclusão de um item com base no ID
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        setListCard((listaAnterior) => listaAnterior.filter((cartao) => cartao.id !== id));
        console.log("Registro excluído com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao excluir o registro:", error);
      });
  };

  // Ativar a edição e preenche os valores do formulário com as informações do item selecionado
  const handleEdit = (employee) => {
    setEditMode(true);
    setValues(employee);
  };

  // Cancela o modo de edição e limpar o formulário
  const handleCancelEdit = () => {
    setEditMode(false);
    clearValues();
  };

  // Atualiza as informações do item no servidor durante o modo de edição
  const handleUpdateEmployee = () => {
    seterrorMsg("");
    Axios.put("http://localhost:3001/edit", values)
      .then((response) => {
        const funcionarioIndex = listCard.findIndex(funcionario => funcionario.id == values.id);
        listCard[funcionarioIndex] = {...values};
        setListCard(listCard);
        setEditMode(false);
        clearValues();
      })
      .catch((error) => {
        seterrorMsg("Erro ao atualizar o registro.");
      });
  };

  // Atualiza os valores do estado com base nas alterações nos campos do formulário
  const handleAddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards")
      .then((response) => setListCard(response.data))
      .catch((error) => console.error("Erro ao obter os cartões:", error));
  }, []);

  // Botões e infomações em tela.
  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">CRUD de Funcionários</h1>

        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="Nome"
            placeholder="Nome"
            className="register-input"
            onChange={handleAddValues}
            value={values.Nome}
          />
        </div>
        <div className="form-group">
          <label>Cargo:</label>
          <input
            type="text"
            placeholder="Cargo"
            name="Cargo"
            className="register-input"
            onChange={handleAddValues}
            value={values.Cargo}
          />
        </div>
        <div className="form-group">
          <label>Salário Inicial:</label>
          <input
            type="text"
            placeholder="Salário Inicial"
            name="SalarioInicial"
            className="register-input"
            onChange={handleAddValues}
            value={values.SalarioInicial}
          />
        </div>
        <div className="form-group">
          <label>Salário Atual:</label>
          <input
            type="text"
            placeholder="Salário Atual"
            name="SalarioAtual"
            className="register-input"
            onChange={handleAddValues}
            value={values.SalarioAtual}
          />
        </div>

        {editMode ? <div> <button onClick={handleUpdateEmployee} className="update-button">
          Salvar
        </button>
          <button onClick={handleCancelEdit} className="cancel-button">
            Cancelar
          </button></div> : <button onClick={handleRegisterEmployee} className="register-button">
          Cadastrar
        </button>}

        {errorMsg && <div style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</div>}

      </div>

      <div className="cards-container">
        {listCard.map((funcionario, index) => (
          <Card key={index} id={index} {...funcionario} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
