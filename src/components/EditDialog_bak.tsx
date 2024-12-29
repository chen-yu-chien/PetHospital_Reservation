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
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getScheduleByDoctor } from '../api/scheduleApi';
import { ReservationEntry, ReservationResponse, ScheduleResponse } from '../types';
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
    doctordate: string,
    doctortime: string,
    doctorid: string,
    doctorname: string,
    petid: string
    petname: string,
    symptom: string
}

function Edit({resdata, doctordate, doctortime, doctorid, doctorname, petid, petname, symptom}: EditProps) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [docdate, setDocdate] = useState(doctordate);
    const [starttime, setStarttime] = useState(doctortime);
    const [endtime, setEndtime] = useState(doctortime);
    const [doctime, setDoctime] = useState(doctortime);
    const [sym] = useState(symptom);
    const [reservation, setReservation] = useState({
        docdate: '',
        doctime: '',
        symptom: '',
        petid: 0,
        doctorid: 0
    })
    const timeList = []
    const dateList = []
    
    const handleEditOpen = () => {
        setOpen(true);
    }
    const handleEditClose = () => {
        setOpen(false);
    }
    const handleSave = () => {
        setReservation({docdate: docdate, doctime: doctime, symptom: sym, petid: parseInt(petid), 
            doctorid: parseInt(doctorid)});        
        const url = resdata._links.self.href;
        const resEntry: ReservationEntry = {reservation, url}
        mutate(resEntry);
        setReservation({ docdate: '', doctime: '', symptom: '', petid: 0, doctorid: 0 });
        handleEditClose()
    }
    const handleTimeChange = (event: SelectChangeEvent<string>) => {
        setDoctime(event.target.value)
    }
    const handleDateChange = (newDate: Dayjs | null) => {
        setDocdate((newDate == null)? '':newDate.format('YYYY/MM/DD'))
        
    }
    
    const { mutate } = useMutation(updateReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries(["reservations"]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    // const GetDates = () => {
    //     const {data, error, isSuccess} = useQuery({
    //     queryKey: ['doctors'],
    //     queryFn: () => getScheduleByDoctor(doctorid)
    //     })
    
    //     if(!isSuccess){
    //         alert("GetDocname not success");
    //     }
    //     else if(error){
    //         alert("GetDocname error");
    //     }
    //     else{
    //         let i = 0;
    //         data.map((schedule: ScheduleResponse) => {
    //             dateList.push({date: schedule.date})
    //             i++;
    //         })
    //         if(i == 0)
    //             alert("No data");
    //     }
    // }
    const GetStartAndEndtime = () => {
        const {data, error, isSuccess} = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getScheduleByDoctor(doctorid)
        })
    
        if(!isSuccess){
            alert("GetDocname not success");
        }
        else if(error){
            alert("GetDocname error");
        }
        else{
            let i = 0;
            data.map((schedule: ScheduleResponse) => {
                setStarttime(schedule.starttime);
                setEndtime(schedule.endtime);
                i++;
            })
            if(i == 0)
                alert("No data");
        }
    }
    
    GetStartAndEndtime()
    const startTime = parseInt(starttime.split(':')[0] + starttime.split(':')[1])
    const endTime = parseInt(endtime.split(':')[0] + endtime.split(':')[1])
    for(let i = startTime; i < endTime; i = i+15){
        if(i % 100 >= 60)
            i = (Math.ceil(i / 100)) * 100
        const time = i.toString();
        timeList.push({time: time.substring(0,2) + ':' + time.substring(2)});
    }

    console.log(timeList)

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
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }}>
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
                <Box sx={{height: '15vh', m: 2, mt: 1}}>
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
                        <DatePicker format='YYYY/MM/DD' sx={{svg: {color: 'aquamarine'}}} readOnly 
                            defaultValue={dayjs(doctordate)} />
                    </LocalizationProvider>
                </Box>
                <Box sx={{height: '15vh', m: 2}}>
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
                        <Select
                        labelId="department-label"
                        id="reserveTime"
                        defaultValue={doctortime}
                        onChange={handleTimeChange}
                        >
                        {timeList.map((item) => (
                            <MenuItem value={item.time}>{item.time}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{height: '15vh', m: 2}}>
                    <Typography
                        // variant="h6" 
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                            fontSize: 16,
                            mb: 1
                    }}>
                        獸醫師
                    </Typography>
                    <TextField id="PetName" fullWidth InputProps={{readOnly: true,}} 
                        defaultValue={doctorname}></TextField>
                </Box>
                <Box sx={{height: '15vh', m: 2, mb: 0}}>
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
                        defaultValue={petname}></TextField>
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