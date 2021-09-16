/*
 * ManagePipeLineLandmark Messages
 *
 * This contains all the text for the ManagePipeLineLandmark container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ManagePipeLineLandmark";

export default defineMessages({
  
  title:{
    id:`${scope}.title`,
    defaultMessage:"All Available Landmarks"
},

landmarkDeleteSuccess:{
    id:`${scope}.landmarkDeleteSuccess`,
    defaultMessage:"Landmark Deleted Successfully."
},
confirmDelateMessage:{
    id:`${scope}.confirmDelateMessage`,
    defaultMessage: "Are you sure to delete this landmark?"
},
name:{
  id:`${scope}.name`,
  defaultMessage:"Name"
},
chain:{
  id:`${scope}.chain`,
  defaultMessage:"Chain"
},
x:{
  id:`${scope}.x`,
  defaultMessage:"X"
},
y:{
  id:`${scope}.y`,
  defaultMessage:"Y"
},
});
