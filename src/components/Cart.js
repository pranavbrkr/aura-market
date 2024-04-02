function Cart({ cartItems }) {

  return (
    <div>
      {console.log(cartItems)}
      {cartItems.map(item => (
        <div key={item.id}>
        <div>{item.title}</div>
        <div>{item.quantity}</div>
        </div>
      ))}
    </div>
  )
}
export default Cart