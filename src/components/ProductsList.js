import { Link } from "react-router-dom"

function ProductsList({ productList }) {

  return (
    <ul>
      {productList.map(product => (
        <>
        <Link to={`/products/${product.id}`} key={product.id}>
          {product.title}
        </Link>
        <br></br>
        </>
      ))}
    </ul>
  )
}
export default ProductsList