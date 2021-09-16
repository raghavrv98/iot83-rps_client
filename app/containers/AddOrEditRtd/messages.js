/*
 * AddOrEditRtd Messages
 *
 * This contains all the text for the AddOrEditRtd container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditRtd";

export default defineMessages({
  createRTDMessage: {
    id: `${scope}.createRTD`,
    defaultMessage: "Scada Sensor Created Successfully"
  },
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
  pipelinename: {
    id: `${scope}.pipelinename`,
    defaultMessage: "Pipeline Name"
  },
  addone: {
    id: `${scope}.addone`,
    defaultMessage: "add one"
  },
  addmany: {
    id: `${scope}.addmany`,
    defaultMessage: "add many"
  },
  updateRTDMessage: {
    id: `${scope}.updateRTD`,
    defaultMessage: "Scada Sensor Updated Successfully"
  },
  createRTD: {
    id: `${scope}.createRTD`,
    defaultMessage: "Create Scada Sensor"
  },
  updateRTD: {
    id: `${scope}.updateRTD`,
    defaultMessage: "Update Scada Sensor"
  },
  equipId: {
    id: `${scope}.equipId`,
    defaultMessage: "EquipId"
  },
  scadaSensorErrorMsg: {
    id: `${scope}.scadaSensorErrorMsg`,
    defaultMessage: "Scada Sensor CSV is required"
  },
  incorrectfileErrorMsg: {
    id :`${scope}.incorrectfileErrorMsg`,
    defaultMessage : "File must have a comma (,) separated content in *.csv format."
  },
});
