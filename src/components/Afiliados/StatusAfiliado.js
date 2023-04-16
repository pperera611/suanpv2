import {useEffect, useState} from "react";
import Modal from "../../UI/Modal";
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StatusAfiliado = (props) =>{

    const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
    const [textoModal, setTextoModal] = useState("");
    const { id } = useParams();

    const closeModal = () => {
      setIsModalOpen(false);
    };

    let tituloModal = (props.mode === "unsuscribe") ? "Dar de baja afiliado" : "Reactivar afiliado";
    let preguntaModal =
      props.mode === "unsuscribe" ? (
        <h4>¿Está seguro que desea dar de baja al siguiente afiliado?</h4>
      ) : (
        <h4>¿Está seguro que desea reactivar al siguiente afiliado?</h4>
      );
    
    useEffect(() => {
        
        let afiliado = Object.values(props.afiliados).find(
            (e) => e.id === Number(id)
          );
          
        let texto = (
          <>
            <Typography gutterBottom>Funcionario: {afiliado.nombre + " " + afiliado.apellido} </Typography>
            <Typography gutterBottom>Nro de cobro :{afiliado.nroSocio}</Typography>
            <Typography gutterBottom>Unidad Administrativa: {afiliado.ua.name}</Typography>
            <Typography gutterBottom>Grado: {afiliado.grado.name}</Typography>
            <Typography gutterBottom>Localidad: {afiliado.localidad.name}</Typography>
          </>
        );
            setTextoModal(texto);
        }, [props.afiliados,id]);

    const updateStatus = () => {
        console.log("updateStatus")
    };

    return (
      <Modal isOpen={isModalOpen} tituloModal={tituloModal} size="sm">
        <Divider />
        <Grid item xs={12}>
          <Item>
            {preguntaModal}
            {textoModal}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Divider />
            <DialogActions>
              <Link to="/afiliados" style={{ textDecoration: "none" }}>
                <Button onClick={closeModal}>Cancelar</Button>
              </Link>
              <Button onClick={updateStatus}>
                {props.mode === "unsuscribe" ? "Dar de baja" : "Reactivar"}
              </Button>
            </DialogActions>
          </Item>
        </Grid>
      </Modal>
    );

};

export default StatusAfiliado;