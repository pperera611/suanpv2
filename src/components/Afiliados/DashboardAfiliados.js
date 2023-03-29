import FiltroAfiliados from "./FiltroAfiliados";
import ListaAfiliados from "./ListaAfiliados";
import ExportExcelPDF from "../../helpers/ExportExcelPDF";
import NuevoAfiliado from "./NuevoAfiliado";
import Divider from "@mui/material/Divider";
import {useEffect, useState, useCallback} from "react";
import {Route, Routes, Link } from "react-router-dom";
import ButtonNew from "../../helpers/ButtonNew";
import React from "react";
import { Stack } from "@mui/material";
import ModificarAfiliado from "./ModificarAfiliado";
import useDataApp from "../../hooks/useDataApp";

const columns = [
  { header: "Apellido", dataKey: "apellido" },
  { header: "Direccion", dataKey: "direccion" },
  { header: "Email", dataKey: "email" },
  { header: "Fecha Nac.", dataKey: "fechaNacimiento" },
  { header: "Grado", dataKey: "grado" },
  { header: "Localidad", dataKey: "localidad" },
  { header: "Nombre", dataKey: "nombre" },
  { header: "Nro Socio", dataKey: "nroSocio" },
  { header: "Telefono", dataKey: "telefono" },
  { header: "Unidad Administrativa", dataKey: "ua" },
]


const DashboardAfiliados = (props) =>{

  const [listFiltrada, setListFiltrada] = useState([]);
  const [afiliados_with_keys, setAfiliados_with_keys] = useState([]);

  const { grados, localidades, unidades, afiliados, loading } = useDataApp();

  
  useEffect(()=>{
    setListFiltrada(props.lista);
  },[props.lista])

  useEffect(() => {
    const dataWithKeys = afiliados
      ? Object.entries(afiliados).map(([key, value]) => {
          return { ...value, key };
        })
      : [];
    //console.log(dataWithKeys);
    setAfiliados_with_keys(dataWithKeys);
  }, [afiliados]);

  const handlerfilterList = useCallback((filtros) => {

    const filtroSocio = filtros.nroSocio.toUpperCase();
    const filtroNombre = filtros.nombre.toUpperCase();
    const filtroApellido = filtros.apellido.toUpperCase();
    const filtroGrado = filtros.grado.toUpperCase();
    const filtroUA = filtros.ua.toUpperCase();
    const filtroLocalidad = filtros.localidad.toUpperCase();

    const lista_filtrada = Object.values(props.lista).filter(
      (afiliado) =>
        afiliado["nroSocio"].toString().includes(filtroSocio) &&
        afiliado["nombre"].includes(filtroNombre) &&
        afiliado["apellido"].includes(filtroApellido)  &&
        afiliado["grado"].includes(filtroGrado) &&
        afiliado["ua"].includes(filtroUA) &&
        afiliado["localidad"].includes(filtroLocalidad)
    );

    setListFiltrada(lista_filtrada);
  },[props.lista]);

  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Link to="new">
          <ButtonNew />
        </Link>
        <ExportExcelPDF
          lista={listFiltrada}
          columns={columns}
          titulo="Afiliados"
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <FiltroAfiliados onChangeFilter={handlerfilterList} />
      <Divider sx={{ my: 1 }} />
      <ListaAfiliados lista={listFiltrada} />
      <Routes>
        <Route
          path="new"
          element={
            <NuevoAfiliado
              modalOpen={true}
              onReloadData={props.onReloadData}
              grados={grados}
              localidades={localidades}
              unidades={unidades}
              afiliados={afiliados_with_keys}
            />
          }
        />
        <Route
          path=":id/edit"
          element={
            <ModificarAfiliado
              modalOpen={true}
              onReloadData={props.onReloadData}
              grados={grados}
              localidades={localidades}
              unidades={unidades}
              afiliados={afiliados_with_keys}
              
            />
          }
        />
      </Routes>
    </>
  );
};

export default (DashboardAfiliados);


      