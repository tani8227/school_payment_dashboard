import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Outlet, Link } from 'react-router-dom';
import { Actions } from '../../Reducers/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function responsiveNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const token = localStorage.getItem('token');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        {token ? (
          <>
            <ListItem button="true">
              <Link to={'/user/dashboard'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem button="true">
              <Link to={'/user/transaction-status'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="Transaction Status" />
              </Link>
            </ListItem>
            <ListItem button="true">
              <Link to={'/user/school-page'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="School Page" />
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button="true">
              <Link to={'/'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem button="true">
              <Link to={'/signin'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="Sign In" />
              </Link>
            </ListItem>
            <ListItem button="true">
              <Link to={'/signup'} style={{ textDecoration: "none", color: 'black' }}>
                <ListItemText primary="Sign Up" />
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to={'/user/dashboard'} style={{ textDecoration: "none", color: 'white' }}>
              Edviron
            </Link>
          </Typography>
          <Typography variant="h6" sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }}>
            <Link to={'/user/school-page'} style={{ textDecoration: "none", color: 'white' }}>
              Search School ID
            </Link>
          </Typography>
          <Typography variant="h6" sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }}>
            <Link to={'/user/transaction-status'} style={{ textDecoration: "none", color: 'white' }}>
              Transaction Status
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {token ? (
              <>
                <MenuItem onClick={() => { dispatch(Actions.logout(), handleMenuClose()) }}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose}>
                  <Link to={'/'} style={{ textDecoration: "none", color: 'black' }}>
                    Sign In
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to={'/'} style={{ textDecoration: "none", color: 'black' }}>
                    Sign Up
                  </Link>
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
      <Outlet />
    </Box>
  );
}
