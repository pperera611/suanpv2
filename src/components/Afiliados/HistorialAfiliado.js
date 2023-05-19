import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";

const columns = [
  { id: "fecha", label: "Fecha", minWidth: 70 },
  { id: "evento", label: "Evento", minWidth: 100 },
  { id: "descripcion", label: "Descripcion", minWidth: 150 },
];

const useHistoriaAxios = (afiliadoKey) => {
  const url = `afiliados/${afiliadoKey}/historia`;
  const { response, error, loading } = useAxios("GET", url, {});
  return { response, error, loading };
};

const HistorialAfiliado = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fecha");

  const { id } = useParams();

  const afiliado1 = Object.values(props.afiliados).find(
    (e) => e.id === Number(id)
  );
  const afiliado2 = Object.values(props.afiliados2).find(
    (e) => e.id === Number(id)
  );
  const afiliado = afiliado1 || afiliado2;
  const { response, loading } = useHistoriaAxios(afiliado.key);
  //obtengo la historia del afiliado

  useEffect(() => {
    if (response){
      const lista = Object.values(response);
      console.log(lista);
      setRows(lista);
      
    }
  }, [response]);

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }; //aux para ordenar tabla

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }; //aux para ordenar tabla

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }; //aux para ordenar tabla

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }; //aux para ordenar tabla

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    <Spinner />;
  }

  let cabezal_funcionario =
    "Historial Afiliado - " +
    afiliado.nombre +
    " " +
    afiliado.apellido +
    " - Nro de cobro : " +
    afiliado.nroSocio;
  return (
    <Modal isOpen={isModalOpen} tituloModal={cabezal_funcionario} size="md">
      <Grid item xs={12}>
        <Item>
          <Typography gutterBottom>
            Mail: {afiliado.email}
            {" - "}Telefono: {afiliado.telefono}
            {" - "} Localidad: {afiliado.localidad.name}
          </Typography>
          <Typography gutterBottom>
            Unidad Administrativa: {afiliado.ua.name}
          </Typography>
          <Typography gutterBottom>Grado: {afiliado.grado.name}</Typography>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
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
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                        }}
                        sortDirection={orderBy === column.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={handleSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row,index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              //console.log(value);
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value.name === undefined
                                    ? value
                                    : value.name}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              component="div"
              count={rows?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
            />
          </Paper>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Divider />
          <DialogActions>
            <Link to="/afiliados" style={{ textDecoration: "none" }}>
              <Button onClick={closeModal}>Cancelar</Button>
            </Link>
          </DialogActions>
        </Item>
      </Grid>
    </Modal>
  );
};

export default HistorialAfiliado;
