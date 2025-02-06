import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, FormControl, TextField } from '@mui/material';
import { DatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation, ReservationEntry, ReservationResponse } from '../types';
import { updateReservation } from '../api/reservationApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type EditProps = {
    resdata: ReservationResponse,
    // doctordate: string,
    // doctortime: string,
    // petname: string,
    // ownername: string,
    // telephone: string
}

function Edit({resdata}: EditProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [reservation, setReservation] = useState<Reservation>({
        date: resdata.date,
        time: resdata.time,
        petname: resdata.petname,
        ownername: resdata.ownername,
        tel: resdata.tel
    })

    const handleEditOpen = () => {
        setOpen(true);
    }
    const handleEditClose = () => {
        setOpen(false);
    }
    const handleSave = () => {
        // console.log(reservation)
        const url = resdata._links.self.href;
        const resEntry: ReservationEntry = {reservation, url}
        mutate(resEntry);
        // setReservation({ date: '', time: '', petname: '', ownername: '', tel: ''});
        handleEditClose()
    }
    const handleTimeChange = (newTime: Dayjs | null) => {
        setReservation({date: reservation.date, time: (newTime == null)? '':newTime.format('hh:mm'), 
            petname: reservation.petname, ownername: reservation.ownername, tel: reservation.tel});
    }
    const handleDateChange = (newDate: Dayjs | null) => {
        setReservation({date: (newDate == null)? '':newDate.format('YYYY-MM-DD'), time: reservation.time, 
            petname: reservation.petname, ownername: reservation.ownername, tel: reservation.tel});
    }
    const handlePetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReservation({date: reservation.date, time: reservation.time, 
            petname: event.target.value, ownername: reservation.ownername, tel: reservation.tel});
    }
    const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReservation({date: reservation.date, time: reservation.time, 
            petname: reservation.petname, ownername: event.target.value, tel: reservation.tel});
    }
    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReservation({date: reservation.date, time: reservation.time, 
            petname: reservation.petname, ownername: reservation.ownername, tel: event.target.value});
    }

    const { mutate } = useMutation(updateReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(["reservations"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    return (
        <React.Fragment>
        <Button sx={{
            border: 1,
            borderColor: 'aquamarine',
            borderWidth: 2,
            bgcolor: 'white',
            color: 'aquamarine',
            ":hover": {bgcolor: "aquamarine", color: "white"}}}
            onClick={handleEditOpen}
        >
            <Typography sx={{color: 'inherit', fontSize: 18, fontWeight: 700}}>
                修改
            </Typography>
        </Button>
        <BootstrapDialog
            onClose={handleEditClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2, pb: 1, fontWeight: 600 }}>
                預約記錄修改
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleEditClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers sx={{height: '70vh', weight: '50vw'}}>
                <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                    <Typography
                        sx={{
                        fontFamily: 'monospace',
                        fontWeight: 550,
                        fontSize: 16,
                        mb: 1
                    }}>
                        預約日期
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format='YYYY-MM-DD' sx={{svg: {color: 'aquamarine'}}}
                            defaultValue={dayjs(resdata.date)} onChange={handleDateChange}/>
                    </LocalizationProvider>
                </Box>
                <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                    <Typography
                        sx={{
                        fontFamily: 'monospace',
                        fontWeight: 550,
                        fontSize: 16,
                        mb: 1
                    }}>
                        預約時間
                    </Typography>
                    <FormControl sx={{svg: {color: 'aquamarine'}}} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopTimePicker format='hh:mm A' defaultValue={dayjs(resdata.date + 'T' + resdata.time)} onChange={handleTimeChange}/>
                    </LocalizationProvider>
                    </FormControl>
                </Box>
                <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                    <Typography
                        // variant="h6" 
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                            fontSize: 16,
                            mb: 1
                    }}>
                        寵物名字
                    </Typography>
                    <TextField id="PetName" fullWidth InputProps={{readOnly: true,}} 
                        defaultValue={resdata.petname} onChange={handlePetChange}></TextField>
                </Box>
                <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                    <Typography
                        // variant="h6" 
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                            fontSize: 16,
                            mb: 1
                    }}>
                        飼主姓名
                    </Typography>
                    <TextField id="PetName" fullWidth InputProps={{readOnly: true,}} 
                        defaultValue={resdata.ownername} onChange={handleOwnerChange}></TextField>
                </Box>
                <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                    <Typography
                        // variant="h6" 
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                            fontSize: 16,
                            mb: 1
                    }}>
                        聯絡電話
                    </Typography>
                    <TextField id="PetName" fullWidth InputProps={{readOnly: true,}} 
                        defaultValue={resdata.tel} onChange={handleTelChange}></TextField>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleSave} sx={{fontSize: 15}}>
                確認修改
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </React.Fragment>
    );
}

export default Edit