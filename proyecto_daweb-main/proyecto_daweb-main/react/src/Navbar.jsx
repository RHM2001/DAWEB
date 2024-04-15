import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import imagenes from './assets/imagenes';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {

  const appBarStyle = {
    backgroundColor: 'rgba(64, 145, 108, 2)',
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const allRestaurantesClick = () => {
    window.location.href = 'http://localhost:3030/allRestaurantes.html';
  };

  const crearRestaurantesClick = () => {
    window.location.href = 'http://localhost:3030/altaRestaurante.html';
  };

  const logoutClick = () => {
    window.location.href = 'http://localhost:3030/PaginaInicio.html';
  };

  const miPerfiltClick = () => {
    window.location.href = 'http://localhost:3030/perfil.html';
  };

  return (
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img src={imagenes.img1} alt="logo" className="logo" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              style={{ fontWeight: 'bold' }}
              className="letra"
            >
              FoodFusion
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" edge="end" style={{ color: 'black', fontWeight: 'bold' }} onClick={allRestaurantesClick}>
                Restaurantes
              </Button>
              <Button color="inherit" edge="end" style={{ color: 'black', fontWeight: 'bold' }} onClick={crearRestaurantesClick}>
                Crear Restaurantes
              </Button>
              <IconButton
                color="inherit"
                id="resources-button"
                onClick={handleClick}
                aria-controls={open ? 'resources-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                edge="end"
              >
                <img src={imagenes.img2} alt="perfil" className="logo" />
              </IconButton>
            </Stack>

            <Menu
              id="resources-menu"
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{ 'aria-labelledby': 'resources-button' }}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={miPerfiltClick}>Mi perfil</MenuItem>
              <MenuItem onClick={logoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
  );
}