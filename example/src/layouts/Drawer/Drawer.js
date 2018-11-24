import React from 'react';
import { Consumer } from 'react-layout';
import { MenuButton } from '../../controls';
import './styles.css';

export default class DrawerLayout extends React.Component {
  state = {
    showDrawer: false,
  };

  toggleDrawer = () =>
    this.setState(({ showDrawer }) => ({ showDrawer: !showDrawer }));

  render() {
    const { children } = this.props;
    const { showDrawer } = this.state;

    return (
      <Consumer>
        {({ area }) => (
          <div className="layout-drawer">
            <div className="layout-drawer--nav" {...area('nav')} />
            <div className="layout-drawer--main" {...area('main')} />
            <div
              className={`layout-drawer--drawer ${
                showDrawer ? 'expanded' : ''
              }`}
            >
              <div
                className="layout-drawer--secondary"
                {...area('secondary')}
              />
            </div>
            {children}
            <div className="layout-drawer--footer" {...area('footer')} />
            <MenuButton
              className="layout-drawer--toggle"
              onClick={this.toggleDrawer}
            />
          </div>
        )}
      </Consumer>
    );
  }
}
