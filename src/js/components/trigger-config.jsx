import React, { Component } from 'react';
import axios from 'axios';

class TriggerConfig extends Component {
  // TODO JD WIP
  constructor(props) {
    super(props);
    this.state = {
      errorSaving: null,
      isLoaded: false,
      data: null,
      boards: null,
      columns: null,
      selectedBoardId: null,
      selectedColumnId: null,
      positiveMsg:null,
      negativeMsg:null,
    };
    this.getColumnsForBoard = this.getColumnsForBoard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setColumnId = this.setColumnId.bind(this);
  }

  componentDidMount() {
    axios.get('integrations/globoards/boards').then((response) => {
      this.setState({
        boards: response.data,
      });
      this.getColumnsForBoard(response.data[0].id);
    }, () => {
      this.setState({
        boards: null,
      });
    });

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

  getColumnsForBoard(boardId) {
    this.setState({
      selectedBoardId: boardId,
    });

    axios.get('integrations/globoards/columns', {
      params: {
        boardId,
      },
    }).then((response) => {
      this.setState({
        columns: response.data.columns,
        selectedColumnId: response.data.columns[0].id,
      });
    }, () => {
      this.setState({
        columns: null,
      });
    });
  }

  setColumnId(event) {
    this.setState({ selectedColumnId: event.target.value });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      selectedBoardId,
      selectedColumnId,
      positiveMsg,
      negativeMsg,
    } = this.state;

    axios.all([
      axios.post('/api/triggers', {
        integrationId: 'globoards',
        SourceId: selectedBoardId,
        type: 'globoard-cardback',
        attributes: [
          { columnId: selectedColumnId },
        ],
      }),
      axios.post('/api/triggers', {
        integrationId: 'globoards',
        SourceId: selectedBoardId,
        type: 'globoard-cardforward',
        attributes: [
          { columnId: selectedColumnId },
        ],
      }),
    ]).then(axios.spread((firstResponse, secondResponse) => {
      axios.all([
        axios.post('/api/triggeralerts', {
          triggerId: firstResponse.data.id,
          type: 'say',
          attributes: [
            { text: negativeMsg },
          ],
        }),
        axios.post('/api/triggeralerts', {
          triggerId: secondResponse.data.id,
          type: 'say',
          attributes: [
            { text: positiveMsg },
          ],
        }),
      ]).then(axios.spread((firstAlertResponse, secondAlertResponse) => {
        // final
      })).catch(() => {
        // error
      });
    })).catch(() => {
      // error again
    });
    event.preventDefault();
  }

  render() {
    const {
      boards,
      selectedBoardId,
      columns,
      selectedColumnId,
      positiveMsg,
      negativeMsg,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add/Edit Custom Alerts</h4>
        <p className="secondary">Apply alerts for specific columns. (this page is still under development)</p>
        <div className="row">
          { boards !== null
          && (
          <div className="col-xs-3">
            <div className="input-group">
              <label>Boards</label>
              <select value={selectedBoardId} onChange={this.getColumnsForBoard}>
                {boards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
              </select>
            </div>
          </div>
          )
          }
          {
            columns !== null
            && (
              <div className="col-xs-3">
                <div className="input-group">
                  <label>Column</label>
                  <select value={selectedColumnId} onChange={this.setColumnId}>
                    {columns.map(column => <option key={column.id} value={column.id}>{column.name}</option>)}
                  </select>
                </div>
              </div>
            )
          }
        </div>
        <div className="input-group">
          <label>Postive message</label>
          <textarea rows="6" value={positiveMsg} id="positiveMsg" name="positiveMsg" onChange={this.handleChange} type="text" />
        </div>
        <div className="input-group">
          <label>Negative message</label>
          <textarea rows="6" value={negativeMsg} id="negativeMsg" name="negativeMsg" onChange={this.handleChange} type="text" />
        </div>
        <button type="submit" className="button-primary">Save Changes</button>
        <br />
      </form>
    );
  }
}

export default TriggerConfig;
