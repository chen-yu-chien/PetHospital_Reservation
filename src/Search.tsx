import { Box, Button, Container, Grid, TextField, Typography} from "@mui/material"
import Appbar from "./components/Appbar"
import parrotImage from "./image/parrot.png"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "./App.css"
import { Link } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"

function Search() {
    function getMinDate(){
        const date = new Date()
        return date.setDate(date.getDate() + 7)
    }

    const [name, setName] = useState('')
    const [identifyid, setIdentifyid] = useState('')
    const [startdate, setStartdate] = useState(dayjs(getMinDate()).format('YYYY/MM/DD'))
    const [enddate, setEnddate] = useState(dayjs(getMinDate()).format('YYYY/MM/DD'))

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifyid(event.target.value)
    }
    const handleStartDateChange = (newDate: Dayjs | null) => {
        setStartdate((newDate == null)? '':newDate.format('YYYY/MM/DD'))
    }
    const handleEndDateChange = (newDate: Dayjs | null) => {
        setEnddate((newDate == null)? '':newDate.format('YYYY/MM/DD'))
    }
    const state = {name: name, identifyid: identifyid, startdate: startdate, enddate: enddate}

    
    return(
        <>
            <Appbar/>
            <Container disableGutters maxWidth={false}>
                <Box sx={{height: '8vh'}}>
                </Box>
            </Container>
            <Grid container>
                <Grid item xs={3}>
                        <Box component='img'
                            src={parrotImage}
                            sx={{height: 500}}
                        >
                        </Box>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <Box sx={{height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                mb: 1
                            }}
                        >
                            預約查詢
                        </Typography>
                        <Box sx={{height: '15vh', padding: 5, paddingBottom: 1, paddingTop: 3, display: 'flex'}}>
                            <Box sx={{width: '15vw', mr: 5}}>
                                <Typography
                                    // variant="h6" 
                                    sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 550,
                                    fontSize: 20,
                                    mb: 2,
                                }}>
                                    飼主姓名
                                </Typography>
                                <TextField id="OwnerName" placeholder="請輸入姓名" sx={{width: '17vw'}}
                                    onChange={handleNameChange}></TextField>
                            </Box>
                            <Box sx={{width: '15vw', ml: 4}}>
                                <Typography
                                    // variant="h6" 
                                    sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 550,
                                    fontSize: 20,
                                    mb: 2,
                                }}>
                                    身分證字號
                                </Typography>
                                <TextField id="IdentifyId" placeholder="請輸入身分證字號" sx={{width: '17vw'}}
                                    onChange={handleIDChange}></TextField>
                            </Box>
                        </Box>
                        <Box sx={{height: '15vh', padding: 5, paddingBottom: 1, paddingTop: 3,}}>
                            <Typography
                                // variant="h6" 
                                sx={{
                                fontFamily: 'monospace',
                                fontWeight: 550,
                                fontSize: 20,
                                mb: 2
                            }}>
                                預約門診日期
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
                        <Box sx={{height: '7vh', display: 'flex', justifyContent: 'center'}}>
                            <Link to="/ResRecords" state={state}>
                            <Button sx={{border: 1,
                                    borderColor: 'aquamarine',
                                    borderWidth: 2, borderRadius: 5,
                                    bgcolor: 'white',
                                    color: 'aquamarine',
                                    ":hover": {bgcolor: "aquamarine", color: "white"}, 
                                    width: '7vw',
                                    height: '7vh',
                                    mt: 5
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

export default Search