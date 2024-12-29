import { Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material"
import Appbar from "./components/Appbar"
import './App.css'
import catImage from './image/cat.png'
import dogImage from './image/dog.png'
import { Link, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ScheduleTable from "./components/ScheduleTable"

function Schedule(){
    const queryClient = new QueryClient();
    
    const state = useLocation().state;
    const startdate = state.startdate;
    const enddate = state.enddate;
    const doctorid = state.doctorid;
    const dept = state.dept
    console.log("Schedule: " + startdate+","+enddate+","+doctorid+","+dept);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'aquamarine',
          color: theme.palette.common.white,
          fontSize: 23,
          fontWeight: 700,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 20,
        },
    }));

    return(
        <>
        <Appbar />
        <Container disableGutters maxWidth={false}>
                <Box sx={{height: '8vh'}}>
                </Box>
            </Container>
        <Grid container>
            <Grid item xs={3}>
                <Box sx={{height: '30vh'}}>
                </Box>
                <Box component={'img'}
                    sx={{height: '50vh',
                        position: 'sticky',
                        top: '50vh'
                    }}
                    src={catImage}>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{height: '5vh', paddingBottom: 3}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                    }}>
                        門診時間表
                    </Typography>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">看診日期</StyledTableCell>
                            <StyledTableCell align="center">看診時間</StyledTableCell>
                            <StyledTableCell align="center">科別</StyledTableCell>
                            <StyledTableCell align="center">看診醫師</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <QueryClientProvider client={queryClient}>
                            <TableBody>
                                <ScheduleTable startdate={startdate} enddate={enddate} doctorid={doctorid} dept={dept}/>
                            </TableBody>
                        </QueryClientProvider>
                    </Table>
                </TableContainer>
                <Box sx={{height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Link to="/Reservation">
                    <Button sx={{
                        border: 1,
                        borderColor: 'aquamarine',
                        borderWidth: 2, borderRadius: 5,
                        bgcolor: 'white',
                        color: 'aquamarine',
                        width: '7vw',
                        height: '7vh',
                        ":hover": {bgcolor: "aquamarine", color: "white"}
                    }}>
                        <Typography sx={{color: 'inherit', fontSize: 20, fontWeight: 700, fontFamily: 'monospace',}}>
                            返回
                        </Typography>
                    </Button>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{height: '30vh'}}>
                </Box>
                <Box component={'img'}
                    sx={{height: '48vh',
                        position: 'sticky',
                        top: '52vh',
                        paddingLeft: 17.4
                    }}
                    src={dogImage}>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}

export default Schedule