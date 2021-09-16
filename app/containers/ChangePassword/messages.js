/*
 * AddOrEditPlant Messages
 *
 * This contains all the text for the AddOrEditPlant container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditPlant";

export default defineMessages({
  createNewPassword: {
    id: `${scope}.createNewPassword`,
    defaultMessage: "Create New Password"
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: "Change Password"
  },
  changePasswordNote: {
    id: `${scope}.changePasswordNote`,
    defaultMessage: "Note: Password should be at least 5 characters long."
  },
  existingPassword: {
    id: `${scope}.existingPassword`,
    defaultMessage: "Existing Password"
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: "New Password"
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: "Confirm Password"
  },
  passwordMatchingError: {
    id: `${scope}.passwordMatchingError`,
    defaultMessage: "Oops ! Both password should be same."
  },
  changePasswordMessage: {
    id: `${scope}.changePasswordMessage`,
    defaultMessage: "Password changed successfully."
  },
});
