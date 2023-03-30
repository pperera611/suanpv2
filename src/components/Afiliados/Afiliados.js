import React from 'react';
import {useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "../../helpers/TabPanel";
import useAxios from "../../hooks/useAxios";
import DashboardAfiliados from "../Afiliados/DashboardAfiliados";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
 
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Afiliados(props) {
  
  const [value, setValue] = React.useState(0);
  const [afiliadosActivos, setAfiliadosActivos] = useState([]);
  const [afiliadosInactivos, setAfiliadosInactivos] = useState([]);
  //const [reloadData, setReloadData] = useState(false);
  const [listaReloadData, setlistaReloadData] = useState([]);

  const { response, error, loading } = useAxios("GET", "afiliados",{},);
  
  const triggerReload = (lista) => {
     //setReloadData(prev=>!prev);
     console.log("triggerReload");
     //console.log("lista: ", lista)
     setlistaReloadData(lista);
    
  };
  
  useEffect(() => {
    const dataWithKeys = response
      ? Object.entries(response).map(([key, value]) => {
          return { ...value, key };
        })
      : [];
    //console.log(dataWithKeys);
    setlistaReloadData(dataWithKeys);
  }, [response]);


  useEffect(() => {

    let lista = listaReloadData;
    
    console.log(lista);
    let lista_aux1 = [], lista_aux2 = [];
    for(let i in lista){
      //console.log(response[i]);

      const {activo, apellido, direccion, nombre, email, fechaNacimiento,grado, id, localidad, nroSocio, telefono, ua, key} = lista[i];

      const afiliado = {
        activo: activo,
        apellido: apellido,
        direccion: direccion,
        nombre: nombre,
        email: email,
        fechaNacimiento: fechaNacimiento,
        grado: grado,
        id: id,
        localidad: localidad,
        nroSocio: nroSocio,
        telefono: telefono,
        ua: ua,
        key: key
      };

      if (lista[i].activo) lista_aux1.push(afiliado)
      else lista_aux2.push(afiliado)
    }
    setAfiliadosActivos(lista_aux1);
    setAfiliadosInactivos(lista_aux2);


  }, [listaReloadData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let mensaje;
  if (error) {
    mensaje = <div> Error </div>;
  }
  if (loading) {
    mensaje = <div> Loading...</div>;
  }
  
  return (
    
    <Box>
      <Box sx={{  width: '100%' , borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Afiliados Activos" {...a11yProps(0)} />
          <Tab label="Afiliados Inactivos" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      {loading || error ? mensaje : <DashboardAfiliados lista={afiliadosActivos} activo ={true} onReloadData={triggerReload}/>}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {loading || error ? mensaje : <DashboardAfiliados lista={afiliadosInactivos} activo ={false} onReloadData={triggerReload}/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

