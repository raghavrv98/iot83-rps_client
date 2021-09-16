/*
 * Contact Messages
 *
 * This contains all the text for the Contact component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.Contact";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Contact component!"
  },
  contactNumber: {
    id: `${scope}.contactNumber`,
    defaultMessage: "Contact number",
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: "Phone",
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: "Address",
  },
  sendUsMessage: {
    id: `${scope}.sendUsMessage`,
    defaultMessage: "Send Us Message",
  },
  howCanWeHelp: {
    id: `${scope}.howCanWeHelp`,
    defaultMessage: "How Can We Help ?",
  },
  letUsKnowHowWeCanHelp: {
    id: `${scope}.letUsKnowHowWeCanHelp`,
    defaultMessage: "Let us know how we can help",
  },
});
