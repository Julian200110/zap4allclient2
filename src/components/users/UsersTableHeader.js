import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const UsersTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={2} align="center">
          <strong>Acciones</strong>
        </TableCell>
        <TableCell>
          <strong>Primer</strong>
        </TableCell>
        <TableCell>
          <strong>Segundo nombre</strong>
        </TableCell>
        <TableCell>
          <strong>Rol</strong>
        </TableCell>
        <TableCell>
          <strong>Estado</strong>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default UsersTableHeader;
