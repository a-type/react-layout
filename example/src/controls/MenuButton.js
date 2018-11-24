import React from 'react';

export default ({ children, ...props }) => (
  <button className="menuButton" {...props}>
    <span className="menuButton--icon" />
    {children}
  </button>
);
