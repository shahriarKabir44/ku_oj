import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ModalManager from '../../EventsManager/ModalManager';

function ConfirmationModal() {
    const [modal, setModal] = React.useState({
        open: false,
        title: '',
        message: '',
        type: 'alert',
        showConfirmButton: true,
        showCancelButton: false,
        onConfirm: () => {},
        onCancel: () => {}
    });

    React.useEffect(() => {
        ModalManager.subscribe({
            showModal: (config) => {
                setModal({
                    open: true,
                    ...config
                });
            }
        });
    }, []);

    const handleConfirm = () => {
        modal.onConfirm();
        setModal(prev => ({ ...prev, open: false }));
    };

    const handleCancel = () => {
        modal.onCancel();
        setModal(prev => ({ ...prev, open: false }));
    };

    const handleClose = () => {
        modal.onCancel();
        setModal(prev => ({ ...prev, open: false }));
    };

    return (
        <Dialog
            open={modal.open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{modal.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {modal.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {modal.showCancelButton && (
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                )}
                {modal.showConfirmButton && (
                    <Button 
                        onClick={handleConfirm} 
                        color="primary" 
                        variant="contained"
                        autoFocus
                    >
                        {modal.type === 'confirmation' ? 'Confirm' : 'OK'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationModal;