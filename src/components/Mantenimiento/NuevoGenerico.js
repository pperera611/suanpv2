import Modal from "../../UI/Modal";
import FormGenerico from "./FormGenerico";
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';


const modal_title = {
    ua: "Nueva unidad administrativa",
    grados: "Nuevo grado",
    localidades: "Nueva localidad",
    gastos: "Nuevo concepto de gasto",
  };

const NuevoGenerico = (props) => {

 const [isModalOpen, setIsModalOpen] = useState(props.modalOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} tituloModal={modal_title[props.instance]}>
      <Divider />
      <FormGenerico
        onReloadData={props.onReloadData}
        onClose={closeModal}
        mode={"NEW"}
        lista={props.lista}
      />
    </Modal>
  );


};

export default NuevoGenerico;