import FiltroGenericos from "./FiltroGenericos";
import ListaGenericos from "./ListaGenericos";
import ExportExcelPDF from "../../helpers/ExportExcelPDF";
import Divider from "@mui/material/Divider";
import { useState, useCallback } from "react";
import { Link} from "react-router-dom";
import ButtonNew from "../../UI/ButtonNew";
import React from "react";
import { Stack } from "@mui/material";
import { columnMappingExport, tooltip_button_new } from "../../helpers/MessagesMantenimiento";


const Generico = (props) => {

  const [listFiltrada, setListFiltrada] = useState([]);
  const button_new_title = tooltip_button_new[props.instance] || "Agregar";
  const columns = columnMappingExport[props.instance] || columnMappingExport.default;
 
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
