import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import ShimmerEffect from './ShimmerEffect';

function Hero() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.in/api/products");
      const finalRes = res.data.products;
      console.log(finalRes);
      setProducts(finalRes);
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
        {products.map((item) => (
          <Card key={item.id} products={item} />
        ))}
      </div>
    </>
  );
}

export default Hero;
