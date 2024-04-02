import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function ProductDetails({ addToCart }) {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const handleAddToCart = () => {
    addToCart(product)
  }

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
    .then(response => {
      setProduct(response.data)
      setIsLoading(false)
    })
    .catch(error => {
      console.error(error);
    });
  }, [productId]);

  if (isLoading) {
    return (
      <div>In progress ...</div>
    )
  } else {
    return (
      <>
        <div>{product.description}</div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </>
    )
  }
}
export default ProductDetails