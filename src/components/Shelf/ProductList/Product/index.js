import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Swal from 'sweetalert2'

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';
import { type } from 'os';

const Product = ({ product, addProduct }) => {
  product.quantity = 1;

  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.value / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  const showProductInfo = () => {
    Swal.fire({
      type: 'info',
      title: product.name,
      html:
      '<p>'+product.description+'</p>'+
      '<p>Precio: <b>$'+product.value+'</b></p>',
    })
  }

  return (
    <div
      className="shelf-item"
      data-sku={product.sku}
    >
      <Thumb classes="shelf-item__thumb" alt={product.name} />
      <div onClick={() => showProductInfo()}>
        <p className="shelf-item__title">{product.name}</p>
        <div className="shelf-item__price">
          <div className="val">
            <p>{product.value}</p>
          </div>
        </div>
      </div>
      <div className="shelf-item__buy-btn"
        onClick={() => addProduct(product)}>Agregar al carrito</div>
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
