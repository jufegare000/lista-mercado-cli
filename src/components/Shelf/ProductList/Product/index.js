import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

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

  return (
    <div
      className="shelf-item"
      onClick={() => addProduct(product)}
      data-sku={product.sku}
    >
      <Thumb classes="shelf-item__thumb" alt={product.name} />
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <p>{product.value}</p>
        </div>
      </div>
      <div className="shelf-item__buy-btn">Agregar al carrito</div>
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
