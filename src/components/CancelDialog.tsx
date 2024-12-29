import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

function Cancel() {
    const [open, setOpen] = React.useState(false);

    const handleCancelOpen = () => {
        setOpen(true);
    };

    const handleCancelClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <Button sx={{
            border: 1,
            borderColor: 'aquamarine',
            borderWidth: 2,
            bgcolor: 'white',
            color: 'aquamarine',
            ":hover": {bgcolor: "aquamarine", color: "white"}}}   
            onClick={handleCancelOpen}
        >
            <Typography sx={{color: 'inherit', fontSize: 18, fontWeight: 700}}>
                取消
            </Typography>
        </Button>
        <Dialog
            open={open}
            onClose={handleCancelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{ m: 1, p: 2, fontWeight: 600 }}>
                預約紀錄取消
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                是否確定取消預約紀錄？
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelClose} sx={{fontSize: 15}}>是</Button>
            <Button onClick={handleCancelClose} autoFocus sx={{fontSize: 15}}>
                否
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

export default Cancel