import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import ShimmerEffect from './ShimmerEffect';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

function Hero() {
  const [products, setProducts] = useState([]);
  let userData = useContext(AuthContext);
  console.log("userdata", userData);
  const getProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    getProducts();
  }, []);
  if (products.length === 0) {
    return <ShimmerEffect />
  }

  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
        {products.map((item) => (
          <Card key={item.id} products={item} />
        ))}
      </div>
    </>
  );
}

export default Hero;
