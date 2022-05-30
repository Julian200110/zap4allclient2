import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import "./styles/NoPermits.css";

const NoPermits = () => {
  const history = useHistory();
  return (
    <div className="container">
      No tienes permisos para ver esta página
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: "10px" }}
        onClick={() => history.push("/")}
      >
        Volver al inicio
      </Button>
    </div>
  );
};

export default NoPermits;
