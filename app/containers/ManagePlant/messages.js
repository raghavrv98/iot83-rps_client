import {defineMessages} from 'react-intl';

export const scope = "app.containers.ManagePlant";

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"All Available Plants"
    },
    confirmmessage:{
        id:`${scope}.confirmmessage`,
        defaultMessage:"Are you sure to delete"
    },
    cardPlantName:{
        id:`${scope}.cardPlantName`,
        defaultMessage:"Plant Name"
    },
    noPipeLine:{
        id:`${scope}.noPipeLine`,
        defaultMessage:"No. of Pipelines"
    },
    plantDeleteSuccessMessage:{
        id:`${scope}.plantDeleteSuccessMessage`,
        defaultMessage:"Plant Deleted Successfully"
    },
    viewPipelines:{
        id:`${scope}.viewPipelines`,
        defaultMessage:"View Pipelines"
    },
    noPlant: {
        id:`${scope}.noPlant`,
        defaultMessage:"There are no plants added yet....!"
    },
})