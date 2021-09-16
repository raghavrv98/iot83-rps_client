import { defineMessages } from 'react-intl';
export const scope = "app.containers.ManageRolePermission";
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
        defaultMessage:"Add New Role"
    },
    headingEdit:{
        id:`${scope}.headingEdit`,
        defaultMessage:"Edit Permissions"
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
    },
    header: {
      id: `${scope}.header`,
      defaultMessage: "This is the ManageRolePermission container!"
    },
    allAvailableRoles: {
      id: `${scope}.allAvailableRoles`,
      defaultMessage: "All Available Roles"
    },
    identityAccessManagement: {
      id: `${scope}.identityAccessManagement`,
      defaultMessage: "Identity Access Management"
    },
    manageRoles: {
      id: `${scope}.manageRoles`,
      defaultMessage: "Manage Role"
    },
    roleUpdatedSuccess: {
      id: `${scope}.roleUpdatedSuccess`,
      defaultMessage: "Role permissions updated successfully."
    },
    noPermission: {
        id: `${scope}.noPermission`,
        defaultMessage: "There is no Permissions assigned yet...!"
    }
});