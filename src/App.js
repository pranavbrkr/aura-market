import './App.css';
import TopNav from './components/TopNav';
import ProductsList from './components/ProductsList';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropdown from './components/CategoryDropdown';

function App() {

  const [searchString, setSearchString] = useState('')
  const [productList, setProductList] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const tempProductList = response.data.products;
        setProductList([
          ...productList,
          ...tempProductList,
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


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

  const filteredProducts = productList.filter(product => product.title.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div className="App">
      <TopNav />
      <CategoryDropdown categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <Search searchString={searchString} handleSearchStringChange={handleSearchStringChange} />
      <ProductsList productList = {filteredProducts} />
    </div>
  );
}

export default App;
