import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Item from "../../UI/Item";

const FiltroGenericos = (props) => {

  const [filtros, setFiltros] = useState({ nombre: "" });

  const handlerChangeNombre = (event) => {
    const nombre = event.target.value;
    setFiltros((prevState) => {
      return { ...prevState, nombre: nombre };
    });
  };

  const { onChangeFilter } = props;

  useEffect(() => {
    const filtro_copia = { ...filtros };
    onChangeFilter(filtro_copia);
  }, [filtros, onChangeFilter]);
  
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Typography align="left" variant="h6">
            Filtro:
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Item>
            <TextField
              value={filtros.nombre}
              id="nombre"
              label="Nombre"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handlerChangeNombre}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FiltroGenericos;
