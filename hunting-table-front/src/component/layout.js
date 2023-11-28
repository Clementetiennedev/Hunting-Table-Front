import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HuntingTableService from '../service/HuntingTableService';

const pages = ['Société', 'Historique des chasses', 'Nouvelle Chasse', 'Ma Société' ];
const pagesLinks = ['society', 'history', 'new-hunt', 'mysociety'];
const pagesNotLog = [ 'Connexion', 'Inscription' ];
const pagesLinksNotLog = [ 'login', 'register'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (!!token) {
      try {
        HuntingTableService.me()
        .then((res) => {
          setRoleId(res.data.role_id);
          console.log(res.data.role_id)
        })          
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
      }
    }
  }, []); 

  const handleLogout = () => {

    HuntingTableService.logout()
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.reload(); 
      } else {
        console.log('Erreur lors de la déconnexion');
      }
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hunting-Table
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isAuthenticated ? (
              pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/${pagesLinks[index]}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              )),
              

              <Button
              onClick={handleLogout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
            ) : (
              pagesNotLog.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ textDecoration: "none", color: "white" }} to={`/${pagesLinksNotLog[index]}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))
            )}
          </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hunting-Table
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {isAuthenticated ? (
          <>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ textDecoration: "none", color: "white" }} to={`/${pagesLinks[index]}`}>{page}</Link>
              </Button>
            ))}
            <Button
              onClick={handleLogout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
          </>
            ) : (
              pagesNotLog.map((page, index) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{ textDecoration: "none", color: "white" }} to={`/${pagesLinksNotLog[index]}`}>{page}</Link>
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;