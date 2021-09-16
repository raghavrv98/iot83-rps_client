import { DEFAULT_ACTION, GET_MENUS, GET_ALL_MENUS, SAVE_MENUS } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function getMenus(id) {
  return {
    type: GET_MENUS,
    id
  };
}

export function getAllMenus() {
  return {
    type: GET_ALL_MENUS,
  };
}

export function saveMenu(payload,id) {
  return {
    type: SAVE_MENUS,
    payload,
    id
  };
}
