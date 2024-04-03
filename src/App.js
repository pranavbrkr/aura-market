import './App.css';
import TopNav from './components/TopNav';
import ProductsList from './components/ProductsList';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropdown from './components/CategoryDropdown';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

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
          ...categories,
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

  // const addToCart = (product) => {
  //   setCart(prevCart => {
  //     const itemIndex = prevCart.findIndex(item => item.id === product.id);

  //     if(itemIndex > -1) {
  //       const newCart = [...prevCart];
  //       newCart[itemIndex].quantity += 1;
  //       return newCart;
  //     } else {
  //       return [...prevCart, {...product, quantity: 1}];
  //     }
  //   })
  // }

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

  const filteredProducts = productList.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <CategoryDropdown categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <Search searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
        <Routes>
          <Route path='/' element={<ProductsList productList={filteredProducts} />} />
          {/* <Route path='/products' element={<ProductsList productList={filteredProducts} />} /> */}
          <Route path='/products/:productId' element={<ProductDetails addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cartItems = {cart} setCartItems = {setCart} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
