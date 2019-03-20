import React, { Component } from 'react';

import { Link } from "react-router-dom";

class Settings extends Component {
  render() {
    return (
      <div className="container">
        <h1>Settings</h1>
        <Link className="button-primary" to="/default-alert-config/">Configure Default Alert</Link>
        <Link className="button-primary" to="/trigger-config/">Add/Edit Custom Alerts</Link>
        <Link className="button-primary" to="/view-custom-alerts/">View All Custom Alerts</Link>
        <Link className="button-primary" to="/integrate/">Authorize Octolert</Link>
      </div>
    );
  }
}

export default Settings;
