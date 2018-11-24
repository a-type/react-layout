import React from 'react';
import { Consumer } from 'react-layout';
import './styles.css';

export default ({ children }) => (
  <Consumer>
    {({ area }) => (
      <div className="layout-twoColumn">
        <div className="layout-twoColumn--nav" {...area('nav')} />
        <div className="layout-twoColumn--main" {...area('main')} />
        <div className="layout-twoColumn--secondary" {...area('secondary')} />
        {children}
        <div className="layout-twoColumn--footer" {...area('footer')} />
      </div>
    )}
  </Consumer>
);
