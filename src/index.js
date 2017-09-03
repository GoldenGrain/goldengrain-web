import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import '@blueprintjs/core/dist/blueprint.css';
import '@blueprintjs/datetime/dist/blueprint-datetime.css';

import { FocusStyleManager } from "@blueprintjs/core";
import loginApi from "service/api/login.api";


import './infra/theme/material-dashboard.scss';
import './infra/theme/default-theme.scss';
import 'font-awesome/css/font-awesome.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import store from 'service/store';

import Router from 'infra/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

FocusStyleManager.onlyShowFocusOnTabs();

if (localStorage.getItem("access_token")) {

  loginApi.userInfo()
    .then(userinfo => store.dispatch({
      type: "LOGIN_USER_INFO_FETCH_SUCCESS",
      userinfo
    }))

}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      {Router}
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);

