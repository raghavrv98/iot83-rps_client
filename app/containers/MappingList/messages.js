/*
 * MappingList Messages
 *
 * This contains all the text for the MappingList container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.MappingList";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Manage Agents"
  },
  title1: {
    id: `${scope}.title1`,
    defaultMessage: "Manage Mapping"
  },
  deleteMappingSuccess: {
    id: `${scope}.deleteMappingSuccess`,
    defaultMessage: "Mapping Deleted Successfully"
  },
  npMessage: {
    id: `${scope}.npMessage`,
    defaultMessage: "No Mapping Available"
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: "Save"
  },
  mappingCount: {
    id: `${scope}.mappingCount`,
    defaultMessage: "Mapping Count"
  },
  successMappings: {
    id: `${scope}.successMappings`,
    defaultMessage: "Mapping Updated Succesfully"
  },
  totalMappings: {
    id: `${scope}.totalMappings`,
    defaultMessage: "Total Mappings"
  },
  clear: {
    id: `${scope}.clear`,
    defaultMessage: "Clear"
  },
  editorError: {
    id: `${scope}.editorError`,
    defaultMessage: "Condition is required"
  },
  code: {
    id: `${scope}.code`,
    defaultMessage: "Code"
  },
  deviceTag: {
    id: `${scope}.deviceTag`,
    defaultMessage: "Device Tag"
  },
});
