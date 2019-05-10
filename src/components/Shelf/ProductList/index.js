import React from 'react';

import Product from './Product';

const ProductList = ({ products }) => {
  return products.map(p => {
    if (p.available){
      return <Product product={p} key={p.id} />;
    }
  });
};

export default ProductList;
