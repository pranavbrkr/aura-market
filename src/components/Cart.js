import { AddCardOutlined, AddCircleOutline, DeleteOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"

function Cart({ cartItems, setCartItems }) {

  const handleIncreaseQuantity = (productId) => {
    setCartItems((currentItems) => currentItems.map((item) => item.id === productId ? {...item, quantity: item.quantity + 1} : item));
  }

  const handleDecreaseQuantity = (productId) => {
    setCartItems((currentItems) => {
      const newItems = currentItems.map((item) => {
        if (item.id === productId) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }).filter((item) => item.quantity > 0);

      return newItems;
    });
  }

  const handleItemRemove = (productId) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== productId);

      return updatedItems
    });
  }

  // if (cartItems.length) {
  //   return (
  //     <div>
  //       {cartItems.map(item => (
  //         <li key={item.id}>
  //           {item.title} - Quantity: {item.quantity}
  //           <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
  //           <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
  //           <Button onClick={() => handleItemRemove(item.id)}>Delete</Button>
  //         </li>
  //       ))}
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div>
  //       Cart empty
  //     </div>
  //   )
  // }

  return (
    <Box display="flex" justifyContent="center" width="100%" mt={2}>
      <List sx={{ width: '60%', maxWidth: '700px', bgcolor: 'background.paper' }}>
        {cartItems.length ? (
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
                alignItems: 'center'
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
                primary={<Box component="span" sx={{ fontSize: '1.25rem' }}>{item.title}</Box>} 
                secondary={`Quantity: ${item.quantity}`} 
                sx={{ margin: '0 10px', '.MuiTypography-body2': { fontSize: '1rem' } }} 
              />
              <Box>
                <IconButton aria-label="delete" onClick={() => handleItemRemove(item.id)} sx={{ padding: '5px' }}>
                  <DeleteOutline />
                </IconButton>
                <IconButton aria-label="remove" onClick={() => handleDecreaseQuantity(item.id)} sx={{ padding: '5px' }}>
                  <RemoveCircleOutline />
                </IconButton>
                <IconButton aria-label="add" onClick={() => handleIncreaseQuantity(item.id)} sx={{ padding: '5px' }}>
                  <AddCircleOutline />
                </IconButton>
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Cart is empty" />
          </ListItem>
        )}
      </List>
    </Box>
  );


}
export default Cart