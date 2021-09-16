/**
 *
 * Loader
 *
 */

import React from "react";

import { FormattedMessage } from "react-intl";
import commonMessages from '../../messages';

/* eslint-disable react/prefer-stateless-function */
class Loader extends React.Component {
  render() {
    return (
      <div className="pageLoaderBox">
          <div className="pageLoader"> <FormattedMessage {...commonMessages.loading} children={(message => message)} /> </div>
      </div>
    );
  }
}

Loader.propTypes = {};

export default Loader;
