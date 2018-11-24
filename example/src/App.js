import React, { Component } from 'react';
import Switch from './Switch';
import * as Layouts from './layouts';
import * as Components from './components';

import { Provider, Content } from 'react-layout';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Switch>
          {({ activeLayout, changeLayout }) => {
            const Component = Layouts[activeLayout];
            return (
              <React.Fragment>
                <Content area="nav">
                  <Components.Nav>
                    <h1>React Layout</h1>
                    <div className="layoutSelector">
                      <button value="SingleColumn" onClick={changeLayout}>
                        Single Column
                      </button>
                      <button value="TwoColumn" onClick={changeLayout}>
                        Two Column
                      </button>
                      <button value="Drawer" onClick={changeLayout}>
                        Drawer
                      </button>
                    </div>
                  </Components.Nav>
                </Content>
                <Component>
                  <Content area="main">
                    <Components.MainContent />
                  </Content>
                  <Content area="secondary">
                    <Components.SecondaryContent />
                  </Content>
                  <Content area="footer">
                    <Components.Footer />
                  </Content>
                </Component>
              </React.Fragment>
            );
          }}
        </Switch>
      </Provider>
    );
  }
}
