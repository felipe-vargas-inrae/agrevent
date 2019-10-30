import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from '../containers/_layout';
import MainWrapper from './MainWrapper';

import LogIn from '../containers/log_in';
import ExamplePageOne from '../containers/example';
import ExamplePageTwo from '../containers/example_two';
import SensorPage from '../containers/sensor';
import BasicForm from '../containers/sensor_2';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path='/' component={LogIn}/>
        <Route exact path='/log_in' component={LogIn}/>
        <Route path='/' component={wrappedRoutes}/>
      </Switch>
    </main>
  </MainWrapper>
);

const wrappedRoutes = () => (
  <div>
    <Layout/>
    <div className='container__wrap'>
      <Route path='/pages' component={Pages}/>
    </div>
  </div>
);

const Pages = () => (
  <Switch>
    <Route path='/pages/one' component={ExamplePageOne}/>
    <Route path='/pages/two' component={ExamplePageTwo}/>
    <Route path='/pages/sensor' component={SensorPage}/>
    <Route path='/pages/sensor2' component={BasicForm}/>
  </Switch>
);

export default Router;
