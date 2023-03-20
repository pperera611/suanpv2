import Modal from "../../helpers/Modal";
import FormAfiliado from "./FormAfiliado";
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';

export default function NuevoAfiliado(props) {
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);
  //const [grados, setGrados] = useState([]);
  //const [localidades, setLocalidades] = useState([]);
  //const [unidades, setUnidades] = useState([]);
  //const [afiliados, setAfiliados] = useState([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} tituloModal="Nuevo Afiliado">
        <Divider/>
        <FormAfiliado onClose={closeModal}/>
      
    </Modal>
  );
  
  
}