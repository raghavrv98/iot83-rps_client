/*
 * ManageOAuthConfig Messages
 *
 * This contains all the text for the ManageOAuthConfig container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageOAuthConfig";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageOAuthConfig container!"
  },
  confirmDeleteMessage: {
    id: `${scope}.confirmDeleteMessage`,
    defaultMessage: "Are you sure to delete this Config?"
  },

  configDeleteSuccessMessage: {
    id: `${scope}.configDeleteSuccessMessage`,
    defaultMessage: "Config Deleted Successfully."
  },
  OAuthConfiguration: {
    id: `${scope}.OAuthConfiguration`,
    defaultMessage: "OAuth Configuration"
  },
  selectProvider: {
    id: `${scope}.selectProvider`,
    defaultMessage: "Select Provider"
  },
  clientId: {
    id: `${scope}.clientId`,
    defaultMessage: "Client ID"
  },
  clientSecret: {
    id: `${scope}.clientSecret`,
    defaultMessage: "Client Secret"
  },
  redirectURL: {
    id: `${scope}.redirectURL`,
    defaultMessage: "Redirect URL"
  },
  wellKnownConfig: {
    id: `${scope}.wellKnownConfig`,
    defaultMessage: "Well Known Config (OpenId)"
  },
  responseType: {
    id: `${scope}.responseType`,
    defaultMessage: "Response Type"
  },
  scope: {
    id: `${scope}.scope`,
    defaultMessage: "Scope"
  },
});
