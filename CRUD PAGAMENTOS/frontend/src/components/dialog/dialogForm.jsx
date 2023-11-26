import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cargo: props.cargo,
    inicioNaEmpresa: props.inicioNaEmpresa,
    salarioInicial: props.salarioInicial,
    salarioAtual: props.salarioAtual,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditSalary = () => {
    Axios.put("http://localhost:3001/edit", editValues)
      .then(() => {
        props.setListCard(
          props.listCard.map((value) =>
            value.id === editValues.id
              ? { ...editValues }
              : value
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao editar:", error);
      });
    handleClose();
  };

  const handleDeleteSalary = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
      .then(() => {
        props.setListCard(
          props.listCard.filter((value) => value.id !== editValues.id)
        );
      })
      .catch((error) => {
        console.error("Erro ao excluir:", error);
      });
    handleClose();
  };

  return (
    <div>
      {/* ... (restante do código) */}
    </div>
  );
}

  const handleDeleteSalary = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cargo"
            label="Cargo"
            defaultValue={props.cargo}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="inicioNaEmpresa"
            label="Início na Empresa"
            defaultValue={props.inicioNaEmpresa}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="salarioInicial"
            label="Salário Inicial"
            defaultValue={props.salarioInicial}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="salarioAtual"
            label="Salário Atual"
            defaultValue={props.salarioAtual}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteSalary()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditSalary()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
