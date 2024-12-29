import { Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material"
import Appbar from "./components/Appbar"
import './App.css'
import rabbitImage from './image/rabbit.png'
import hamsterImage from './image/hamster.png'
import "./App.css"
import { Link, useLocation } from "react-router-dom"
// import Edit from "./components/EditDialog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ResTable from "./components/ResTable"
import Add from "./components/AddDialog"

function ResRecords(){
    const queryClient = new QueryClient();
    
    // const state = useLocation().state;
    // const startdate = state.startdate;
    // const enddate = state.enddate;
    // const ownername = state.name;
    // const identifyid = state.identifyid
    // console.log(ownername+','+identifyid+','+startdate+','+ enddate)

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
            <Grid item xs={2} sx={{height: '100vh'}}>
                <Box component={'img'}
                    sx={{height: '30vh',
                        position: 'sticky',
                        top: '70vh'
                    }}
                    src={hamsterImage}>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{height: '5vh', paddingBottom: 3, display: 'flex'}}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 550,
                            mr: 5
                    }}>
                        預約紀錄
                    </Typography>
                    <QueryClientProvider client={queryClient}>
                        <Add/>
                    </QueryClientProvider>
                </Box>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">看診日期</StyledTableCell>
                            <StyledTableCell align="center">看診時間</StyledTableCell>
                            <StyledTableCell align="center">寵物名字</StyledTableCell>
                            <StyledTableCell align="center">飼主姓名</StyledTableCell>
                            <StyledTableCell align="center">聯絡電話</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <QueryClientProvider client={queryClient}>
                            {/* <TableBody> */}
                                {/* <ResTable startdate={startdate} enddate={enddate} ownername={ownername} identifyid={identifyid}/> */}
                            <ResTable/>
                            {/* </TableBody> */}
                        </QueryClientProvider>
                    </Table>
                </TableContainer>
                {/* <Box sx={{height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Link to="/Search">
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
                </Box> */}
            </Grid>
            <Grid item xs={2} sx={{height: '100vh'}}>
                <Box component={'img'}
                    sx={{height: '35vh',
                        position: 'sticky',
                        top: '65vh',
                        ml: '2.5vw'
                    }}
                    src={rabbitImage}>
                </Box>
            </Grid>
        </Grid>
        </>
    )    
}

export default ResRecords