import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/products`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="product-list">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};  

export default ProductList;
