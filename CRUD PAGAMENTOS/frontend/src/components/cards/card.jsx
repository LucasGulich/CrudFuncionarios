  // Componente funcional para exibição de um item
export default function Card({ id, Nome, Cargo, SalarioInicial, SalarioAtual, onEdit, onDelete }) {
  // Manipula a ação de edição de um item
  const handleEdit = () => {
    onEdit({ id, Nome, Cargo, SalarioInicial, SalarioAtual });
  };

  // Manipula a ação de exclusão de um item
  const handleDelete = () => {
    onDelete(id);
  };

  // Estrutura JSX do componente Card
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-id">ID: {id}</div>
      </div>
      <div className="card-info">
        <div className="card-data">{Nome}</div>
        <div className="card-category">Cargo: {Cargo}</div>
        <div className="card-cost">Salário Inicial: ${SalarioInicial}</div>
        <div className="card-cost">Salário Atual: ${SalarioAtual}</div>
      </div>
      <button onClick={handleEdit} className="edit-button">
        Editar
      </button>
      <button onClick={handleDelete} className="delete-button">
        Excluir
      </button>
    </div>
  );
}
