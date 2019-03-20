import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TriggerConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorSaving: null,
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    fetch('/api/triggers')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
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
    return (
      <div className="container">
        <h2>Add/Edit Custom Alerts</h2>
        <Link to="/settings/">Back to Settings</Link>
        <div className="input-group">
          <label>Boards</label>
          <select>
            <option value="TEST-BOARD">Test board</option>
          </select>
        </div>
        <div className="input-group">
          <label>Column</label>
          <select>
            <option value="todo">Todo</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="input-group">
          <label>Postive message</label>
          <textarea rows="6" type="text" />
        </div>
        <div className="input-group">
          <label>Negative message</label>
          <textarea rows="6" type="text" />
        </div>
        <button type="button" className="button-primary">Save Changes</button>
      </div>
    );
  }
}

export default TriggerConfig;
