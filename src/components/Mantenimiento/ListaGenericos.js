import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import {columnMapping} from "../../helpers/MessagesMantenimiento";


export default function ListaGenericos(props) {
  
  const rows = props.lista;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
  const columns = columnMapping[props.instance] || columnMapping.default;
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{}}>
          {" "}
          {/*maxHeight: 440*/}
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="opciones"
                  align="right"
                  style={{ minWidth: 60, fontWeight: "bold" }}
                >
                  Opciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        if (column.id==="salary") value="$"+String(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value && value.name === undefined
                              ? value
                              : value && value.name}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Stack direction="row-reverse" spacing={1}>
                         
                            <Tooltip title="Eliminar">
                              <Link
                                to={`${props.instance}/${String(row.id)}/delete`}
                                style={{ textDecoration: "none" }}
                              >
                                <IconButton aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </Link>
                            </Tooltip>
                         

                          <Tooltip title="Editar">
                            <Link
                              to={`${props.instance}/${String(row.id)}/edit`}
                              style={{ textDecoration: "none" }}
                            >
                              <IconButton aria-label="edit">
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </Paper>
    </>
  );
}
