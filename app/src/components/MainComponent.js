import React, {Component} from 'react';
import Home from './HomeComponent';
import DeployedModelOutput from './DeployedModelOutput';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

class Main extends Component {

    render(){
      return (
  
          <div>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/deployedmodels" component={DeployedModelOutput}/>
                <Redirect to='/home'/>
            </Switch>
          </div>
      );
    }
  }
  
  export default withRouter(Main);