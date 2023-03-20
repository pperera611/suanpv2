import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const dataRequests = {
    grados: {
        method: "get",
        url: "/grados.json",
        headers: { accept: "*/*" },
    },
    localidades: {
        method: "get",
        url: "/localidades.json",
        headers: { accept: "*/*" },
    },
    unidades: {
        method: "get",
        url: "/unidades.json",
        headers: { accept: "*/*" },
    },
    afiliados: {
        method: "get",
        url: "/afiliados.json",
        headers: { accept: "*/*" },
    },
};


const useDataApp = () => {
      
    const [data, setData] = useState({
        grados: [],
        localidades: [],
        unidades: [],
        afiliados: [],
      });
    
    
    const dataGrados = useAxios(dataRequests.grados);
    const dataLocalidades = useAxios(dataRequests.localidades);
    const dataUnidades = useAxios(dataRequests.unidades);
    const dataAfiliados = useAxios(dataRequests.afiliados);

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
      }, [dataGrados, dataLocalidades, dataUnidades, dataAfiliados]);

   console.log("useDataApp")
    
    return {grados: data.grados,
            localidades: data.localidades,
            unidades: data.unidades,
            afiliados: data.afiliados};

}

export default useDataApp;