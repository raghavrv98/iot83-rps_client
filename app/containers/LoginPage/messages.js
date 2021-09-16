import {defineMessages} from 'react-intl';

export const scope = "app.containers.LoginPage";

export default defineMessages({
    login:{
        id: `${scope}.login`,
        defaultMessage:"Login",
    },
    mailSentMessage:{
        id: `${scope}.mailSentMessage`,
        defaultMessage:"Reset password request has been generated. Please contact administrator",
    },
    mailSubmitMessage:{
        id: `${scope}.mailSubmitMessage`,
        defaultMessage:"Enter the Email address associated with this Account and Please contact administrator for further action.",
    },
    signIn:{
        id: `${scope}.signIn`,
        defaultMessage:"Sign-In As",
    },
    resetPass:{
        id: `${scope}.resetPass`,
        defaultMessage:"Reset Password",
    },
    backLogin:{
        id: `${scope}.backLogin`,
        defaultMessage:"Back To Login",
    },
    authOLogin:{
        id: `${scope}.authOLogin`,
        defaultMessage:"Login With AuthO",
    },
    or:{
        id: `${scope}.or`,
        defaultMessage:"OR",
    }
})