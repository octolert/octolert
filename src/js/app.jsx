import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar';
import Integration from './pages/integration';
import Settings from './pages/settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      auth: null,
    };
  }

  componentDidMount() {
    axios.get('/api/integrations').then(
      (result) => {
        this.setState({
          isLoaded: true,
          auth: result.data,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          auth: null,
        });
      },
    );
  }

  render() {
    const { isLoaded, auth } = this.state;
    if (isLoaded) {
      return (
        <Router>
          <Navbar />
          <br />
          {auth !== null && auth.length !== 0 && (
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/settings" />
            )}
          />
          )}
          {auth !== null && auth.length === 0 && (
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/integrate" />
            )}
          />
          )}
          <Route path="/integrate/" component={Integration} />
          <Route path="/settings/" component={Settings} />
        </Router>
      );
    } else {
      return <p>is loading</p>;
    }
  }
}

export default App;
