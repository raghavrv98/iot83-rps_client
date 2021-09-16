/*
 * SchematicView Messages
 *
 * This contains all the text for the SchematicView component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.SchematicView";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the SchematicView component!"
  },
  noDataToDisplay: {
    id: `${scope}.noDataToDisplay`,
    defaultMessage: "No Data To Display"
  }
});
