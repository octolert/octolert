import React, { Component } from 'react';
import BrandLogo from '../../img/octo-logo.svg';


class Navbar extends Component {
  render() {
    return (
    <div class="navbar">
      <div class="brand">
        <BrandLogo width={50} height={50} />
        <span style={{marginLeft: '5px'}}>octolert</span>
        <span className="brand-version"> - version: {__APPDATA__.version}</span>
      </div>
    </div>
    );
  }
}

export default Navbar;
