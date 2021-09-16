/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ErrorPage404 from 'components/ErrorPage404/Loadable';
import LoginPage from '../LoginPage/Loadable'
import ResetPassword from "../ResetPassword/Loadable";
import Tooltip from '../../components/Tooltip/Loadable';

export default function App(props) {
    if (!document.getElementsByTagName('head')[0].querySelector("#themeCSS")) {
        var style = document.createElement('style');
        style.id = "themeCSS"
        style.textContent = '@import "' + window.API_URL + "api/public/static/css/theme.css" + '"';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    return (
        <React.Fragment>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route exact path="/resetPassword" component={ResetPassword} />
                <Route path="/" component={HomePage} />
                <Route component={ErrorPage404} />
            </Switch>
            <Tooltip {...props} />
        </React.Fragment>
            
    );
}
