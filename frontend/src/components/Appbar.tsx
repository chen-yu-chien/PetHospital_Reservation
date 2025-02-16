// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const pages = ['門診預約', '預約查詢'];

function Appbar() {
  return (
    <AppBar position='sticky'
            sx={{bgcolor: 'aquamarine'}}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Box
                component="img"
                sx={{
                  height: 50,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                src='src/image/logo.png'
              />
              <Typography
                variant="h4"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'white',
                  ml: 2
                }}
              >
                阿毛寵物醫院
                </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link to={(page == "門診預約")? "/Reservation" : "/Search"} style={{ textDecoration: 'none' }}>
              <Button
                key={page}
                sx={{ my: 2, color: 'aquamarine', display: 'flex', bgcolor: 'white', 
                  borderRadius: 5, width: '7vw', justifyContent: 'center', ":hover": {bgcolor: "aquamarine", color: "white"}}}
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
                  }}
                >
                  {page}
                </Typography>
              </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar
