import { Badge, Box, IconButton, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close, ShoppingCart } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Login from 'features/Auth/Login/Login';
import { logout } from 'features/Auth/userSlice';
import { cartItemCountSelector } from 'features/Cart/selector';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Register from '../../features/Auth/Register/Register';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: '0 100px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: '1'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

Header.propTypes = {
  
};

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
}

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const cartItemCounts = useSelector(cartItemCountSelector);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const actions = logout();
    dispatch(actions);
    setAnchorEl(null);
  }

  const handleCartClick = () => {
    history.push("/cart");
  }

  return (
    <div>
      {/* Header */}
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/home" className={classes.navLink}>E-Commerce</NavLink>
          </Typography>

          <Button>
            <NavLink to="/products" className={classes.navLink}>
              Product
            </NavLink>
          </Button>

          <IconButton aria-label="show cart item" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemCounts} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick} >
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Show options of login/register */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      
      {/* Show form login/register */}
      <Dialog open={open} 
              onClose={handleClose} 
              aria-labelledby="form-dialog-title"
              disableEscapeKeyDown >
                
          <IconButton className={classes.closeBtn} onClick={handleClose}>
            <Close />
          </IconButton>

          <DialogContent>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button onClick={ () => setMode(MODE.LOGIN)} color="primary">
                    Already have an account? Login here!
                  </Button>
                </Box>
              </>
            )}
            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign="center">
                  <Button onClick={ () => setMode(MODE.REGISTER)} color="primary">
                    Don't have an account? Regsiter now!
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default Header;