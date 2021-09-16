/*
 * ManageBranding Messages
 *
 * This contains all the text for the ManageBranding container.
 */
import { defineMessages } from "react-intl";

export const scope = "app.containers.ManageBranding";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Manage Branding"
  },
  button: {
    id: `${scope}.button`,
    defaultMessage: `upload`
  },

  manageLogo: {
    id: `${scope}.manageLogo`,
    defaultMessage: `Manage Logo`
  },

  manageTheme: {
    id: `${scope}.manageTheme`,
    defaultMessage: `Manage Theme`
  },

  resetToDefault: {
    id: `${scope}.resetToDefault`,
    defaultMessage: `Reset To Default`
  },

  theme: {
    id: `${scope}.theme`,
    defaultMessage: `theme.css`
  },
  managePipelineComponentIcon: {
    id: `${scope}.managePipelineComponentIcon`,
    defaultMessage: `Manage Pipeline Component Icon`
  },

  iconName: {
    id: `${scope}.iconName`,
    defaultMessage: `Icon Name`
  },
  changeIcon: {
    id: `${scope}.changeIcon`,
    defaultMessage: `Change Icon`
  },
  uploadIcon: {
    id: `${scope}.uploadIcon`,
    defaultMessage: `Upload Icon`
  },
});
