import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function TopNav({ cartLength }) {
  const cartItems = useSelector(state => state.cartItems);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart');
  }

  const goToHome = () => {
    navigate('/');
  }

  return (
    <div>
      <AppBar position='static' style={{marginTop: 0, marginLeft: 0}}>
        <Toolbar>
          <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
          <Typography
              onClick={goToHome}
              variant='h5'
              noWrap
              sx={{
                fontWeight: 'bold', // Make the font weight bold
                color: 'white', // This is typically the text color for AppBars, but you can customize it
                '&:hover': {
                  color: 'grey.300', // Lighten the color on hover
                },
                userSelect: 'none', // Prevent text selection
              }}
            >
              Aura Market
            </Typography>
          </Box>
          <Box sx={{flexGrow: 1}} />
          <IconButton onClick={goToCart} color="inherit">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default TopNav