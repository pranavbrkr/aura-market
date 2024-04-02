import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function ProductDetails() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

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
      <div>{product.description}</div>
    )
  }
}
export default ProductDetails