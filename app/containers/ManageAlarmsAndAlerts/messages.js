/*
 * ManageAlarmsAndAlerts Messages
 *
 * This contains all the text for the ManageAlarmsAndAlerts container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageAlarmsAndAlerts";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ManageAlarmsAndAlerts container!"
  },
  allAvailableAlarmsAndAlerts: {
    id: `${scope}.allAvailableAlarmsAndAlerts`,
    defaultMessage: "All Available Alarms"
  },
  alarmType: {
    id: `${scope}.alarmType`,
    defaultMessage: "Alarm Type"
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: "Status"
  },
  statusOption1: {
    id: `${scope}.statusOption1`,
    defaultMessage: "Raised"
  },
  statusOption2: {
    id: `${scope}.statusOption2`,
    defaultMessage: "Acknowledged"
  },
  statusOption4: {
    id: `${scope}.statusOption4`,
    defaultMessage: "Addressed"
  },
  sort: {
    id: `${scope}.sort`,
    defaultMessage: "Sort"
  },
  sortBy: {
    id: `${scope}.sortBy`,
    defaultMessage: "Sort By"
  },
  sortOrder: {
    id: `${scope}.sortingOrder`,
    defaultMessage: "Order"
  },
  measurementTime: {
    id: `${scope}.measurementTime`,
    defaultMessage: "Measurement Time"
  },
  priority: {
    id: `${scope}.priority`,
    defaultMessage: "Priority"
  },
  sortOrderOption1: {
    id: `${scope}.ascending`,
    defaultMessage: "ASC"
  },
  sortOrderOption2: {
    id: `${scope}.descending`,
    defaultMessage: "DESC"
  },
  clearFilter: {
    id: `${scope}.clearFilter`,
    defaultMessage: "Clear Filter"
  },
  ack: {
    id: `${scope}.ack`,
    defaultMessage: "Ack"
  },
  unAck: {
    id: `${scope}.unAck`,
    defaultMessage: "Un-ack"
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: "Address"
  },
  addressed: {
    id: `${scope}.addressed`,
    defaultMessage: "Addressed"
  },
  viewDetails: {
    id: `${scope}.viewDetails`,
    defaultMessage: "View Details"
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: "Description"
  },
  addFilterType: {
    id: `${scope}.addFilterType`,
    defaultMessage: "Add Filter Type"
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: "No Alarms Found"
  },
  confirmmessage: {
    id: `${scope}.confirmmessage`,
    defaultMessage: "Addressed alarms will never be reverted. Do you want to continue?"
  },
  alarmStatusSuccess: {
    id: `${scope}.alarmStatusSuccess`,
    defaultMessage: 'Request Completed Successfully'
  },
  link: {
    id: `${scope}.link`,
    defaultMessage: 'Link'
  },
  lastRenewed: {
    id: `${scope}.lastRenewed`,
    defaultMessage: 'Last Renewed'
  },
  generated: {
    id: `${scope}.generated`,
    defaultMessage: 'Generated'
  },
  hightolow: {
    id: `${scope}.hightolow`,
    defaultMessage: 'High to Low'
  },
  lowtohigh: {
    id: `${scope}.lowtohigh`,
    defaultMessage: 'Low to High'
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: "All"
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: "Category"
  },
  historyOf: {
    id: `${scope}.historyOf`,
    defaultMessage: "History of"
  },
  historyMessage: {
    id: `${scope}.historyMessage`,
    defaultMessage: "No History in this location."
  },
});
