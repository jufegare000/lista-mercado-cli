import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { connect } from 'react-redux';
import {
  loadCart,
  removeProduct,
  createCheck
} from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';

import './style.scss';

class FloatCart extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    createCheck: PropTypes.func
  };

  state = {
    isOpen: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = product => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  proceedToCheckout = () => {
    console.log(this.props);
    const { productQuantity } = this.props.cartTotal;

    if (!productQuantity) {
      alert('Agrega productos');
    } else {
      let cartProducts = this.props.cartProducts;
      let totalPrice = this.props.cartTotal.totalPrice;
      let lines = [];
      cartProducts.forEach(cp => {
        lines.push({
          product: cp.name,
          value: cp.value,
          cuantity: cp.quantity
        });
      });

      let check = {
        totalToPay: totalPrice,
        lines: lines
      };
      console.log(check);
      createCheck(check);
    }
  };

  showCheckOutConfirm = () => {
    let totalPrice = this.props.cartTotal.totalPrice;
    let cartProducts = this.props.cartProducts;
    let list = '';
    cartProducts.forEach(cp => {
      list = list + '<p>' + cp.name + '\t ' + cp.quantity + '\n';
    });
    list = list + '<br/><br/> total: <b>$' + totalPrice + '</b>';
    Swal.fire({
      title: '¿esta seguro de comprar estos productos?',
      html: list,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelmButtonText: 'No'
    }).then(result => {
      if (result.value) {
        this.proceedToCheckout();
        Swal.fire(
          'Compra realizada',
          'Su compra ha sido realizada exitosamente',
          'success'
        );
      }
    });
  };

  render() {
    const { cartTotal, cartProducts, removeProduct } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct product={p} removeProduct={removeProduct} key={p.id} />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">Compras</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Agrega productos al carrito <br />
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">TOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">${cartTotal.totalPrice}</p>
            </div>
            <div onClick={() => this.showCheckOutConfirm()} className="buy-btn">
              Comprar
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct }
)(FloatCart);
