import Modal from "../../helpers/Modal";
import FormAfiliado from "./FormAfiliado";
import Divider from '@mui/material/Divider';
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
        <Divider/>
        <FormAfiliado onReloadData={props.onReloadData} onClose={closeModal} mode={"EDIT"} id={id}/>
      
    </Modal>
  );
  
  
}