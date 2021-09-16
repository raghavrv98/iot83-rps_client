/*
 * ManageReport Messages
 *
 * This contains all the text for the ManageReport container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageReport";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageReport container!"
  },
  manageReport: {
    id: `${scope}.manageReport`,
    defaultMessage: "Manage Report"
  },
  allAvailableReports: {
    id: `${scope}.allAvailableReports`,
    defaultMessage: "All Available Reports"
  },
  reportName: {
    id: `${scope}.reportName`,
    defaultMessage: "Report Name"
  },
  report: {
    id: `${scope}.report`,
    defaultMessage: "Report"
  },
  selectPlant: {
    id: `${scope}.selectPlant`,
    defaultMessage: "Select Plant"
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: "Type"
  },
  noPlant: {
    id: `${scope}.noPlant`,
    defaultMessage: "No Plant Selected"
  },
  selectPipeline: {
    id: `${scope}.selectPipeline`,
    defaultMessage: "Select Pipeline"
  },
  noPipeline: {
    id: `${scope}.noPipeline`,
    defaultMessage: "No Pipeline Selected"
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: "No Reports Found"
  },
  saveAs: {
    id: `${scope}.saveAs`,
    defaultMessage: "Save As"
  },
  html: {
    id: `${scope}.html`,
    defaultMessage: "HTML"
  },
  pdf: {
    id: `${scope}.pdf`,
    defaultMessage: "PDF"
  },
});
