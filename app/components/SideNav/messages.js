/*
 * SideNav Messages
 *
 * This contains all the text for the SideNav component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.SideNav";

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: "Welcome !"
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: "Change Password"
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: "Logout"
  },
  manageNavigations: {
    id: `${scope}.manageNavigations`,
    defaultMessage: "Manage Navigations"
  },
  managebranding: {
    id: `${scope}.managebranding`,
    defaultMessage: "Manage Branding"
  },
  managePasswordRequest: {
    id: `${scope}.managePasswordRequest`,
    defaultMessage: "Manage Password Request"
  },
  allAvailableAlarmsAndAlerts: {
    id: `${scope}.allAvailableAlarmsAndAlerts`,
    defaultMessage: "Alarms"
  }
});
