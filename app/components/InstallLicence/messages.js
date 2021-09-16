/*
 * InstallLicence Messages
 *
 * This contains all the text for the InstallLicence component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.InstallLicence";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the InstallLicence component!"
  },
  updateLicence: {
    id: `${scope}.updateLicence`,
    defaultMessage: "Update License"
  },
  licenceName: {
    id: `${scope}.licenceName`,
    defaultMessage: "License Name"
  },
  install: {
    id: `${scope}.install`,
    defaultMessage: "Install"
  },
});
