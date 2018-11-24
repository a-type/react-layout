import React from 'react';

export default class Switch extends React.Component {
  state = {
    activeLayout: 'SingleColumn',
  };

  changeLayout = ev => {
    const layoutName = ev.target.value;
    this.setState({ activeLayout: layoutName });
  };

  render() {
    return (
      <div className="switch">
        {this.props.children({
          activeLayout: this.state.activeLayout,
          changeLayout: this.changeLayout,
        })}
      </div>
    );
  }
}
