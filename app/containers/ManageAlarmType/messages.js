/*
 * ManageAlarmType Messages
 *
 * This contains all the text for the ManageAlarmType container.
 */


import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageAlarmType";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageAlarmType container!"
  },
  pageHeader: {
    id: `${scope}.pageHeader`,
    defaultMessage: "Add/Remove Alarm Types"
  },
  manageAlarmType: {
    id: `${scope}.manageAlarmType`,
    defaultMessage: "Manage Alarm Type"
  },
  allAvailableAlarmType: {
    id: `${scope}.allAvailableAlarmType`,
    defaultMessage: "All Available Alarm Type"
  },
  submitSuccess: {
    id: `${scope}.submitSuccess`,
    defaultMessage: "Alarm Type Updated Successfully"
  },
  selectCategory: {
    id: `${scope}.selectCategory`,
    defaultMessage: "Select Category"
  }
});
