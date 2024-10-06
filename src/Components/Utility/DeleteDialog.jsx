import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = ({
    open,
    handleClose,
    onDeleteHandler
}) => {

    const onConfirmHandler = ()=>{
        onDeleteHandler();
        handleClose();
    }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you wish to delete this task permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button type="submit" onClick={onConfirmHandler}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteDialog