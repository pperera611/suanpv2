import Modal from "../../UI/Modal";
import FormGenerico from "./FormGenerico";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

const modal_title = {
    ua: "Modificar unidad administrativa",
    grados: "Modificar grado",
    localidades: "Modificar localidad",
    gastos: "Modificar concepto de gasto",
  };

const ModificarGenerico = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
    const { id } = useParams()

    const closeModal = () => {
      setIsModalOpen(false);
    };
     
    return (
       <Modal isOpen={isModalOpen} tituloModal={modal_title[props.instance]}>
         
         <FormGenerico
           onReloadData={props.onReloadData}
           onClose={closeModal}
           mode={"EDIT"}
           id={id}
           lista={props.lista}
         />
       </Modal>
     );

};

export default ModificarGenerico;
