import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Thumb from './../../Thumb';
import { formatPrice } from '../../../services/util';

class CartProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };

  state = {
    isMouseOver: false
  };

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  render() {
    const { product, removeProduct } = this.props;

    const classes = ['shelf-item'];

    if (!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb classes="shelf-item__thumb" alt={product.name} />
        <div className="shelf-item__details">
          <p className="title">{product.name}</p>
          <p className="desc">
            <br />
            Cantidad: {product.quantity}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>${product.value}</p>
        </div>
      </div>
    );
  }
}

export default CartProduct;
