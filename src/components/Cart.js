import { Button } from "@mui/material"

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

  if (cartItems.length) {
    return (
      <div>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.title} - Quantity: {item.quantity}
            <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
            <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
            <Button onClick={() => handleItemRemove(item.id)}>Delete</Button>
          </li>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        Cart empty
      </div>
    )
  }


}
export default Cart