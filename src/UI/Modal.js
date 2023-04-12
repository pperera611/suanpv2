import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';


const Modal = ({ children, isOpen, onClose, tituloModal }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Dialog fullWidth={true} maxWidth='md' open={isOpen} onClose={onClose}>
        <DialogTitle>{tituloModal}</DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
      </Dialog>,
    document.getElementById('modal-root')
  );
};

export default Modal;