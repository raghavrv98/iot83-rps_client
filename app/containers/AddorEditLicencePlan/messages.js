/*
 * AddorEditLicencePlan Messages
 *
 * This contains all the text for the AddorEditLicencePlan container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddorEditLicencePlan";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the AddorEditLicensePlan container!"
  },
  createLicense: {
    id: `${scope}.createLicense`,
    defaultMessage: "Create License"
  },
  duration: {
    id: `${scope}.duration`,
    defaultMessage: "Duration",
  },
  submitSuccessMessage:{
    id:`${scope}.submitSuccessMessage`,
    defaultMessage:"License Created Successfully."
},
});
