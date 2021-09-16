/*
 * AddOrEditPipeLine Messages
 *
 * This contains all the text for the AddOrEditPipeLine container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditPipeLine";

export default defineMessages({
  pipelinename: {
    id: `${scope}.pipelinename`,
    defaultMessage: `Pipeline Name:`
  },
  geometry: {
    id: `${scope}.geometry`,
    defaultMessage: `Geometry:`
  },
  managepipeline: {
    id: `${scope}.managepipeline`,
    defaultMessage: `Create Pipeline`
  },
  addnewpipeline: {
    id: `${scope}.addnewpipeline`,
    defaultMessage: `Create Pipeline`
  },
  editpipeline: {
    id: `${scope}.editpipeline`,
    defaultMessage: `Update Pipeline`
  },
  otherinfo: {
    id: `${scope}.otherinfo`,
    defaultMessage: `Other Info:`
  },
  coldHHlimitError: {
    id: `${scope}.coldHHlimitError`,
    defaultMessage: `Cold LL Limit should be smaller than Hot HH Limit`
  },
  freezeBandHighError: {
    id: `${scope}.freezeBandHighError`,
    defaultMessage: `Freeze Temperature should be less than Freeze Band High Limit`
  },
  coldHHFreezeBandHighLimitError: {
    id: `${scope}.coldHHFreezeBandHighLimitError`,
    defaultMessage: `Freeze Band High Limit should be less than Cold LL Limit`
  },
  freezeBandLowError: {
    id: `${scope}.freezeBandLowError`,
    defaultMessage: `Freeze Band Low Limit should be less than Freeze Temperature`
  },
  note1Bold: {
    id: `${scope}.note1Bold`,
    defaultMessage: `Cold LL Limit should be smaller than Hot HH Limit`
  },
  note1: {
    id: `${scope}.note1`,
    defaultMessage: `( Cold LL Limit should be between -121 and 251 and Hot HH Limit should be between -1 and 251 ).`
  },
  note2Bold: {
    id: `${scope}.note2Bold`,
    defaultMessage: `Freeze Band Low Limit should be less than Freeze Temperature`
  },
  note2: {
    id: `${scope}.note2`,
    defaultMessage: `( Freeze Temperature should be between -121 and 251 and Time To Freeze LL Limit should be between 1 and 17 ).`
  },
  anchorShiftThreshold: {
    id: `${scope}.anchorShiftThreshold`,
    defaultMessage: `Anchor Shift Threshold`
  },
  generateReport: {
    id: `${scope}.generateReport`,
    defaultMessage: `Generate Report`
  },
});

