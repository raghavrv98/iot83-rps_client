import { defineMessages } from "react-intl";

export const scope = "app.containers.ResetPassword";

export default defineMessages({

    header: {
        id: `${scope}.header`,
        defaultMessage: "This is the ResetPassword container!"
    },
    passwordUpdated: {
        id: `${scope}.passwordUpdated`,
        defaultMessage: "Password Updated Successfully."
    },
    backToLogin: {
        id: `${scope}.backToLogin`,
        defaultMessage: "Back to login"
    },
    resetPassword: {
        id: `${scope}.resetPassword`,
        defaultMessage: "Reset Password"
    },
});