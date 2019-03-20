import React, { Component } from 'react';

class Integration extends Component {
  render() {
    return (
    <div class="text-center">
        <h2>Howdy to get started you must integrate with glo boards</h2>
        <p>click the button below to get started</p>
        <a class="button-primary" href="/auth/globoards?clientId=5j8tphqiovvrj7775mom&secret=2tx3zbui2pp8c77w6xu8atn5c2g2o2dd35wpwnlo">Authorize Octolert</a>
    </div>
    );
  }
}

export default Integration;
