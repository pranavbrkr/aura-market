import './App.css';
import TopNav from './components/TopNav';
import ProductsList from './components/ProductsList';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropdown from './components/CategoryDropdown';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { Box } from '@mui/material';

function App() {

  const [searchString, setSearchString] = useState('')
  const [productList, setProductList] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      let apiUrl = 'products/';
      
      if (selectedCategory) {
        apiUrl += `category/${selectedCategory}`;
      }

      try {
        const response = await axios.get('https://dummyjson.com/' + apiUrl)
        const data = await response.data.products
        setProductList(data);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    }

    fetchProducts();

  }, [selectedCategory]);


  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        setCategories([
          ...response.data,
        ])
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const addToCart = (product) => {
    setCart((prevCartItems) => {
      const isProductInCart = prevCartItems.find(item => item.id === product.id);

      if (isProductInCart) {
        return prevCartItems.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      } else {
        return [...prevCartItems, {...product, quantity: 1}];
      }
    })
  }

  const handleCartItemIncreaseQuantity = (productId) => {
    setCart((currentItems) => currentItems.map((item) => item.id === productId ? {...item, quantity: item.quantity + 1} : item));
  }

  const handleCartItemDecreaseQuantity = (productId) => {
    setCart((currentItems) => {
      const newItems = currentItems.map((item) => {
        if (item.id === productId) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }).filter((item) => item.quantity > 0);

      return newItems;
    });
  }

  const handleCartItemRemove = (productId) => {
    setCart((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== productId);
      return updatedItems
    });
  }



  const filteredProducts = productList.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase()))

  function CategoryAndSearchComponents() {

    const location = useLocation();
    
    return (
      <>
        {location.pathname === '/' ? (
          <Box display="flex" justifyContent="center" alignItems="center" ml={30} mr={30} mb={5}>
              <Box sx={{flexGrow: 1}}>
                <CategoryDropdown categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
              </Box>
              <Box sx={{flexGrow: 2}}>
                <Search searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
              </Box>
          </Box>
        ) : null}
      </>
    )
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: 'background.paper' }}>
          <TopNav cartLength={cart.length} />
          <CategoryAndSearchComponents />
        </Box>
        <Routes>
          <Route path='/' element={<ProductsList productList={filteredProducts} />} />
          <Route path='/products/:productId' element={<ProductDetails cartItems={cart} addToCart={addToCart} handleCartItemIncreaseQuantity={handleCartItemIncreaseQuantity} handleCartItemDecreaseQuantity={handleCartItemDecreaseQuantity} handleCartItemRemove={handleCartItemRemove} />} />
          <Route path='/cart' element={<Cart cartItems = {cart} setCartItems = {setCart} handleCartItemIncreaseQuantity={handleCartItemIncreaseQuantity} handleCartItemDecreaseQuantity={handleCartItemDecreaseQuantity} handleCartItemRemove={handleCartItemRemove} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
