/*
 * ManagePasswordRequest Messages
 *
 * This contains all the text for the ManagePasswordRequest container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManagePasswordRequest";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManagePasswordRequest container!"
  },
  managePasswordRequest: {
    id: `${scope}.managePasswordRequest`,
    defaultMessage: "Manage Password Request"
  },
  allAvailableRequest: {
    id: `${scope}.allAvailableRequest`,
    defaultMessage: "All Available Request"
  },
  temporaryPassword: {
    id: `${scope}.temporaryPassword`,
    defaultMessage: "Temporary Password"
  },
  approve: {
    id: `${scope}.approve`,
    defaultMessage: "Approve"
  },
  approved: {
    id: `${scope}.approved`,
    defaultMessage: "Approved"
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: "There is no Request yet....!"
  },
  remaningTime: {
    id: `${scope}.remaningTime`,
    defaultMessage: "Remaning Time"
  },
  startTime: {
    id: `${scope}.startTime`,
    defaultMessage: "Created Time"
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: "Hide"
  },
  show: {
    id: `${scope}.show`,
    defaultMessage: "Show"
  }
});
