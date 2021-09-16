import { defineMessages } from 'react-intl';

export const scope = "app.containers.AddOrEditRole";

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"Manage Roles"
    },
    titleCreateRole:{
        id:`${scope}.titleCreateRole`,
        defaultMessage:"Create Role"
    },
    headingAdd:{
        id:`${scope}.headingAdd`,
        defaultMessage:"Create Role"
    },
    headingEdit:{
        id:`${scope}.headingEdit`,
        defaultMessage:"Edit Role"
    },
    formName:{
        id:`${scope}.formName`,
        defaultMessage:"Role Name"
    },
    formDescription:{
        id:`${scope}.formDescription`,
        defaultMessage:"Role Description"
    },
    buttonUpdateRole:{
        id:`${scope}.buttonUpdateRole`,
        defaultMessage:"Update Role"
    },
    submitSuccessMessage:{
        id:`${scope}.submitSuccessMessage`,
        defaultMessage:"Role added successfully."
    },
    updateMessageHandler:{
        id:`${scope}.updateMessageHandler`,
        defaultMessage:"Role updated successfully."
    },
    permissions: {
        id: `${scope}.permissions`,
        defaultMessage: "Permissions"
    },
    permissionAssigned:{
        id:`${scope}.permissionAssigned`,
        defaultMessage:"All Permission is Assigned"
    },
    defaultPermissions: {
        id: `${scope}.defaultPermissions`,
        defaultMessage:"Default Permissions"
    },
    // assignPermissions: {
    //     id: `${scope}.assignPermissions`,
    //     defaultMessage:"Assign Permissions"
    // },
    errorMsgOne:{
        id:`${scope}.errorMSgOne`,
        defaultMessage:"Permissions can be assigned later as well."
    },
    defaultPermission:{
        id:`${scope}.defaultPermission`,
        defaultMessage:"Default Permission :"
    },
    common:{
        id:`${scope}.common`,
        defaultMessage:"Common"
    }
    
})