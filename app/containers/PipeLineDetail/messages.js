/*
 * PipeLineDetail Messages
 *
 * This contains all the text for the PipeLineDetail container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.PipeLineDetail";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the PipeLineDetail container!"
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: "Add Details"
  },
  reSetAllDetails: {
    id: `${scope}.reSetAllDetails`,
    defaultMessage: "Reset All Details"
  },
  file: {
    id: `${scope}.file`,
    defaultMessage: "File"
  },
  item: {
    id: `${scope}.item`,
    defaultMessage: "Item"
  },
  distance: {
    id: `${scope}.distance`,
    defaultMessage: "Distance from previous element"
  },
  angle: {
    id: `${scope}.angle`,
    defaultMessage: "Angle"
  },
  tag: {
    id: `${scope}.tag`,
    defaultMessage: "Tag"
  },
  segment: {
    id: `${scope}.segment`,
    defaultMessage: "Segment"
  },
  coordinate: {
    id: `${scope}.coordinate`,
    defaultMessage: "[x,y,z]"
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: "No Details Available"
  },
  pipelineDetail: {
    id: `${scope}.pipelineDetail`,
    defaultMessage: "Pipeline Detail",
  },
  pipelineComponent: {
    id: `${scope}.pipelineComponent`,
    defaultMessage: "Pipeline Component",
  },
  addPipelineDetail: {
    id: `${scope}.addPipelineDetail`,
    defaultMessage: "Add Pipeline Details",
  },
  pipelineName: {
    id: `${scope}.pipelineName`,
    defaultMessage: "Pipeline Name",
  },
  datailsDeleted: {
    id: `${scope}.datailsDeleted`,
    defaultMessage: "Details deleted successfully",
  },
  in: {
    id: `${scope}.in`,
    defaultMessage: "In",
  },
  en: {
    id: `${scope}.en`,
    defaultMessage: "En",
  },
  chain: {
    id: `${scope}.chain`,
    defaultMessage: "Chain",
  },
  ehtZoneId: {
    id: `${scope}.ehtZoneId`,
    defaultMessage: "EHT Zone Id",
  },
  componentCount: {
    id: `${scope}.componentCount`,
    defaultMessage: "Manage Pipeline Components",
  },
  dtsZoneID: {
    id: `${scope}.dtsZoneID`,
    defaultMessage: "DTS Zone Id",
  },
  DtsOffPipe: {
    id: `${scope}.DtsOffPipe`,
    defaultMessage: "DtsOffPipe",
  },
  scadaSensorErrorMsg: {
    id: `${scope}.scadaSensorErrorMsg`,
    defaultMessage: "Pipeline Components CSV is required"
  },
  incorrectfileErrorMsg: {
    id: `${scope}.incorrectfileErrorMsg`,
    defaultMessage: "File must have a comma (,) separated content in *.csv format."
  },
});
