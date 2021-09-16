/*
 * AddOrEditPlant Messages
 *
 * This contains all the text for the AddOrEditPlant container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditPlant";

export default defineMessages({
  editPlant: {
    id: `${scope}.editPlant`,
    defaultMessage: "Edit Plant"
  },
  createPlant: {
    id: `${scope}.createPlant`,
    defaultMessage: "Create Plant"
  },
  updatePlant: {
    id: `${scope}.updatePlant`,
    defaultMessage: "Edit Plant"
  },
  formOwnerPhone: {
    id: `${scope}.formOwnerPhone`,
    defaultMessage: "Owner Phone"
  },
  plantUpdateMessage: {
    id: `${scope}.plantUpdateMessage`,
    defaultMessage: "Plant Updated Successfully."
  },
  plantCreateMessage: {
    id: `${scope}.plantCreateMessage`,
    defaultMessage: "Plant Created Successfully."
  },
  plantImage: {
    id: `${scope}.plantImage`,
    defaultMessage: "Plant Image"
  },
});
