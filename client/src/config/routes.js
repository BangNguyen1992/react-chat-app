import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../App';
import { Register } from '../Component/Register';
import { NotFound } from '../Component/NotFound';

const MyRouter = (props) => {
  return (
    <Switch>
      <Route path="/chat-app/:userId" component={App} />
      <Route exact path="/" component={Register} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default MyRouter;