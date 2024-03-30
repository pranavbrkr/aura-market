function ProductsList({ productList }) {

  return (
    <ul>
      {productList.map(product => (
        <li>{product.title}</li>
      ))}
    </ul>
  )
}
export default ProductsList