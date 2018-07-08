import React from 'react';

const Button = ({ className = '', children, onClick }) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
