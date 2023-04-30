import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Modal from "../../UI/Modal";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import { toast } from "sonner";
import {
  modal_title_delete,
  textQuestionDelete,
  toastMessagesSuccessDelete,
  toastMessagesErrorDelete,
  messageErrorDelete,
} from "../../helpers/MessagesMantenimiento";

const BorrarGenerico = (props) => {
  const [deleteOk, setDeleteOk] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  
  const { response, loading } = useAxios("GET", "afiliados", {});
  const { deleteData } = useAxios("", props.instance, {});
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const elemento = props.lista.find((e) => e.id === Number(id));

  const handleCancelarClick = () => {
    // Navega a la ruta sin el último elemento
    navigate(-1);
  };

  const  deleteElement = async () => {
    // Navega a la ruta sin el último elemento
    let lista_aux = Object.values(props.lista).filter(
        (e) => e.id !== Number(id)
      );
    
    lista_aux.sort((a, b) => {
        return a.name.localeCompare(b.name);
      }); //la ordeno por nombre
    
    setDisableButton(true);
    try {
        await new Promise((resolve, reject) => {
            deleteData(elemento.key)
              .then(() => resolve())
              .catch(reject);
          });
      props.onReloadData(lista_aux, props.instance);
      toast.success(toastMessagesSuccessDelete[props.instance]);

    } catch (error) {
      toast.error(toastMessagesErrorDelete);
    }
    navigate(-1);
  };

  useEffect(() => {
    let key = "";
    if (props.instance === "unidades") key = "ua";
    else if (props.instance === "grados") key = "grado";
    else if (props.instance === "localidades") key = "localidad";
    else key = "gasto";

    if (response) {
      let found = false;
      const entries = Object.entries(response);
      for (let i = 0; i < entries.length && !found; i++) {
        const element = entries[i];
        //console.log(element[1][key]);
        if (element[1][key].id === Number(id)) {
          setDeleteOk(false);
          setDisableButton(true);
          found = true;
        }
      }
      if (!found) setDisableButton(false);
    }
  }, [response, props.instance, id]);

  if (loading) {
    <Spinner />;
  }

  return (
    <Modal
      isOpen={true}
      tituloModal={modal_title_delete[props.instance] + " : " + elemento?.name}
      size="sm"
    >
      <Divider />
      <Grid item xs={12}>
        <Item>
          {deleteOk
            ? textQuestionDelete[props.instance]
            : messageErrorDelete[props.instance]}
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Divider />
          <DialogActions>
            <Button onClick={handleCancelarClick}>Cancelar</Button>
            <Button disabled={disableButton} onClick={deleteElement}>
              Eliminar
            </Button>
          </DialogActions>
        </Item>
      </Grid>
    </Modal>
  );
};

export default BorrarGenerico;
