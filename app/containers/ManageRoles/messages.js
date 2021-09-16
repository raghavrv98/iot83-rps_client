import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ManageRoles';

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"All Available Roles"
    },
    colName:{
        id:`${scope}.colName`,
        defaultMessage:"Roles Name"
    },
    roleDeleteSuccessMessage:{
        id:`${scope}.roleDeleteSuccessMessage`,
        defaultMessage: "Role Deleted Successfully."
    },
    confirmDeleteMessage:{
        id:`${scope}.confirmDeleteMessage`,
        defaultMessage: "Are you sure to delete this role?"
    },
    assignPermissions:{
        id:`${scope}.assignPermissions`,
        defaultMessage: "Manage Permissions"
    },
    manageRoleNavigation:{
        id:`${scope}.manageRoleNavigation`,
        defaultMessage: "Manage Role Navigation"
    },
    
})