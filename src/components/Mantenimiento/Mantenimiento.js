import { useState } from "react";
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
    "/mantenimiento/ua": 0,
    "/mantenimiento/grados": 1,
    "/mantenimiento/localidades": 2,
    "/mantenimiento/gastos": 3,
  };
  const [value, setValue] = useState(tabIndex[location.pathname] || 0);

  const { grados, localidades, unidades, loading } = useDataApp();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/mantenimiento/ua");
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

  let gastos = [];
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
        {value === 0 && <Generico instance="ua" lista={unidades} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value === 1 && <Generico instance="grados" lista={grados} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {value === 2 && <Generico instance="localidades" lista={localidades} />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {value === 3 && <Generico instance="gastos" lista={gastos}/>}
      </TabPanel>
      <Routes>
        <Route
          path="ua/new"
          element={
            <NuevoGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="ua"
              lista={unidades}
            />
          }
        />
        <Route
          path="ua/:id/edit"
          element={
            <ModificarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="ua"
              lista={unidades}
            />
          }
        />
        <Route
          path="ua/:id/delete"
          element={
            <BorrarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="ua"
              lista={unidades}
            />
          }
        />
        <Route
          path="grados/new"
          element={
            <NuevoGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="grados"
              lista={grados}
            />
          }
        />
        <Route
          path="grados/:id/edit"
          element={
            <ModificarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="grados"
              lista={grados}
            />
          }
        />
        <Route
          path="grados/:id/delete"
          element={
            <BorrarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="grados"
              lista={grados}
            />
          }
        />
        <Route
          path="localidades/new"
          element={
            <NuevoGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="localidades"
              lista={localidades}
            />
          }
        />
        <Route
          path="localidades/:id/edit"
          element={
            <ModificarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="localidades"
              lista={localidades}
            />
          }
        />
        <Route
          path="localidades/:id/delete"
          element={
            <BorrarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="localidades"
              lista={localidades}
            />
          }
        />
        <Route
          path="gastos/new"
          element={
            <NuevoGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="gastos"
            />
          }
        />
        <Route
          path="gastos/:id/edit"
          element={
            <ModificarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="gastos"
              lista={gastos}
            />
          }
        />
        <Route
          path="gastos/:id/delete"
          element={
            <BorrarGenerico
              modalOpen={true}
              onReloadData={props.onReloadData}
              instance="gastos"
              lista={gastos}
            />
          }
        />
      </Routes>
    </Box>
  );
}
