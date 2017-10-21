import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import LoginContainer from 'components/LoginContainer.jsx';
import AudioListContainer from 'components/AudioListContainer.jsx';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={appHistory}>
    <Route component={AudioListContainer} name="audio-list" path="/" />
    <Route component={LoginContainer} name="login" path="/login" />
  </Router>,
  document.getElementById('music-app-main')
);
