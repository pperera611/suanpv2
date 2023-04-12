import Modal from "../../helpers/Modal";
import FormAfiliado from "./FormAfiliado";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";

export default function ModificarAfiliado(props) {
  
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
  const { id } = useParams()
  const closeModal = () => {
    setIsModalOpen(false);
  };
   return (
     <Modal isOpen={isModalOpen} tituloModal="Modificar Afiliado">
       
       <FormAfiliado
         onReloadData={props.onReloadData}
         onClose={closeModal}
         mode={"EDIT"}
         id={id}
         grados={props.grados}
         localidades={props.localidades}
         unidades={props.unidades}
         afiliados={props.afiliados}
       />
     </Modal>
   );
  
   
}