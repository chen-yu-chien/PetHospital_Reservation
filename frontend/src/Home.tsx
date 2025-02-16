import { Box, Button, Container, Grid } from "@mui/material"
import homeImage from "./image/home.jpg"
import logo from "./image/logo_g.png"
import Typography from '@mui/material/Typography';
import './App.css'
import { Link } from "react-router-dom";

function Home() {
    return(
        <>
            <Container id='bgImage'
                sx={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${homeImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                        width: '100vw',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
            >
                <Box
                    sx={{backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        justifyContent: 'center',
                        display: 'block',
                        height: '50vh',
                        width: '70vw',
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={4}>
                        <Box sx={{padding: 2, textAlign: 'center', fontSize: 32, paddingTop: 7}}>
                            <Box component="img" src={logo}/>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    fontSize: 50,
                                    letterSpacing: '.1rem',
                                    color: 'rgba(105, 255, 192)',
                                    textDecoration: 'none',
                                    justifyContent: 'center',
                                }}
                            >
                                阿毛寵物醫院
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <Link to="Reservation">
                                <Box sx={{padding: 2, textAlign: 'center'}}>
                                    <Button sx={{color: 'rgba(0, 0, 0, 0)', ":hover": {bgcolor: 'inherit'},}}>
                                        <Typography sx={{color: 'black', fontSize: 20, ":hover": {fontWeight: 700}}}>
                                            門診預約
                                        </Typography>
                                    </Button>
                                </Box>
                            </Link>
                            <Box sx={{padding: 2, textAlign: 'center'}}>
                                <Link to="Search">
                                {/* <Link to="/ResRecords"> */}
                                    <Button sx={{color: 'rgba(0, 0, 0, 0)', ":hover": {bgcolor: 'inherit'},}}>
                                        <Typography sx={{color: 'black', fontSize: 20, ":hover": {fontWeight: 700}}}>
                                            預約查詢
                                        </Typography>
                                    </Button>
                                </Link>
                            </Box>
                        </Box>                        
                    </Grid>
                </Box>
            </Container>
             
        </>
        

    )
}

export default Home