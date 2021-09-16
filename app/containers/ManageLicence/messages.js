/*
 * ManageLicence Messages
 *
 * This contains all the text for the ManageLicence container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageLicence";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageLicense container!"
  },
  ok: {
    id: `${scope}.ok`,
    defaultMessage: "Ok"
  },
  copied: {
    id: `${scope}.copied`,
    defaultMessage: "copied"
  },
  plansUpdated: {
    id: `${scope}.plansUpdated`,
    defaultMessage: "Plans Updated Successfully"
  },
  newPlan: {
    id: `${scope}.newPlan`,
    defaultMessage: "New Plan"
  },
  ourPlans: {
    id: `${scope}.ourPlans`,
    defaultMessage: "Our Plans"
  },
  algorithmsAttributes: {
    id: `${scope}.algorithmsAttributes`,
    defaultMessage: "Algorithms & Attributes"
  },
});
