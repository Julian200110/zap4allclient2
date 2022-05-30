import React from "react";
import { Button, TextField } from "@mui/material";
import "../styles/VentasModulo.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import SellIcon from "@mui/icons-material/Sell";
import AutorenewIcon from "@mui/icons-material/Autorenew";
const SalesModuleForm = ({
  handleNewProduct,
  handleOnChange,
  handleUpdateProduct,
  isEditing,
  valueUnit,
  newProduct,
}) => {
  return (
    <>
      <h5>Precio: {valueUnit ? `${valueUnit} COP` : "0 COP"}</h5>
      <TextField
        type="number"
        name="quantity"
        value={newProduct.quantity}
        label="Cantidad"
        onChange={(e) => handleOnChange(e)}
        variant="standard"
      />
      <TextField
        name="idClient"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.idClient}
        label="Numero de tarjeta"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Grid3x3Icon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
        <TextField
        name="cvvcode"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.cvvcode}
        label="Codigo cvv"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Grid3x3Icon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        name="expirationdate"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.expirationdate}
        label="Fecha de expiracion"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Grid3x3Icon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        name="nameClient"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.nameClient}
        label="Nombre comprador"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        name="email"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.email}
        label="Email del comprador"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {!isEditing.state ? (
        <Button
          variant="contained"
          color="success"
          startIcon={<SellIcon />}
          onClick={() => handleNewProduct()}
        >
          Realizar venta/compra
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AutorenewIcon />}
          onClick={() => handleUpdateProduct()}
        >
          Actualizar informacion
        </Button>
      )}
    </>
  );
};

export default SalesModuleForm;
