import React, { Component } from 'react';
import axios from 'axios';

class Integrations extends Component {
  constructor(props) {
    super(props);
    this.state = { integration: '' };
    this.handleRemoveIntegration = this.handlePlayAlert.bind(this);
  }

  handlePlayAlert() {
    const self = this;
    axios.post('/api/integrations', postData).then(
      (result) => {

      },
      (error) => {

      },
    );
  }

  render() {
    const self = this;
    return (
      <div>
        <h4>Integrations</h4>
        <p className="secondary">You have the following integrations setup:</p>
        {self.state.integration}
        <button className="button-primary" onClick={self.handlePlayAlert}>Remove</button>
      </div>
    );
  }
}

export default AlertPlayer;
