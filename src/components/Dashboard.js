import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from "../UI/Copyright";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from '../helpers/MainListItems';
import SecondaryListItems  from '../helpers/SecondaryListItems';
import Button from '@mui/material/Button'; 
import Afiliados from "../components/Afiliados/Afiliados.js"
import { Routes, Route, Link } from 'react-router-dom';
import UnidadesAdministrativas from './UA/UnidadesAdministrativas';
import {AppBar, Drawer } from "../UI/NavAndAppBar";




function DashboardContent() {
  
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
   
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              APP
            </Typography>
            <Link to="/logout" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Salir</Button>
            </Link>
             
          
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            <MainListItems/>
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="true" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

            <Routes>
              <Route path="afiliados/*" element={ <Afiliados />} />
              <Route path="ua" element={ <UnidadesAdministrativas />} />
            </Routes>
             
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
   
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}