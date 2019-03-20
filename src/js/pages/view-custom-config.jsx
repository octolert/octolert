import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ViewCustomConfig extends Component {

  render() {
    return (
      <div className="container">
        <h2>All Custom Alerts</h2>
        <Link to="/settings/">Back to Settings</Link>
        <p>TODO</p>
      </div>
    );
  }
}

export default ViewCustomConfig;
