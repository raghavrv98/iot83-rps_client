/**
 *
 * ErrorPage403
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import commonMessages from '../../messages';
import messages from './messages';

class ErrorPage403 extends React.Component {
  render() {
    let errorMessage = this.props.history.location.state.error
    return (
      <div>
        <div className="errorPage">
          <div className="errorPageContent">
            <div className="errorPageHeader">
              <h1>
                <img src={require('../../assets/images/error.png')} />
                <FormattedMessage {...messages.error403} />
                <img src={require('../../assets/images/browser.png')} />
              </h1>
            </div>
            <h4><FormattedMessage {...commonMessages.accessDeniedMessage} /></h4>
            <p> {errorMessage ? errorMessage : <FormattedMessage {...commonMessages.notAuthorizedMessages} />}</p>
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage403.propTypes = {};

export default ErrorPage403;

