import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PipeLineList';

export default defineMessages({
    title: {
        id: `${scope}.title`,
        defaultMessage: 'Manage Plants'
    },
    pipelineDeletedSuccess: {
        id: `${scope}.pipelineDeletedSuccess`,
        defaultMessage: 'Pipeline Deleted Successfully'
    },
    pipelinename: {
        id: `${scope}.pipelinename`,
        defaultMessage: `Pipeline Name:`
    },
    geometry: {
        id: `${scope}.geometry`,
        defaultMessage: `Geometry:`
    },
    otherinfo: {
        id: `${scope}.otherinfo`,
        defaultMessage: `Other Info:`
    },
    piplelineid: {
        id: `${scope}.piplelineid`,
        defaultMessage: `Pipleline ID`
    },
    processfluid: {
        id: `${scope}.processfluid`,
        defaultMessage: `Process Fluid`
    },
    showPipeLine: {
        id: `${scope}.showPipeLine`,
        defaultMessage: "Show Pipeline"
    },
    noData: {
        id: `${scope}.noData`,
        defaultMessage: "There are no pipelines added yet....!"
    },
    EHTDetails: {
        id: `${scope}.EHTDetails`,
        defaultMessage: "EHT Details"
    },
    RTDDetails: {
        id: `${scope}.RTDDetails`,
        defaultMessage: "Scada Sensor Details"
    },
    activeAlarms: {
        id: `${scope}.activeAlarms`,
        defaultMessage: `Active Alarms`
    },
    activeIndicators: {
        id: `${scope}.activeIndicators`,
        defaultMessage: "Active Indicators"
    },
    viewLandMarks: {
        id: `${scope}.viewLandMarks`,
        defaultMessage: "View LandMarks"
    },
    allAvailablePipelines: {
        id: `${scope}.allAvailablePipelines`,
        defaultMessage: "All Available Pipelines"
    },
})