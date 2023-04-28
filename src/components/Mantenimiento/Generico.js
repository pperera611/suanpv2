import FiltroGenericos from "./FiltroGenericos";
import ListaGenericos from "./ListaGenericos";
import ExportExcelPDF from "../../helpers/ExportExcelPDF";
import Divider from "@mui/material/Divider";
import { useState, useCallback } from "react";
import { Link} from "react-router-dom";
import ButtonNew from "../../UI/ButtonNew";
import React from "react";
import { Stack } from "@mui/material";


const columnMapping = {
  ua: [
    { header: "Nombre", dataKey: "name" },
    { header: "Codigo", dataKey: "code" },
  ],
  grados: [
    { header: "Nombre", dataKey: "name" },
    { header: "Nivel", dataKey: "level" },
    { header: "Salario", dataKey: "salary" },
  ],
  default: [{ header: "Nombre", dataKey: "name" }],
};

const button_title = {
  ua: "Agregar nueva unidad administrativa",
  grados: "Agregar nuevo grado",
  localidades: "Agregar nueva localidad",
  gastos: "Agregar nuevo concepto de gasto",
};

const Generico = (props) => {

  const [listFiltrada, setListFiltrada] = useState([]);
  const button_new_title = button_title[props.instance] || "Agregar";
  const columns = columnMapping[props.instance] || columnMapping.default;
 
  const handlerfilterList = useCallback(
    (filtros) => {
      const filtroNombre = filtros.nombre.toUpperCase();
      const lista_filtrada = Object.values(props.lista).filter((elemento) =>
        elemento["name"].includes(filtroNombre)
      );
      setListFiltrada(lista_filtrada);
    },
    [props.lista]
  );

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Link to={`${props.instance}/new`}>
          <ButtonNew title={button_new_title} />
        </Link>
        <ExportExcelPDF
          lista={listFiltrada}
          columns={columns}
          titulo={props.instance}
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      {<FiltroGenericos onChangeFilter={handlerfilterList} />}
      <Divider sx={{ my: 1 }} />
      <ListaGenericos lista={listFiltrada} instance={props.instance} />
    </>
  );
};

export default Generico;
