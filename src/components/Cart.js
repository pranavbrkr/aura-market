import { AddCardOutlined, AddCircleOutline, DeleteOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems, handleCartItemIncreaseQuantity, handleCartItemDecreaseQuantity, handleCartItemRemove }) {

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" mt={2}>
      <List sx={{ width: '60%', maxWidth: '700px', bgcolor: 'background.paper', mb: 2 }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem 
              key={item.id} 
              sx={{ 
                my: 2, 
                py: 2, 
                px: 3, 
                border: 1, 
                borderColor: 'grey.300', 
                borderRadius: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  alt={item.title} 
                  src={item.thumbnail} 
                  variant="square"
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={
                  <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box component="span" sx={{ fontSize: '1.25rem' }}>{item.title}</Box>
                  </Link>                  
                } 
                secondary={`Quantity: ${item.quantity}`} 
                sx={{ '.MuiTypography-body1': { fontSize: '1.25rem' }, '.MuiTypography-body2': { fontSize: '1rem' } }} 
              />
              <Box>
                <IconButton onClick={() => handleCartItemDecreaseQuantity(item.id)}><RemoveCircleOutline /></IconButton>
                <IconButton onClick={() => handleCartItemRemove(item.id)}><DeleteOutline /></IconButton>
                <IconButton onClick={() => handleCartItemIncreaseQuantity(item.id)}><AddCircleOutline /></IconButton>
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Cart is empty" />
          </ListItem>
        )}
      </List>
      {cartItems.length > 0 && (
        <Box width="60%" maxWidth="450px" display="flex" flexDirection="column" alignItems="center">
          <Button 
            variant="contained" 
            sx={{
              bgcolor: 'error.main', 
              '&:hover': { bgcolor: 'error.dark' },
              borderRadius: '20px',
              color: 'white',
              mb: 1, // Margin bottom for spacing between buttons
              padding: '10px 40px',
              textTransform: 'none',
              width: '100%', // Make the button stretch to fill the container
            }}
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button 
            variant="contained" 
            sx={{
              bgcolor: 'primary.main', 
              '&:hover': { bgcolor: 'primary.dark' },
              borderRadius: '20px',
              color: 'white',
              padding: '10px 40px',
              textTransform: 'none',
              width: '100%', // Make the button stretch to fill the container
            }}
            onClick={() => { /* Logic to proceed to checkout */ }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );


}
export default Cart