import { Box, Button, Container, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import Appbar from "./components/Appbar"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import resImage from "./image/reservation.jpg"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addReservation } from "./api/reservationApi"
import { PetResponse, Reservation } from "./types"
import { getPet } from "./api/petApi"


function PetReserve() {
    const pages = ["取消", "確認"];
    
    const state = useLocation().state;
    const doctorid = state.doctorid;
    const docdate = state.docdate;
    const starttime = state.starttime;
    const endtime = state.endtime;
    // const starttime = "10:00";
    // const endtime = "12:00";
    
    const [petid, setPetid] = useState('')
    const [petname, setPetname] = useState('')
    const [petbirthday, setPetbirthday] = useState(dayjs(new Date()).format('YYYY/MM/DD'))
    const [doctime, setDoctime] = useState('00:00')
    const [symptom, setSymptom] = useState('')
    const [reservation, setReservation] = useState<Reservation>({
        docdate: "",
        doctime: "",
        symptom: "",
        petid: 0,
        doctorid: 0
    })

    const handlePnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPetname(event.target.value)
    }
    const handlePbirthChange = (newDate: Dayjs | null) => {
        setPetbirthday((newDate == null)? '':newDate.format('YYYY/MM/DD'))
    }
    const handleRestimeChange = (event: SelectChangeEvent<string>) => {
        setDoctime(event.target.value)
    }
    const handleSymptomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymptom(event.target.value)
    }
    
    console.log(docdate+','+doctime+','+petname+','+','+petbirthday+','+symptom)
    
    const { mutate } = useMutation(addReservation, {
        onSuccess: () => {alert("預約成功");},
        onError: (err) => {alert("預約失敗");console.error(err);},
    });

    const handleSave = () => {
        GetPetID(petname, petbirthday);
        setReservation({ 
            docdate: docdate, 
            doctime: doctime, 
            symptom: symptom, 
            petid: parseInt(petid),
            doctorid: parseInt(doctorid), 
            });
        mutate(reservation);
        setReservation({ docdate: "", doctime: "", symptom: "", petid: 0, doctorid: 0});
    }

    const startTime = parseInt(starttime.split(':')[0] + starttime.split(':')[1])
    const endTime = parseInt(endtime.split(':')[0] + endtime.split(':')[1])
    const timeList = []
    for(let i = startTime; i < endTime; i = i+15){
        if(i % 100 >= 60)
            i = (Math.ceil(i / 100)) * 100
        const time = i.toString();
        timeList.push({time: time.substring(0,2) + ':' + time.substring(2)});
    }

    console.log(timeList)

    function GetPetID(petname: string, petbirthday: string) {
        const {data, error, isSuccess} = useQuery({
            queryKey: ['pets'],
            queryFn: () => getPet()
        })
    
        if(!isSuccess){
            alert("GetPetID not success");
        }
        else if(error){
            alert("GetPetID error");
        }
        else{
            let i = 0;
            data.map((pet: PetResponse) => {
                if(pet.name == petname && pet.birthday == petbirthday) {
                    setPetid(pet._links.self.href.split('/')[5]);
                    i++;
                }
            })
            if(i == 0)
                alert("No data");
        }
    }
    
    return(
        <>
        <Appbar/>
        <Container disableGutters maxWidth={false}>
            <Box sx={{height: '8vh'}}>
            </Box>
        </Container>
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Box sx={{height: 500, mt: '15vh'}}>
                    <Box sx={{height: '15vh', m: 5, mb: 1, mt: 3, display: 'flex'}}>
                        <Box sx={{width: '15vw', mr: 5}}>
                            <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2,
                            }}>
                                寵物名字
                            </Typography>
                            <TextField id="PetName" placeholder="請輸入名字" sx={{width: '19.5vw'}} onChange={handlePnameChange}></TextField>
                        </Box>
                        <Box sx={{width: '15vw', ml: 5}}>
                            <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2,
                            }}>
                                寵物生日
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format='YYYY/MM/DD' sx={{svg: {color: 'aquamarine'}, width: '19.5vw'}} defaultValue={dayjs(new Date())}
                                    onChange={handlePbirthChange}/>
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{height: '15vh', m: 5, mb: 1, mt: 3, display: 'flex'}}>
                        <Box sx={{mr: 1}}>
                        <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2,
                            }}>
                                預約時間
                        </Typography>
                        <FormControl sx={{svg: {color: 'aquamarine'}, width: '11vw'}}>
                            <Select
                            labelId="department-label"
                            id="reserveTime"
                            defaultValue={'-1'}
                            onChange={handleRestimeChange}
                            >
                            <MenuItem value={'-1'}>請選擇</MenuItem>
                            {timeList.map((item) => (
                                <MenuItem value={item.time}>{item.time}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </Box>
                        <Box sx={{ml: 1}}>
                            <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2,
                            }}>
                                症狀簡述
                            </Typography>
                            <TextField id="PetName" placeholder="請輸入症狀" sx={{width: '27.6vw'}} onChange={handleSymptomChange}></TextField>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 5, justifyContent: 'center', 
                        alignItems: 'center', width: '45vw', height: '18vh' }}>
                        {pages.map((page) => (
                            <Link to={(page == "取消")? "/Schedule" : "/Reservation"} 
                                style={{ textDecoration: 'none' }}>
                            <Button
                                key={page}
                                onClick={(page == "取消")? () => {} : handleSave}
                                sx={{ my: 3, border: 1,
                                    borderColor: 'aquamarine',
                                    borderWidth: 2,
                                    color: 'aquamarine', display: 'flex', bgcolor: 'white', 
                                    borderRadius: 5, width: '7vw', justifyContent: 'center',
                                    ":hover": {bgcolor: "aquamarine", color: "white"}}}
                            >
                                <Typography 
                                variant="h6"
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    ":hover": {color: "white"}
                                }}
                                >
                                {page}
                                </Typography>
                            </Button>
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                    <Box component='img'
                        src={resImage}
                        sx={{height: '70vh', mt: 2}}
                    >
                    </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default PetReserve