import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

const useHistoriaAxios = (afiliadoKey) => {
    const url = `afiliados/${afiliadoKey}/historia`;
    const { response, error, loading } = useAxios("GET", url, {});
    return { response, error, loading };
  };


const HistorialAfiliado = (props) => {
  
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
  const { id } = useParams();



  const afiliado1 = Object.values(props.afiliados).find((e) => e.id === Number(id));
  const afiliado2 = Object.values(props.afiliados2).find((e) => e.id === Number(id));
  const afiliado = afiliado1 || afiliado2;
  const { response, error, loading } = useHistoriaAxios(afiliado.key);

  useEffect(() => {
    console.log(response);
  }, [response]);


  const closeModal = () => {
    setIsModalOpen(false);
  };

 


  return (
    <Modal isOpen={isModalOpen} tituloModal="Historial Afiliado" size="sm">
      <Divider />
      <Grid item xs={12}>
        <Item>

          

        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Divider />
          <DialogActions>
            <Link to="/afiliados" style={{ textDecoration: "none" }}>
              <Button onClick={closeModal}>Cancelar</Button>
            </Link>
          </DialogActions>
        </Item>
      </Grid>
    </Modal>
  );
};

export default HistorialAfiliado;
