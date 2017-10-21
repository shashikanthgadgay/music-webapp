import React, { PropTypes } from 'react';

const Error = (props) => {
  const { error } = props;
  if (error) {
    const { message } = props.error;
    return (
        <div className="error-wrapper">
          <span className="error-message">{ message }</span>
        </div>
    );
  }
  return null;
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

export default Error;
