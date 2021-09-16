/**
 *
 * ErrorPage404
 *
 */

import React from "react";
import commonMessages from '../../messages';
import {FormattedMessage} from 'react-intl';
import messages from "./messages";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ErrorPage404 extends React.Component {
    render() {
        return (
            <div>
                <div className="errorPage">
                    <div className="errorPageContent">
                        <div className="errorPageHeader">
                            <h1>
                                <img src={require('../../assets/images/error.png')} />
                                <FormattedMessage {...messages.error404}/>
                                <img src={require('../../assets/images/browser.png')} />
                            </h1>
                        </div>
                        <h4><FormattedMessage {...commonMessages.pageNotExistMessage}/></h4>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorPage404.propTypes = {};

export default ErrorPage404;
