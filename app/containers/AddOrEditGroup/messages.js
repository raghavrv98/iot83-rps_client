import {defineMessages} from 'react-intl';

export const scope = "app.containers.AddOrEditGroup";

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"Manage Groups"
    },
    titleCreateGroup:{
        id:`${scope}.titleCreateGroup`,
        defaultMessage:"Create Group"
    },
    headingAdd:{
        id:`${scope}.headingAdd`,
        defaultMessage:"Create Group"
    },
    headingEdit:{
        id:`${scope}.headingEdit`,
        defaultMessage:" Edit Group"
    },
    formName:{
        id:`${scope}.formName`,
        defaultMessage:"Group Name"
    },
    formDescription:{
        id:`${scope}.formDescription`,
        defaultMessage:"Group Description"
    },
    groupAdded:{
        id:`${scope}.groupAdded`,
        defaultMessage:"Group added successfully."
    },
    groupUpdate:{
        id:`${scope}.groupUpdate`,
        defaultMessage:"Group Updated successfully."
    }
})