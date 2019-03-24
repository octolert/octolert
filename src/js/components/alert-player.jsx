import React, { Component } from 'react';
import axios from 'axios';

class AlertPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handlePlayAlert = this.handlePlayAlert.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    const self = this;
    self.setState({ text: event.target.value });
  }

  handlePlayAlert() {
    const self = this;
    if (self.state.text !== '') {
      const postData = [
        {
          type: 'say',
          text: self.state.text,
        },
      ];
      axios.post('/api/alertplayer/', postData);
    }
  }

  render() {
    const self = this;
    return (
      <div>
        <h4>Alert Player</h4>
        <p className="secondary">Test out Octobuddy alerts.</p>
        <div className="input-group">
            <label htmlFor="positiveMessage">Text</label>
            <textarea rows="6" type="text" value={self.state.text} onChange={self.handleTextChange} />
          </div>
        <button className="button-primary" onClick={self.handlePlayAlert}>Play</button>
      </div>
    );
  }
}

export default AlertPlayer;
