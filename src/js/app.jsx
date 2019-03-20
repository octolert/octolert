import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar';
import Integration from './pages/integration';
import TriggerConfig from './pages/trigger-config';
import DefaultAlertConfig from './pages/default-alert-config';
import ViewCustomConfig from './pages/view-custom-config';
import Settings from './pages/settings';


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar></Navbar>
        <br></br>
        <Route exact path="/" render={() => (
          <Redirect to="/settings"/>
        )}/>
        <Route path="/integrate/" component={Integration} />
        <Route path="/settings/" component={Settings} />
        <Route path="/trigger-config/" component={TriggerConfig} />
        <Route path="/default-alert-config/" component={DefaultAlertConfig} />
        <Route path="/view-custom-alerts/" component={ViewCustomConfig} />
      </Router>
    );
  }
}

export default App;
