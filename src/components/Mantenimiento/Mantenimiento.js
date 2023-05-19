import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../../UI/TabPanel";
import Generico from "./Generico";
import Spinner from "../../UI/Spinner";
import useDataApp from "../../hooks/useDataApp";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import NuevoGenerico from "./NuevoGenerico";
import ModificarGenerico from "./ModificarGenerico";
import BorrarGenerico from "./BorrarGenerico";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Mantenimiento(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabIndex = {
    "/mantenimiento/unidades": 0,
    "/mantenimiento/grados": 1,
    "/mantenimiento/localidades": 2,
    "/mantenimiento/gastos": 3,
  };
  const [value, setValue] = useState(tabIndex[location.pathname] || 0);
  const [gradosReloadData, setGradosReloadData] = useState([]);
  const [unidadesReloadData, setUnidadesReloadData] = useState([]);
  const [localidadesReloadData, setLocalidadesReloadData] = useState([]);
  const [gastosReloadData, setGastosReloadData] = useState([]);
  
  const { grados, localidades, unidades, gastos, loading } = useDataApp();

  useEffect(() => {
    //cuando carga el componente al principio
    const gradosWithKeys = transformDataWithKeys(grados);
    const localidadesWithKeys = transformDataWithKeys(localidades);
    const unidadesWithKeys = transformDataWithKeys(unidades);
    const gastosWithKeys = transformDataWithKeys(gastos);

    setGradosReloadData(gradosWithKeys);
    setLocalidadesReloadData(localidadesWithKeys);
    setUnidadesReloadData(unidadesWithKeys);
    setGastosReloadData(gastosWithKeys)

  }, [grados, localidades, unidades, gastos]);

  const triggerReload = (lista, instance) => {
  
    const updatedList = [...lista];
    if (instance === "unidades") {
      setUnidadesReloadData(updatedList);
    } else if (instance === "grados") {
      setGradosReloadData(updatedList);
    } else if (instance === "localidades") {
      setLocalidadesReloadData(updatedList);
    } else if (instance === "gastos") {
      setGastosReloadData(updatedList);
    }
   
  };

  const transformDataWithKeys = (data) => {
    return data
      ? Object.entries(data).map(([key, value]) => {
          return { ...value, key };
        })
      : [];
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/mantenimiento/unidades");
        break;
      case 1:
        navigate("/mantenimiento/grados");
        break;
      case 2:
        navigate("/mantenimiento/localidades");
        break;
      case 3:
        navigate("/mantenimiento/gastos");
        break;
      default:
        break;
    }
  };

  if (loading) {
    <Spinner />;
  }

  return (
    <Box>
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Unidades Administrativas" {...a11yProps(0)} />
          <Tab label="Grados" {...a11yProps(1)} />
          <Tab label="Localidades" {...a11yProps(2)} />
          <Tab label="Concepto gastos" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {value === 0 && <Generico instance="unidades" lista={unidadesReloadData} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Generico instance="grados" lista={gradosReloadData} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && (
          <Generico instance="localidades" lista={localidadesReloadData} />
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {value === 3 && <Generico instance="gastos" lista={gastosReloadData} />}
      </TabPanel>
      <Routes>
        <Route
          path="unidades/new"
          element={
            <NuevoGenerico
              onReloadData={triggerReload}
              instance="unidades"
              lista={unidadesReloadData}
            />
          }
        />
        <Route
          path="unidades/:id/edit"
          element={
            <ModificarGenerico
              onReloadData={triggerReload}
              instance="unidades"
              lista={unidadesReloadData}
            />
          }
        />
        <Route
          path="unidades/:id/delete"
          element={
            <BorrarGenerico
              onReloadData={triggerReload}
              instance="unidades"
              lista={unidadesReloadData}
            />
          }
        />
        <Route
          path="grados/new"
          element={
            <NuevoGenerico
              onReloadData={triggerReload}
              instance="grados"
              lista={gradosReloadData}
            />
          }
        />
        <Route
          path="grados/:id/edit"
          element={
            <ModificarGenerico
              onReloadData={triggerReload}
              instance="grados"
              lista={gradosReloadData}
            />
          }
        />
        <Route
          path="grados/:id/delete"
          element={
            <BorrarGenerico
              onReloadData={triggerReload}
              instance="grados"
              lista={gradosReloadData}
            />
          }
        />
        <Route
          path="localidades/new"
          element={
            <NuevoGenerico
              onReloadData={triggerReload}
              instance="localidades"
              lista={localidadesReloadData}
            />
          }
        />
        <Route
          path="localidades/:id/edit"
          element={
            <ModificarGenerico
              onReloadData={triggerReload}
              instance="localidades"
              lista={localidadesReloadData}
            />
          }
        />
        <Route
          path="localidades/:id/delete"
          element={
            <BorrarGenerico
              onReloadData={triggerReload}
              instance="localidades"
              lista={localidadesReloadData}
            />
          }
        />
        <Route
          path="gastos/new"
          element={
            <NuevoGenerico
              onReloadData={triggerReload}
              instance="gastos"
              lista={gastosReloadData}
            />
          }
        />
        <Route
          path="gastos/:id/edit"
          element={
            <ModificarGenerico
              onReloadData={triggerReload}
              instance="gastos"
              lista={gastosReloadData}
            />
          }
        />
        <Route
          path="gastos/:id/delete"
          element={
            <BorrarGenerico
              onReloadData={triggerReload}
              instance="gastos"
              lista={gastosReloadData}
            />
          }
        />
      </Routes>
    </Box>
  );
}
