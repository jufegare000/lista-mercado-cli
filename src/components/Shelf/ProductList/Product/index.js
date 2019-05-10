import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';

import Thumb from '../../../Thumb';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, addProduct }) => {
  product.quantity = 1;

  const showProductInfo = () => {
    Swal.fire({
      type: 'info',
      title: product.name,
      html:
        '<p>' +
        product.description +
        '</p>' +
        '<p>Precio: <b>$' +
        product.value +
        '</b></p>'
    });
  };

  return (
    <div className="shelf-item" data-sku={product.sku}>
      <Thumb classes="shelf-item__thumb" alt={product.name} />
      <div onClick={() => showProductInfo()}>
        <p className="shelf-item__title">{product.name}</p>
        <div className="shelf-item__price">
          <div className="val">
            <p>{product.value}</p>
          </div>
        </div>
      </div>
      <div className="shelf-item__buy-btn" onClick={() => addProduct(product)}>
        Agregar al carrito
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
