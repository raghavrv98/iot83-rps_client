/*
 * ManageLicencePlan Messages
 *
 * This contains all the text for the ManageLicencePlan container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageLicencePlan";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageLicensePlan container!"
  },
  deviceId: {
    id: `${scope}.deviceId`,
    defaultMessage: "Device Id"
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: "Status"
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: "Hide"
},
textCopied: {
    id: `${scope}.textCopied`,
    defaultMessage: "Copied"
},
deleteMsg: {
  id: `${scope}.deleteMsg`,
  defaultMessage: "License Deleted Successfully"
},
});
