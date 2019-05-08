import React from 'react';
import PropTypes from 'prop-types';

const Thumb = props => {
  return <div className={props.classes} />;
};

Thumb.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string
};

export default Thumb;
