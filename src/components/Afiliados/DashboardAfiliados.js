import FiltroAfiliados from "./FiltroAfiliados";
import ListaAfiliados from "./ListaAfiliados";
import ExportExcelPDF from "../../helpers/ExportExcelPDF";
import NuevoAfiliado from "./NuevoAfiliado";
import Divider from "@mui/material/Divider";
import {useEffect, useState, useCallback} from "react";
import {Route, Routes, Link } from "react-router-dom";
import ButtonNew from "../../UI/ButtonNew";
import React from "react";
import { Stack } from "@mui/material";
import ModificarAfiliado from "./ModificarAfiliado";
import StatusAfiliado from "./StatusAfiliado";
import useDataApp from "../../hooks/useDataApp";
import Spinner from "../../UI/Spinner";


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
  const [localidadesName, setLocalidadesName] = useState([]);
  const { grados, localidades, unidades, loading } = useDataApp();
  

  useEffect(() => {
    let lista_aux = [];
    for (let i = 0; i < localidades.length; i++) {
      lista_aux.push(localidades[i].name.toUpperCase());
    }
    setLocalidadesName(lista_aux);
  },[localidades]);

  useEffect(()=>{
    setListFiltrada(props.lista);
  },[props.lista])
  
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
        afiliado["grado"].name.includes(filtroGrado) &&
        afiliado["ua"].name.includes(filtroUA) &&
        afiliado["localidad"].name.includes(filtroLocalidad)
    );

    setListFiltrada(lista_filtrada);
  },[props.lista]);

  if (loading) {
    return <Spinner/>;
  }
 
  return (
    <>
      <Stack direction="row" spacing={1}>
        {props.activo && (
          <Link to="new">
            <ButtonNew title="Agregar nuevo afiliado"/>
          </Link>
        )}
        <ExportExcelPDF
          lista={listFiltrada}
          columns={columns}
          titulo="Afiliados"
        />
      </Stack>
      <Divider sx={{ my: 1 }} />
      <FiltroAfiliados localidades={localidadesName} onChangeFilter={handlerfilterList} />
      <Divider sx={{ my: 1 }} />
      <ListaAfiliados lista={listFiltrada} activo={props.activo}/>
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
              afiliados={props.lista}
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
              afiliados={props.lista}
            />
          }
        />
        <Route
          path=":id/unsuscribe"
          element={
            <StatusAfiliado
              modalOpen={true}
              mode = "unsuscribe"
              onReloadData={props.onReloadData}
              afiliados = {props.lista} //af activos
              afiliados2 = {props.lista2} //af inactivos
            />
          }
        />
        <Route
          path=":id/reactivate"
          element={
            <StatusAfiliado
              modalOpen={true}
              mode = "reactivate"
              onReloadData={props.onReloadData}
              afiliados = {props.lista} //af inactivos
              afiliados2 = {props.lista2} //af activos
            />
          }
        />
      </Routes>
    </>
  );
};

export default (DashboardAfiliados);


      