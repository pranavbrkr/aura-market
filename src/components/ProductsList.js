import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"
import { Grid } from "@mui/material"

function ProductsList({ productList }) {

  return (
    <Grid container spacing={4}>
      {productList.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
export default ProductsList