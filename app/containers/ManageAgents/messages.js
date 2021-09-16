import { defineMessages } from 'react-intl';

export const scope = "app.containers.ManageAgents";

export default defineMessages({
    title: {
        id: `${scope}.title`,
        defaultMessage: "All Available Agents"
    },
    agentDeleteSuccess: {
        id: `${scope}.agentDeleteSuccess`,
        defaultMessage: "Agent Deleted Successfully."
    },
    confirmDeleteMessage: {
        id: `${scope}.confirmDeleteMessage`,
        defaultMessage: "Deleting Agent will delete all measurement readings. Are you sure?"
    },
    downloadKey: {
        id: `${scope}.downloadKey`,
        defaultMessage: "Download Secret Key"
    },
    mapping: {
        id: `${scope}.mapping`,
        defaultMessage: "Mappings"
    },
    configureDevice: {
        id: `${scope}.configureDevice`,
        defaultMessage: "Configure Device"
    },
    measurement: {
        id: `${scope}.measurement`,
        defaultMessage: "Measurements"
    },
    hide: {
        id: `${scope}.hide`,
        defaultMessage: "Hide"
    },
    textCopied: {
        id: `${scope}.textCopied`,
        defaultMessage: "Copied"
    },
    activeInactive: {
        id: `${scope}.activeInactive`,
        defaultMessage: "Active/Inactive"
    },
    activeMessage: {
        id: `${scope}.activeMessage`,
        defaultMessage: "Agent Active Successfully"
    },
    inActiveMessage: {
        id: `${scope}.inActiveMessage`,
        defaultMessage: "Agent Inactive Successfully"
    },
    compareConfiguration: {
        id: `${scope}.compareConfiguration`,
        defaultMessage: "Compare Configuration"
    },
    saveToRPSSuccess: {
        id: `${scope}.saveToRPSSuccess`,
        defaultMessage: "Save To RPS Successfully"
    },
    publishToDTSSuccess: {
        id: `${scope}.publishToDTSSuccess`,
        defaultMessage: "Publish To DTS Successfully"
    },
    DTSConfiguration: {
        id: `${scope}.DTS Configuration`,
        defaultMessage: "DTS Configuration"
    },
    RPSConfiguration: {
        id: `${scope}.RPSConfiguration`,
        defaultMessage: "RPS Configuration"
    },
    saveToRPS: {
        id: `${scope}.saveToRPS`,
        defaultMessage: "Save To RPS"
    },
    publishToDTS: {
        id: `${scope}.publishToDTS`,
        defaultMessage: "Publish To DTS"
    },
    deviceTag: {
        id: `${scope}.deviceTag`,
        defaultMessage: "Device Tag"
    },
    
})


