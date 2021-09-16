/*
 * AddOrEditAgent Messages
 *
 * This contains all the text for the AddOrEditAgent container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditAgent";

export default defineMessages({
  headingAdd: {
    id :`${scope}.headingAdd`,
    defaultMessage : "Create Agent"
  },
  deviceId: {
    id :`${scope}.deviceId`,
    defaultMessage : "Device Id"
  },
  headingEdit: {
    id :`${scope}.headingEdit`,
    defaultMessage : "Edit Agent"
  },
  option1: {
    id :`${scope}.option1`,
    defaultMessage : "AP Sensing DTS Poller"
  },
  option2: {
    id :`${scope}.option2`,
    defaultMessage : "DCS Agent"
  },
  modbusPort: {
    id :`${scope}.addModbusPort`,
    defaultMessage : "Modbus Port"
  },
  addModbusMap: {
    id :`${scope}.addModbusMap`,
    defaultMessage : "Modbus Map"
  },
  agentUpdateMessage: {
    id :`${scope}.agentUpdateMessage`,
    defaultMessage : "Agent updated successfully."
  },
  agentCreateMessage: {
    id :`${scope}.agentCreateMessage`,
    defaultMessage : "Agent added successfully."
  },
  ipAddress: {
    id :`${scope}.ipAddress`,
    defaultMessage : "IP Address"
  },
  instrumentSetting: {
    id :`${scope}.instrumentSetting`,
    defaultMessage : "Instrument Setting"
  },
  instrumentIdentification: {
    id :`${scope}.instrumentIdentification`,
    defaultMessage : "Instrument Identification"
  },
  location: {
    id :`${scope}.location`,
    defaultMessage : "Location"
  },
  pollingInterval: {
    id :`${scope}.pollingInterval`,
    defaultMessage : "Polling service interval (sec)"
  },
  agentStatus: {
    id :`${scope}.agentStatus`,
    defaultMessage : "Agent Status"
  },
  modbusMapErrorMsg: {
    id :`${scope}.modbusMapErrorMsg`,
    defaultMessage : "Modbus Map is required"
  },
  incorrectfileErrorMsg: {
    id :`${scope}.incorrectfileErrorMsg`,
    defaultMessage : "File must have a comma (,) separated content in *.csv format."
  },
  devicetag: {
    id :`${scope}.devicetag`,
    defaultMessage : "Device Tag"
  },
  port: {
    id :`${scope}.port`,
    defaultMessage : "Port"
  },
  secretKey: {
    id :`${scope}.secretKey`,
    defaultMessage : "Secret Key"
  },
  dtsPollType: {
    id :`${scope}.dtsPollType`,
    defaultMessage : "Type of data being polled"
  },
});
