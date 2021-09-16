import {defineMessages} from 'react-intl';

export const scope = "app.containers.ManageTenants";

export default defineMessages({
    title:{
        id: `${scope}.title`,
        defaultMessage: "All Available Tenants"
    },
    tenantDeleteSuccessMessage:{
        id: `${scope}.tenantDeleteSuccessMessage`,
        defaultMessage: "Tenant Deleted Successfully."
    },
    confirmDeleteMessage:{
        id: `${scope}.confirmDeleteMessage`,
        defaultMessage: "Deleting Tenant will delete all the data for this customer and it won't be recovered. Do you want to delete?"
    },
})