import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const SalesTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={2}>
          <strong>Acciones</strong>
        </TableCell>
        <TableCell>
          <strong>ID</strong>
        </TableCell>
        <TableCell>
          <strong>Producto</strong>
        </TableCell>
        <TableCell>
          <strong>Valor unitario</strong>
        </TableCell>
        <TableCell>
          <strong>Valor total</strong>
        </TableCell>
        <TableCell>
          <strong>Cantidad</strong>
        </TableCell>
        <TableCell>
          <strong>Fecha</strong>
        </TableCell>
        <TableCell>
          <strong>Numero de tarjeta</strong>
        </TableCell>
        <TableCell>
          <strong>Codigo cvv</strong>
        </TableCell>
        <TableCell>
          <strong>Fecha de expiracion</strong>
        </TableCell>
        <TableCell>
          <strong>Nombre comprador</strong>
        </TableCell>
        <TableCell>
          <strong>Email comprador</strong>
        </TableCell>
        <TableCell>
          <strong>Nombre Vendedor</strong>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SalesTableHeader;
