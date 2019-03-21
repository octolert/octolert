import React, { Component } from 'react';
import axios from 'axios';

class DefaultAlertConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      positiveMessage: null,
      negativeMessage: null,
      showSavedMsg:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/default-alerts')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            positiveMessage: result[0].attributes[0].text,
            negativeMessage: result[1].attributes[0].text,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        },
      );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const self = this;
    event.preventDefault();
    const postData = [
      {
        type: 'say',
        action: 'globoard-cardforward',
        attributes: [
          {
            text: self.state.positiveMessage,
          },
        ],
      },
      {
        type: 'say',
        action: 'globoard-cardback',
        attributes: [
          {
            text: self.state.negativeMessage,
          },
        ],
      },
    ];

    axios.post('/api/default-alerts', postData).then(
      (result) => {
        this.setState({
          isLoaded: true,
          positiveMessage: result.data[0].attributes[0].text,
          negativeMessage: result.data[1].attributes[0].text,
          showSavedMsg: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      },
    );
  }

  render() {
    const {
      isLoaded, negativeMessage, positiveMessage, showSavedMsg,
    } = this.state;

    if (isLoaded) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <h4>Configure Default Alert</h4>
            <p className="secondary">This applies to all columns that have no specific alerts configured.</p>
            <div className="input-group">
              <label htmlFor="positiveMessage">Postive message</label>
              <textarea rows="6" value={positiveMessage} id="positiveMessage" name="positiveMessage" onChange={this.handleChange} type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="negativeMessage">Negative message</label>
              <textarea rows="6" value={negativeMessage} id="negativeMessage" name="negativeMessage" onChange={this.handleChange} type="text" />
            </div>
            {showSavedMsg ? <p>Default Alert Updated!</p> : null}
            <button type="submit" className="button-primary">Save Changes</button>
          </form>
        </div>
      );
    } else {
        return <p>Loading</p>
    }
  }
}

export default DefaultAlertConfig;
