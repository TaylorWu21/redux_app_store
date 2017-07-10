import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getApps } from '../actions/apps';
import { Loader, Segment, Dimmer } from 'semantic-ui-react';

import Apps from './Apps';
import AppView from './AppView';
import AppForm from './AppForm';

class FetchApps extends Component {

  componentDidMount() {
    this.props.dispatch(getApps())
  }

  render() {
    if (this.props.apps) {
      return (
        <Switch>
          <Route exact path="/apps" component={Apps} />
          <Route exact path="/apps/new" component={AppForm} />
          <Route exact path="/apps/edit/:id" component={AppForm} />
          <Route exact path="/apps/:id" component={AppView} />
        </Switch>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => (
  { apps: state.apps }
)

export default connect(mapStateToProps)(FetchApps);