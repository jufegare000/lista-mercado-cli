import React from 'react';
import PropTypes from 'prop-types';


const ShelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span>{props.productsLength} Productos en la lista</span>
      </small>
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired
};

export default ShelfHeader;
