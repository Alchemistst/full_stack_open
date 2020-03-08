import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, buttonLabel }) => {
  // STATE
  const [visible, setVisible] = useState(false);

  // STYLE
  const visibility = {
    display: visible ? '' : 'none',
  };

  // VARS AND CONSTS
  const bLabel = visible ? 'Cancel' : buttonLabel;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={visibility}>
        {React.cloneElement(children, { toggleVisibility })}
      </div>
      <button type="button" onClick={() => toggleVisibility()}>{bLabel}</button>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};


export default Togglable;
