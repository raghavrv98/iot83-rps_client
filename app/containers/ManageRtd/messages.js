/*
 * ManageRtd Messages
 *
 * This contains all the text for the ManageRtd container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageRtd";

export default defineMessages({
  tag: {
    id: `${scope}.tag`,
    defaultMessage: "Tag"
  },
  units: {
    id: `${scope}.units`,
    defaultMessage: "Units"
  },
  chain: {
    id: `${scope}.chain`,
    defaultMessage: "Chain"
  },
  deleteMsg: {
    id: `${scope}.deleteMsg`,
    defaultMessage: "Scada Sensor Deleted Successfully"
  },
  deleteMsgError: {
    id: `${scope}.deleteMsgError`,
    defaultMessage: "Error"
  },
  equipId: {
    id: `${scope}.equipId`,
    defaultMessage: "EquipId"
  },
  reSetAllDetails: {
    id: `${scope}.reSetAllDetails`,
    defaultMessage: "Reset All Details"
  },
});
