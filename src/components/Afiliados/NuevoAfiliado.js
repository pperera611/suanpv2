import Modal from "../../UI/Modal";
import FormAfiliado from "./FormAfiliado";
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';

export default function NuevoAfiliado(props) {
  
  const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} tituloModal="Nuevo Afiliado">
      <Divider />
      <FormAfiliado
        onReloadData={props.onReloadData}
        onClose={closeModal}
        mode={"NEW"}
        grados={props.grados}
        localidades={props.localidades}
        unidades={props.unidades}
        afiliados={props.afiliados}
      />
    </Modal>
  );
  
  
}