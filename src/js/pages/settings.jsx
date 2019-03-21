import React, { Component } from 'react';
import DefaultAlertConfig from '../components/default-alert-config';
import TriggerConfig from '../components/trigger-config';
import ViewCustomConfig from '../components/view-custom-config';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingSelected: 'DEFAULT_ALERT',
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(event) {
    this.setState({ settingSelected: event.target.value });
    event.preventDefault();
  }

  render() {
    const { settingSelected } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            <p>Settings</p>
            <button
              type="button"
              className={settingSelected === 'DEFAULT_ALERT' ? 'settings-nav-button-active' : 'settings-nav-button'}
              value="DEFAULT_ALERT"
              onClick={this.changeTab.bind(this)}
            >
            Configure Default Alert
            </button>
            <button
              type="button"
              className={settingSelected === 'TRIGGER_CONFIG' ? 'settings-nav-button-active' : 'settings-nav-button'}
              value="TRIGGER_CONFIG"
              onClick={this.changeTab.bind(this)}
            >
            Add/Edit Custom Alerts
            </button>
            <button
              type="button"
              className={settingSelected === 'VIEW_ALL_ALERTS' ? 'settings-nav-button-active' : 'settings-nav-button'}
              value="VIEW_ALL_ALERTS"
              onClick={this.changeTab.bind(this)}
            >
            View All Custom Alerts
            </button>
          </div>
          <div className="col-xs-9">
            { settingSelected === 'DEFAULT_ALERT' && <DefaultAlertConfig /> }
            { settingSelected === 'TRIGGER_CONFIG' && <TriggerConfig /> }
            { settingSelected === 'VIEW_ALL_ALERTS' && <ViewCustomConfig /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
