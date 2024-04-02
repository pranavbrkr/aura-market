import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cart from './Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

function TopNav() {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const menuId = 'primary-search-account-menu';

  const goToCart = () => {
    navigate('/cart');
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
            <Typography variant='h6' noWrap>
              Aura Market
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}} />
          <IconButton onClick={goToCart}><ShoppingCartIcon /></IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default TopNav