/*
 *
 * ManageBranding actions
 *
 */
import { DEFAULT_ACTION, UPLOAD_LOGO_REQUEST, UPLOAD_THEME_REQUEST, UPLOAD_RESET_STATE } from "./constants";


export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}
export function uploadLogo(filePayload,url){
  return{
    type: UPLOAD_LOGO_REQUEST,
    filePayload,
    url
  }
}

export function uploadTheme(themePayload,themeId){
  return{
    type: UPLOAD_THEME_REQUEST,
    themePayload,
    themeId
  }
}

export function resetUploadState(){
  return{
    type: UPLOAD_RESET_STATE
  }
}
