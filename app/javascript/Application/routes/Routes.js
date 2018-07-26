import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AssessmentContainer, Client, ClientsContainer } from '../components';
import { ClientAddForm, ClientEditForm } from '../components/Client';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/clients/:childId/assessments/:id?" component={AssessmentContainer} />
      <Route exact path="/clients/new" component={ClientAddForm} />
      <Route exact path="/clients/edit/:id" component={ClientEditForm} />
      <Route path="/clients/:id" component={Client} />
      <Route exact path="/" component={ClientsContainer} />
    </Switch>
  );
};

export default Routes;
