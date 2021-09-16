import { defineMessages } from 'react-intl';

export const scope = "app.containers.ConfigMeasurement";

export default defineMessages({
    title: {
        id: `${scope}.title`,
        defaultMessage: "Manage Agents"
    },
    mesureName: {
        id: `${scope}.mesureName`,
        defaultMessage: "Measurement Name"
    },
    mesureHash: {
        id: `${scope}.mesureHash`,
        defaultMessage: "Measurement Hash"
    },
    mesureTime: {
        id: `${scope}.mesureTime`,
        defaultMessage: "Measurement Time"
    },
    deviceId: {
        id: `${scope}.deviceId`,
        defaultMessage: "Device ID"
    },
    deviceTable: {
        id: `${scope}.deviceTable`,
        defaultMessage: "Data Table"
    },
    noMeasurementMessage: {
        id: `${scope}.noMeasurementMessage`,
        defaultMessage: "There are no measurement added yet"
    },
    totalMeasurements: {
        id: `${scope}.totalMeasurements`,
        defaultMessage: "Total Measurements"
    },
    noData: {
        id: `${scope}.noData`,
        defaultMessage: "No Measurement Found"
    },
    process: {
        id: `${scope}.process`,
        defaultMessage: "Process"
    },
})