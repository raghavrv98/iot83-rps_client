import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ManageGroup';

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"All Available Groups"
    },
    colName:{
        id:`${scope}.colName`,
        defaultMessage:"Group Name"
    },
    groupDeleteSuccess:{
        id:`${scope}.groupDeleteSuccess`,
        defaultMessage:"Group Deleted Successfully."
    },
    confirmDelateMessage:{
        id:`${scope}.confirmDelateMessage`,
        defaultMessage: "Are you sure to delete this group?"
    },
})