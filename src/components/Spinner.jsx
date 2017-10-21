import React, { PropTypes } from 'react';

const Spinner = (props) => {
  if (props.show) {
    return (
      <div className="overlay-wrapper">
      <div className="overlay">
      </div>
      </div>
    );
  }
  return null;
};

Spinner.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Spinner;
