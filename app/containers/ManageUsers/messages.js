import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ManageUsers';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'All Available Users',
  },
  colGroup: {
    id: `${scope}.colGroup`,
    defaultMessage: 'Group',
  },
  userDeleteSuccessMessage: {
    id: `${scope}.userDeleteSuccessMessage`,
    defaultMessage: "User Deleted Successfully.",
  },
  confirmDeleteMessage: {
    id: `${scope}.confirmDeleteMessage`,
    defaultMessage: "Are you sure to delete this user?",
  },
});