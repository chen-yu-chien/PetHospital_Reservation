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
import { DatePicker, LocalizationProvider, TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Reservation, ReservationEntry, ReservationResponse } from '../types';
import { updateReservation } from '../api/reservationApi';
import { getScheduleByDoctorAndDate } from '../api/scheduleApi';

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
    doctorid: number
}

function Edit({resdata, doctorid}: EditProps) {
    const {data, error, isSuccess} = useQuery({
        queryKey: ['schedule'],
        queryFn: () => getScheduleByDoctorAndDate(doctorid, resdata.date)
    })

    const [starttime, setStarttime] = useState("");
    const [endtime, setEndtime] = useState("");
    
    useEffect(() => {
        data?.forEach((schedule) => {
            setStarttime(schedule.startTime);
            setEndtime(schedule.endTime);
            console.log(starttime + ' ' + endtime);
        })
    }, [data, starttime, endtime]);

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [reservation, setReservation] = useState<Reservation>({
        date: resdata.date,
        time: resdata.time,
        symptom: resdata.symptom,
        pet: resdata.pet,
        doctor: resdata.doctor,
    })

    const handleEditOpen = () => {
        setOpen(true);
    }
    const handleEditClose = () => {
        setOpen(false);
    }
    const handleSave = () => {
        console.log(reservation)
        // const url = resdata._links.self.href;
        const resid = resdata.resid;
        const resEntry: ReservationEntry = {reservation, resid}
        mutate(resEntry);
        // setReservation({ date: '', time: '', petname: '', ownername: '', tel: ''});
        handleEditClose()
    }
    const handleTimeChange = (newTime: Dayjs | null) => {
        setReservation({date: reservation.date, time: (newTime == null)? '':newTime.format('hh:mm'), symptom: reservation.symptom,
            pet: reservation.pet, doctor: reservation.doctor});
    }
    const handleSymptomChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReservation({date: reservation.date, time: reservation.time, symptom: (event.target == null)? '':event.target.value,
            pet: reservation.pet, doctor: reservation.doctor});
        console.log(event.target.value);
    }
    // const handleDateChange = (newDate: Dayjs | null) => {
    //     // setReservation({date: (newDate == null)? '':newDate.format('YYYY-MM-DD'), time: reservation.time, 
    //     //     petname: reservation.petname, ownername: reservation.ownername, tel: reservation.tel});
    // }

    const { mutate } = useMutation(updateReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(["reservations"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    // const disabledTime: TimePickerProps<Dayjs>['shouldDisableTime'] = (
    //     value,
    //     view,
    //   ) => {
    //         if (view === 'hours') {
    //             value.hour() < starttime.hour() || value.hour() > endtime.hour();
    //         }
    //         if (view === 'minutes') {
    //             if (value.hour() === starttime.hour()){
    //                 value.minute() < starttime.minute()
    //             }
    //             if (value.hour() === endtime.hour()) {
    //                 value.minute() > endtime.minute()
    //             }
    //         }
    //         return false;
    //   };

    const disabledTime: TimePickerProps<Dayjs>['shouldDisableTime'] = (
        value,
        view,
    ) => {
        if (view === 'hours') {
                return value.hour() < parseInt(starttime.split(":")[0]) || value.hour() > parseInt(endtime.split(":")[0])
        }
        if (view === 'minutes') {
            if (value.hour() === parseInt(starttime.split(":")[0])){
                return value.minute() < parseInt(starttime.split(":")[1])
            }
            if (value.hour() === parseInt(endtime.split(":")[0])) {
                return value.minute() > parseInt(endtime.split(":")[1])
            }
        }
        return false;
    };

    if(!isSuccess){
        alert('查無資料');
    }
    else if(error){
        alert('查詢錯誤');
    }
    else{
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
                                defaultValue={dayjs(resdata.date)} 
                                // onChange={handleDateChange} 
                                disabled/>
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
                            <TimePicker format='hh:mm A' defaultValue={dayjs(resdata.date + 'T' + resdata.time)} 
                                onChange={handleTimeChange} shouldDisableTime={disabledTime}/>
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
                            看診醫生
                        </Typography>
                        <TextField id="DoctorName" fullWidth defaultValue={resdata.doctor.name} disabled></TextField>
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
                        <TextField id="PetName" fullWidth disabled defaultValue={resdata.pet.name}/>
                    </Box>
                    <Box sx={{height: '15vh', m: 2, mb: 0, mt: 0}}>
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 16,
                                mb: 1
                        }}>
                            症狀簡述
                        </Typography>
                        <TextField id="Symptom" fullWidth defaultValue={resdata.symptom} onChange={handleSymptomChange}/>
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
}

export default Edit