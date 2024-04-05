import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from './StarRating';
import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, DeleteOutline, RemoveCircleOutline } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from 'react-redux';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {

    function getProductQuantity(productId) {
      const foundProduct = cartItems.find(element => element.id === productId);
      if (foundProduct) {
        setProductQuantity(foundProduct.quantity);
      } else {
        setProductQuantity(0);
      }
    }

    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
        getProductQuantity(response.data.id)
      })
      .catch(error => {
        console.error(error);
      });

  }, [productId, cartItems]);


  if (!product) {
    return <div>Loading...</div>;
  }

  const addItem = () => {
    dispatch({type: 'ADD_ITEM', payload: product});
    setProductQuantity(1);
  }


  const removeItem = () => {
    dispatch({type: 'REMOVE_ITEM', payload: product.id})
  }

  const increaseItem = () => {
    dispatch({type: 'INC_ITEM', payload: product.id})
  }

  const decreaseItem = () => {
    dispatch({type: 'DEC_ITEM', payload: product.id})
  }

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
          <Box
            sx={{
              maxWidth: 500,
              height: 500,
              backgroundColor: grey[200],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: `1px solid ${grey[300]}`,
              marginBottom: 2,
            }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
          <div style={{ overflowX: 'auto', display: 'flex', gap: '10px' }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: selectedImage === image ? `2px solid ${grey[900]}` : `1px solid ${grey[300]}`,
                }}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.title}</Typography>
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
            {productQuantity === 0 ? (
              <Button
              onClick={addItem} 
              variant="contained"
              sx={{
                bgcolor: 'warning.main',
                '&:hover': { bgcolor: 'warning.dark' },
                borderRadius: '20px',
                color: 'white',
                padding: '10px 40px',
                textTransform: 'none',
                width: '100%',
              }}
            >
              Add to Cart
            </Button>
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="h6" sx={{ mb: 2 }}>Quantity in Cart: {productQuantity}</Typography>
                <Box display="flex">
                  <IconButton onClick={decreaseItem}><RemoveCircleOutline /></IconButton>
                  <IconButton onClick={removeItem}><DeleteOutline /></IconButton>
                  <IconButton onClick={increaseItem}><AddCircleOutline /></IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;