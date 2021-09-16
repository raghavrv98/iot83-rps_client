/*
 * ManageOAuthMapping Messages
 *
 * This contains all the text for the ManageOAuthMapping container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageOAuthMapping";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageOAuthMapping container!"
  },
  OAuthMapping: {
    id: `${scope}.OAuthMapping`,
    defaultMessage: "OAuth Mapping"
  },
  allAvailableOAuthMapping: {
    id: `${scope}.allAvailableOAuthMapping`,
    defaultMessage: "All Available OAuth Mappings"
  },
  oAuthRoleName: {
    id: `${scope}.oAuthRoleName`,
    defaultMessage: "OAuth Role Name"
  },
  IAMRole: {
    id: `${scope}.IAMRole`,
    defaultMessage: "IAM Role"
  },
  IAMGroup: {
    id: `${scope}.IAMGroup`,
    defaultMessage: "IAM Group"
  }
});
