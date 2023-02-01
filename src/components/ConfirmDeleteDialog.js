import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';


const ConfirmDeleteDialog = (props) => {
    const { open, setDeleteConfirmOpen, onConfirm } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setDeleteConfirmOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">Confirm Delete Action</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setDeleteConfirmOpen(false)}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setDeleteConfirmOpen(false);
                        onConfirm();
                    }}
                    color="secondary"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDeleteDialog;