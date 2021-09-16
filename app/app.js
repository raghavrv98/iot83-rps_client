/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import './polyfill.js';
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import './dist/amcharts3/amcharts.js'
import './dist/amcharts3/serial.js'
import './dist/amcharts3/pie.js'
import './dist/amcharts3/light.js'
import './dist/amcharts3/gauge.js'
import './dist/amcharts3/dataloader.min.js'
import './dist/amcharts3/export.min.js'

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import '../node_modules/jquery/dist/jquery.slim.min.js';
import '../node_modules/popper.js/dist/popper.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Import CSS
import './assets/css/animate.css';
import './assets/css/style.css';
import './assets/css/buttons.css'
import './assets/css/custom.css';
import './assets/css/main.css';
import './assets/css/login.css';
import './assets/css/header.css';
import './assets/css/loader.css';

//Import Skeleton CSS
import './assets/css/skeleton.css';

//Import Skeleton Loader CSS
import './assets/css/skeletonLoader.css';

//Import Tooltip CSS
import './assets/css/tooltip.css';

// Import React Table CSS
import 'react-table/react-table.css';
import './assets/css/customReactTable.css';

// Import RC-Slider CSS
import 'rc-slider/assets/index.css';

// Import Font Family CSS
import './dist/fontFamily/css/openSans.css';
import './dist/fontFamily/css/quicksand.css';
import './dist/fontFamily/css/roboto.css';

// Import Font Awesome CSS
import './assets/fontAwesome/css/all.css';
import './assets/fontAwesome/css/brands.css';
import './assets/fontAwesome/css/fontawesome.css';
import './assets/fontAwesome/css/light.css';
import './assets/fontAwesome/css/regular.css';
import './assets/fontAwesome/css/solid.css';
import './assets/fontAwesome/css/v4-shims.css';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import configureStore from './configureStore';

import './assets/css/reactTagInput.css';

// import './assets/css/theme.css';

// Import i18n messages
import { translationMessages } from './i18n';
// window.API_URL = 'https://pmmp-dev.internal-iot83.com/';
window.API_URL = process.env.API_URL ? process.env.API_URL : `${window.location.origin}/`;
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise(resolve => {
        resolve(import('intl'));
    })
        .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
        .then(() => render(translationMessages))
        .catch(err => {
            throw err;
        });
} else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
