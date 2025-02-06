import { Box, Button, Container, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material"
import Appbar from "./components/Appbar"
import vetImage from "./image/vet.jpg"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Link } from "react-router-dom"
import dayjs, { Dayjs } from "dayjs"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import DoctorList from "./components/Doctorlist"
// import DeptList from "./components/DeptList"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function Reservation() {
    const queryClient = new QueryClient();
    
    const getMinDate = () => {
        const date = new Date()
        return date.setDate(date.getDate() + 7)
    }

    const [startdate, setStartdate] = useState(dayjs(getMinDate()).format('YYYY/MM/DD'));
    const [enddate, setEnddate] = useState(dayjs(getMinDate()).format('YYYY/MM/DD'));
    const [doctorid, setDoctorid] = useState('-1');
    const [dept, setDept] = useState('-1');

    const handleStartDateChange = (newDate: Dayjs | null) => {
        setStartdate((newDate == null)? '':newDate.format('YYYY/MM/DD'))
    }
    const handleEndDateChange = (newDate: Dayjs | null) => {
        setEnddate((newDate == null)? '':newDate.format('YYYY/MM/DD'))
    }
    const handleDocChange = (event: SelectChangeEvent) => {
        setDoctorid(event.target.value)
    }
    const handleDeptChange = (event: SelectChangeEvent) => {
        setDept(event.target.value)
    }

    const data = {startdate: startdate, enddate: enddate, doctorid: doctorid, dept: dept}
    console.log("send: " + data);

    return(
        <>
            <Appbar/>
            <Container disableGutters maxWidth={false}>
                <Box sx={{height: '8vh'}}>
                </Box>
            </Container>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                        <Box component='img'
                            src={vetImage}
                            sx={{height: 500}}
                        >
                        </Box>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <Box sx={{height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                mb: 1
                            }}
                        >
                            門診預約
                        </Typography>
                        <Box sx={{height: '15vh', ml: 5, paddingBottom: 1, paddingTop: 3, width: '43vw'}}>
                            <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2
                            }}>
                                門診日期
                            </Typography>
                            <Box sx={{display: 'flex'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker slotProps={{textField:{id: 'startdate'}}} 
                                        format='YYYY/MM/DD' minDate={dayjs(getMinDate())}
                                        defaultValue={dayjs(startdate)} 
                                        onChange={handleStartDateChange}/>                                    
                                    <Box sx={{display: 'flex', alignItems: 'center', ml: 2, mr: 2}}> 到 </Box>
                                    <DatePicker slotProps={{textField:{id: 'enddate'}}}
                                        format='YYYY/MM/DD' minDate={dayjs(startdate)}
                                        defaultValue={dayjs(enddate)}
                                        onChange={handleEndDateChange}/>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{height: '15vh', padding: 5, paddingBottom: 1, paddingTop: 3, display: 'flex'}}>
                            <Box sx={{width: '15vw'}}>
                                <Typography
                                    // variant="h6" 
                                    sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 550,
                                    fontSize: 20,
                                    mb: 2
                                }}>
                                    科別
                                </Typography>
                                <FormControl fullWidth>
                                    {/* <DeptList handleDeptChange={handleDeptChange}/> */}
                                    <Select
                                    labelId="department-label"
                                    id="deptid"
                                    defaultValue={'-1'}
                                    onChange={handleDeptChange}
                                    >
                                    <MenuItem value={'-1'}>請選擇</MenuItem>
                                    <MenuItem value={'犬科'}>犬科</MenuItem>
                                    <MenuItem value={'貓科'}>貓科</MenuItem>
                                    <MenuItem value={'兔科'}>兔科</MenuItem>
                                    <MenuItem value={'鼠科'}>鼠科</MenuItem>
                                    <MenuItem value={'鳥科'}>鳥科</MenuItem>
                                    <MenuItem value={'家醫科'}>家醫科</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{width: '7vw'}}></Box>
                            <Box sx={{width: '15vw'}}>
                                <Typography
                                    // variant="h6" 
                                    sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 550,
                                    fontSize: 20,
                                    mb: 2
                                }}>
                                    獸醫師
                                </Typography>
                                <FormControl fullWidth>
                                    <QueryClientProvider client={queryClient}>
                                        <DoctorList handleDocChange={handleDocChange}/>
                                    </QueryClientProvider>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{height: '7vh', mt: 5, display: 'flex', justifyContent: 'center'}}>
                            <Link to="/Schedule" state={data}>
                                <Button sx={{border: 1,
                                        borderColor: 'aquamarine',
                                        borderWidth: 2,
                                        bgcolor: 'white',
                                        color: 'aquamarine',
                                        ":hover": {bgcolor: "aquamarine", color: "white"}, width: '7vw',
                                        borderRadius: 5
                                }}>
                                    <Typography sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        fontSize: 20,
                                        letterSpacing: '.1rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                                        查詢
                                    </Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Reservation