import Modal from "../../UI/Modal";
import FormGenerico from "./FormGenerico";
import Divider from "@mui/material/Divider";
import {modal_title_new} from "../../helpers/MessagesMantenimiento";

const NuevoGenerico = (props) => {
  return (
    <Modal isOpen={true} tituloModal={modal_title_new[props.instance]}>
      <Divider />
      <FormGenerico
        onReloadData={props.onReloadData}
        mode={"NEW"}
        lista={props.lista}
        instance={props.instance}
      />
    </Modal>
  );
};

export default NuevoGenerico;
