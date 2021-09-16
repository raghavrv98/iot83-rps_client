/*
 * Tooltip Messages
 *
 * This contains all the text for the Tooltip component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.Tooltip";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Tooltip component!"
  }
});
