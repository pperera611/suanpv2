import Modal from "../../UI/Modal";
import FormGenerico from "./FormGenerico";
import { useParams } from "react-router-dom";
import {modal_title_edit} from "../../helpers/MessagesMantenimiento";


const ModificarGenerico = (props) => {
  const { id } = useParams();
  
  return (
    <Modal isOpen={true} tituloModal={modal_title_edit[props.instance]}>
      <FormGenerico
        onReloadData={props.onReloadData}
        mode={"EDIT"}
        id={id}
        lista={props.lista}
        instance={props.instance}
      />
    </Modal>
  );
};

export default ModificarGenerico;
