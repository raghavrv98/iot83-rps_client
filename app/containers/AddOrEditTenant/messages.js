/*
 * AddOrEditTenant Messages
 *
 * This contains all the text for the AddOrEditTenant container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.AddOrEditTenant";

export default defineMessages({
  editTenant: {
    id: `${scope}.editTenant`,
    defaultMessage: "Edit Tenant"
  },
  addTenant: {
    id: `${scope}.addTenant`,
    defaultMessage: "Create Tenant"
  },
  tenantUpdateMessage: {
    id: `${scope}.tenantUpdateMessage`,
    defaultMessage: "Tenant Updated Successfully."
  },
  tenantCreateMessage: {
    id: `${scope}.tenantCreateMessage`,
    defaultMessage: "Tenant Created Successfully."
  },
  updateTenant: {
    id: `${scope}.updateTenant`,
    defaultMessage: "Edit Tenant"
  },
  createTenant: {
    id: `${scope}.createTenant`,
    defaultMessage: "Create Tenant"
  },
});
