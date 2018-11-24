import React from 'react';
import { Consumer } from 'react-layout';
import './styles.css';

export default ({ children }) => (
  <Consumer>
    {({ area }) => (
      <div className="layout-singleColumn">
        <div className="layout-singleColumn--nav" {...area('nav')} />
        <div className="layout-singleColumn--main" {...area('main')} />
        <div
          className="layout-singleColumn--secondary"
          {...area('secondary')}
        />
        {children}
        <div className="layout-singleColumn--footer" {...area('footer')} />
      </div>
    )}
  </Consumer>
);
