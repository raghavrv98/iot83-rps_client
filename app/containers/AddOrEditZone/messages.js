/*
 * AddOrEditZone Messages
 *
 * This contains all the text for the AddOrEditZone container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditZone";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the AddOrEditZone container!"
  },
  createZone: {
    id: `${scope}.createZone`,
    defaultMessage: "Create Zone"
  },
  updateZone: {
    id: `${scope}.updateZone`,
    defaultMessage: "Update Zone"
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
  PanelId: {
    id: `${scope}.PanelId`,
    defaultMessage: "Panel Id"
  },
  FeedChain: {
    id: `${scope}.FeedChain`,
    defaultMessage: "Feed Chain"
  },
  EndChain: {
    id: `${scope}.EndChain`,
    defaultMessage: "End Chain"
  },
  DesignVolts: {
    id: `${scope}.DesignVolts`,
    defaultMessage: "Design Volts"
  },
  DesignPF: {
    id: `${scope}.DesignPF`,
    defaultMessage: "Design PF"
  },
  MaintainAmps: {
    id: `${scope}.MaintainAmps`,
    defaultMessage: "Maintain Amps"
  },
  StartupAmps: {
    id: `${scope}.StartupAmps`,
    defaultMessage: "Startup Amps"
  },
  MaintainTemp: {
    id: `${scope}.MaintainTemp`,
    defaultMessage: "Maintain Temp"
  },
  StartupAmps: {
    id: `${scope}.StartupAmps`,
    defaultMessage: "Startup Amps"
  },
  VMtag: {
    id: `${scope}.VMtag`,
    defaultMessage: "VM tag"
  },
  AMtag: {
    id: `${scope}.AMtag`,
    defaultMessage: "AM tag"
  },
  PFtag: {
    id: `${scope}.PFtag`,
    defaultMessage: "PF tag"
  },
  RTD: {
    id: `${scope}.RTD`,
    defaultMessage: "RTD"
  },
  CircuitId: {
    id: `${scope}.CircuitId`,
    defaultMessage: "Circuit id"
  },
  StartupTemp: {
    id: `${scope}.StartupTemp`,
    defaultMessage: "Startup Temp"
  },
  scadaSensorErrorMsg: {
    id: `${scope}.scadaSensorErrorMsg`,
    defaultMessage: "EHT Zone CSV is required"
  },
  incorrectfileErrorMsg: {
    id: `${scope}.incorrectfileErrorMsg`,
    defaultMessage: "File must have a comma (,) separated content in *.csv format."
  },
});
