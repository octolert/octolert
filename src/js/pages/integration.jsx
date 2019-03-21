import React, { Component } from 'react';

class Integration extends Component {
  render() {
    return (
    <div className="container text-center">
      <h1>Welcome!</h1>
      <h2>To get started you must integrate with glo boards.</h2>
      <p className="secondary">It's easy just click the button below to get started.</p>
      <br />
      <a className="button-primary" href="/auth/globoards?clientId=5j8tphqiovvrj7775mom&secret=2tx3zbui2pp8c77w6xu8atn5c2g2o2dd35wpwnlo">Authorize Octolert</a>
    </div>
    );
  }
}

export default Integration;
