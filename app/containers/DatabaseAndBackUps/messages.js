/*
 * DatabaseAndBackUps Messages
 *
 * This contains all the text for the DatabaseAndBackUps container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.DatabaseAndBackUps";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the DatabaseAndBackUps container!"
  },
  mySQL: {
    id: `${scope}.mySQL`,
    defaultMessage: "My SQL"
  },
  mongo: {
    id: `${scope}.mongo`,
    defaultMessage: "Mongo"
  },
  host: {
    id: `${scope}.host`,
    defaultMessage: "Host"
  },
  port: {
    id: `${scope}.port`,
    defaultMessage: "Port"
  },
  backUp: {
    id: `${scope}.backUp`,
    defaultMessage: "Backup"
  },
  databases: {
    id: `${scope}.databases`,
    defaultMessage: "Databases"
  },
  database: {
    id: `${scope}.database`,
    defaultMessage: "Database"
  },
  size: {
    id: `${scope}.size`,
    defaultMessage: "Size"
  },
  lastStatus: {
    id: `${scope}.lastStatus`,
    defaultMessage: "Last Status"
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: "Status"
  },
  lastSuccessful: {
    id: `${scope}.lastSuccessful`,
    defaultMessage: "Last Successful"
  },
  lastInitiated: {
    id: `${scope}.lastInitiated`,
    defaultMessage: "Last Initiated"
  },
  schedule: {
    id: `${scope}.schedule`,
    defaultMessage: "Schedule"
  },
  createBackup: {
    id: `${scope}.createBackup`,
    defaultMessage: "Create Backup"
  },
  backupType: {
    id: `${scope}.backupType`,
    defaultMessage: "Backup Type"
  },
  full: {
    id: `${scope}.full`,
    defaultMessage: "Full"
  },
  partial: {
    id: `${scope}.partial`,
    defaultMessage: "Partial"
  },
  timing: {
    id: `${scope}.timing`,
    defaultMessage: "Timing"
  },
  now: {
    id: `${scope}.now`,
    defaultMessage: "Now"
  },
  selectTenant: {
    id: `${scope}.selectTenant`,
    defaultMessage: "Select Tenant"
  },
  scheduleBackup: {
    id: `${scope}.scheduleBackup`,
    defaultMessage: "Schedule Backup"
  },
  select: {
    id: `${scope}.select`,
    defaultMessage: "Select"
  },
  daily: {
    id: `${scope}.daily`,
    defaultMessage: "Daily"
  },
  weekly: {
    id: `${scope}.weekly`,
    defaultMessage: "Weekly"
  },
  monthly: {
    id: `${scope}.monthly`,
    defaultMessage: "Monthly"
  },
  scheduleTime: {
    id: `${scope}.scheduleTime`,
    defaultMessage: "Schedule Time"
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: "Date"
  },
  day: {
    id: `${scope}.day`,
    defaultMessage: "Day"
  },
  hour: {
    id: `${scope}.hour`,
    defaultMessage: "Hour"
  },
  minutes: {
    id: `${scope}.minutes`,
    defaultMessage: "Minutes"
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: "Yes"
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: "No"
  },
  singleBackupMSG: {
    id: `${scope}.singleBackupMSG`,
    defaultMessage: "Database Backup and Restore process may impact application's performance.Do you want to take Backup now ?"
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: "Success"
  },
  failure: {
    id: `${scope}.failure`,
    defaultMessage: "Failure"
  },
  partial: {
    id: `${scope}.partial`,
    defaultMessage: "Partial"
  },
  na: {
    id: `${scope}.na`,
    defaultMessage: "NA"
  },
});
