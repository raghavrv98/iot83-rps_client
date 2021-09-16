import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AddOrEditUser';

export default defineMessages({
    title:{
        id:`${scope}.title`,
        defaultMessage:"Manage Users"
    },
    titleCreateUser:{
        id:`${scope}.titleCreateUser`,
        defaultMessage:"Create User"
    },
    headingAdd:{
        id:`${scope}.headingAdd`,
        defaultMessage:"Create User"
    },
    headingEdit:{
        id:`${scope}.headingEdit`,
        defaultMessage:"Edit User"
    },
    formName:{
        id:`${scope}.formName`,
        defaultMessage:"First Name"
    },
    formLastName:{
        id:`${scope}.formLastName`,
        defaultMessage:"Last Name"
    },
    formMobile:{
        id:`${scope}.formMobile`,
        defaultMessage:"Mobile"
    },
    fromEmail:{
        id:`${scope}.fromEmail`,
        defaultMessage:"Email"
    },
    formTitle:{
        id:`${scope}.formTitle`,
        defaultMessage:"Title"
    },
    formRole:{
        id:`${scope}.formRole`,
        defaultMessage:"Assign Role"
    },
    formGroup:{
        id:`${scope}.formGroup`,
        defaultMessage:"Assign Group"
    },
    buttonSave:{
        id:`${scope}.buttonSave`,
        defaultMessage:"Save User"
    },
    addSuccessMessage:{
        id:`${scope}.addSuccessMessage`,
        defaultMessage:"User added successfully."
    },
    updateSuccessMessage:{
        id:`${scope}.updateSuccessMessage`,
        defaultMessage:"User updated successfully."
    },
})