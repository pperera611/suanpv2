import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const dataRequests = {
    grados: {
        method: "GET",
        url: "grados",
        headers: { accept: "*/*" },
    },
    localidades: {
        method: "GET",
        url: "localidades",
        headers: { accept: "*/*" },
    },
    unidades: {
        method: "GET",
        url: "unidades",
        headers: { accept: "*/*" },
    },
    afiliados: {
        method: "GET",
        url: "afiliados",
        headers: { accept: "*/*" },
    },
    gastos: {
      method: "GET",
      url: "gastos",
      headers: { accept: "*/*" },
  },
};

const useDataApp = () => {
  const [data, setData] = useState({
    grados: [],
    localidades: [],
    unidades: [],
    afiliados: [],
    gastos: []
  });
  
  const dataGrados = useAxios(
    dataRequests.grados.method,
    dataRequests.grados.url,
    { headers: dataRequests.grados.headers }
  );
  const dataLocalidades = useAxios(
    dataRequests.localidades.method,
    dataRequests.localidades.url,
    { headers: dataRequests.localidades.headers }
  );
  const dataUnidades = useAxios(
    dataRequests.unidades.method,
    dataRequests.unidades.url,
    { headers: dataRequests.unidades.headers }
  );
  const dataAfiliados = useAxios(
    dataRequests.afiliados.method,
    dataRequests.afiliados.url,
    { headers: dataRequests.afiliados.headers }
  );
  const dataGastos = useAxios(
    dataRequests.gastos.method,
    dataRequests.gastos.url,
    { headers: dataRequests.gastos.headers }
  );

  
  useEffect(() => {
    const updateData = (key, value) => {
      setData((prevData) => ({ ...prevData, [key]: value }));
    };

    if (!dataGrados.error && dataGrados.response) {
      updateData("grados", dataGrados.response);
    }
    if (!dataLocalidades.error && dataLocalidades.response) {
      updateData("localidades", dataLocalidades.response);
    }
    if (!dataUnidades.error && dataUnidades.response) {
      updateData("unidades", dataUnidades.response);
    }
    if (!dataAfiliados.error && dataAfiliados.response) {
      updateData("afiliados", dataAfiliados.response);
    }
    if (!dataGastos.error && dataGastos.response) {
      updateData("gastos", dataGastos.response);
    }
  }, [
    dataGrados.response,
    dataGrados.error,
    dataLocalidades.response,
    dataLocalidades.error,
    dataUnidades.response,
    dataUnidades.error,
    dataAfiliados.response,
    dataAfiliados.error,
    dataGastos.response,
    dataGastos.error
  ]);

  return {
    grados: data.grados,
    localidades: data.localidades,
    unidades: data.unidades,
    afiliados: data.afiliados,
    gastos: data.gastos,
    loading:
    dataGrados.loading ||
    dataLocalidades.loading ||
    dataUnidades.loading ||
    dataAfiliados.loading ||
    dataGastos.loading
    
  };
}

export default useDataApp;