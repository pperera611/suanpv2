import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "sonner";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const StatusAfiliado = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
  const [textoModal, setTextoModal] = useState("");
  const [afiliado, setAfiliado] = useState();
  const [disableButton, setDisableButton] = useState(false);

  const { putData } = useAxios("", "afiliados", {});
  const { id } = useParams();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let tituloModal =
    props.mode === "unsuscribe" ? "Dar de baja afiliado" : "Reactivar afiliado";
  let preguntaModal =
    props.mode === "unsuscribe" ? (
      <h4>¿Está seguro que desea dar de baja al siguiente afiliado?</h4>
    ) : (
      <h4>¿Está seguro que desea reactivar al siguiente afiliado?</h4>
    );

  useEffect(() => {
    //OJO CON ESTO POR SI PONGO DE VIVO EN EL NAVEGADOR /UNSUSCRIBE CON ID EQUIVOCADO O /REACTIVATE CON ID EQUIVOCADO
    let afiliado1 = Object.values(props.afiliados).find(
      (e) => e.id === Number(id)
    );
    let afiliado2 = Object.values(props.afiliados2).find(
      (e) => e.id === Number(id)
    );

    let afiliado = afiliado1 || afiliado2;
    //console.log(afiliado);

    if (
      (afiliado.activo && props.mode === "reactivate") ||
      (!afiliado.activo && props.mode === "unsuscribe")
    ) {
      props.mode === "reactivate"
        ? toast.error(
            "Error - se quiere reactivar un afiliado que no existe o que ya figura como activo"
          )
        : toast.error(
            "Error - se quiere dar de baja a un afiliado que no existe o que ya figura como inactivo"
          );
      navigate("/afiliados");
    }

    setAfiliado(afiliado);

    let texto = (
      <>
        <Typography gutterBottom>
          Funcionario: {afiliado.nombre + " " + afiliado.apellido}{" "}
        </Typography>
        <Typography gutterBottom>Nro de cobro :{afiliado.nroSocio}</Typography>
        <Typography gutterBottom>
          Unidad Administrativa: {afiliado.ua.name}
        </Typography>
        <Typography gutterBottom>Grado: {afiliado.grado.name}</Typography>
        <Typography gutterBottom>
          Localidad: {afiliado.localidad.name}
        </Typography>
      </>
    );
    setTextoModal(texto);
  }, [props.afiliados, props.afiliados2, id, navigate, props.mode]);

  const updateStatus = async () => {
    setDisableButton(true);
    //UNSUSCRIBE props.afiliados -> afiliados activos  //  props.afiliados2 -> afiliados inactivos
    //REACTIVATE props.afiliados -> afiliado inactivos //  props.afiliados2 -> afiliados activos

    let lista_aux = Object.values(props.afiliados).filter(
      (af) => af.id !== Number(id)
    );
    const afiliados2 = props.afiliados2;

    const data = { ...afiliado, activo: !afiliado.activo };
    //actualizo en el backend
    try {
      await new Promise((resolve, reject) => {
        putData(afiliado.key, { data })
          .then(() => resolve())
          .catch(reject);
      });
      afiliado.activo
        ? toast.success("Afiliado ha sido dado de baja con exito")
        : toast.success("Afiliado ha sido reactivado con exito");

      //si estoy dando de baja, tengo que actualizar la lista de los activos y unirlos con los inactivos para recargar el componente afiliado
      //si estoy reactivando, tengo que actualizar la lista de inactivos y unirlos con los activos para recargar el componente

      afiliados2.push(data);
      const lista_final = [...lista_aux, ...afiliados2];
      props.onReloadData(lista_final);
    } catch (error) {
      // Manejar el error si la promesa fue rechazada
      console.error(error);
      toast.error("Error - no se pudo actualizar el afiliado");
      return;
    }
    navigate("/afiliados");
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
            <Button disabled={disableButton} onClick={updateStatus}>
              {props.mode === "unsuscribe" ? "Dar de baja" : "Reactivar"}
            </Button>
          </DialogActions>
        </Item>
      </Grid>
    </Modal>
  );
};

export default StatusAfiliado;
