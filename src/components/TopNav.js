import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
                fontWeight: 'bold',
                color: 'white',
                '&:hover': {
                  color: 'grey.300',
                },
                userSelect: 'none',
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