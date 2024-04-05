import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from './StarRating'; // Assuming you have this component
import { Box, Container, Grid, Typography } from "@mui/material";

function ProductDetails({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

 

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.images[0]); // Set the first image as the selected one initially
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          <div style={{ overflowX: 'auto', display: 'flex', marginTop: '10px' }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '100px', height: 'auto', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="subtitle1" style={{ margin: '20px 0' }}>{product.category}</Typography>
          <Typography display="inline" variant="body1">
            Original price: 
          </Typography>
          <Typography display="inline" variant="body1" style={{ textDecoration: product.discountPercentage ? 'line-through' : 'none' }}>
            ${product.price}
          </Typography>
          {product.discountPercentage && (
            <Typography variant="body1" style={{ color: 'green', marginBottom: '20px' }}>
              Discounted price: ${product.price - (product.price * product.discountPercentage / 100).toFixed(2)}
            </Typography>
          )}
          <Box my={2}>
            <StarRating rating={product.rating} />
          </Box>

          <Box my={2}>
          <button onClick={handleAddToCart}>Add to Cart</button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;