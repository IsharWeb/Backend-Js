import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative px-4 py-2 rounded-md hover:bg-slate-100 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
