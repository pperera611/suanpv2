import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';


const Modal = ({ children, isOpen, onClose, size, tituloModal }) => {
  if (!isOpen) {
    return null;
  }

  if (size === undefined) size='md'

  return ReactDOM.createPortal(
    <Dialog fullWidth={true} maxWidth={size} open={isOpen} onClose={onClose}>
        <DialogTitle>{tituloModal}</DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
      </Dialog>,
    document.getElementById('modal-root')
  );
};

export default Modal;