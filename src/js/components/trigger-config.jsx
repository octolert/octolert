import React, { Component } from 'react';

class TriggerConfig extends Component {
  //TODO JD WIP
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
      <div>
        <h4>Add/Edit Custom Alerts</h4>
        <p className="secondary">Apply alerts for specific columns. (this page is still under development)</p>
        <div className="row">
          <div className="col-xs-3">
            <div className="input-group">
              <label>Boards</label>
              <select>
                <option value="TEST-BOARD">Test board</option>
              </select>
            </div>
          </div>
          <div className="col-xs-3">
            <div className="input-group">
              <label>Column</label>
              <select>
                <option value="todo">Todo</option>
                <option value="in-progress">In-progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
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
        <br />
      </div>
    );
  }
}

export default TriggerConfig;
