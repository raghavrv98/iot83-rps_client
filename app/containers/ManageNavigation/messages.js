import {defineMessages} from 'react-intl';

export const scope = "app.containers.ManageNavigation";

export default defineMessages({
    title: {
        id: `${scope}.title`,
        defaultMessage: "All Available Navigations"
    },
    titleManageNav: {
        id: `${scope}.titleManageNav`,
        defaultMessage: "Manage Navigations"
    },
    child: {
        id: `${scope}.child`,
        defaultMessage: "Child"
    },
    parent: {
        id: `${scope}.parent`,
        defaultMessage: "Parent"
    },
    tabletype: {
        id: `${scope}.tabletype`,
        defaultMessage: "Menu Item Type"
    },
    tableDrag: {
        id: `${scope}.tableDrag`,
        defaultMessage: "Drag Item"
    },  
    menuSave:{
        id: `${scope}.menuSave`,
        defaultMessage: "Navigation menu save successfully"
    },
})