import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the homePage state domain
 */

export const selectHomePageDomain = state => state.get("homePage", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

// const makeSelectHomePage = () =>
//   createSelector(selectHomePageDomain, substate => substate.toJS());

export const navSuccess = () => createSelector(selectHomePageDomain, substate => substate.get('navSuccess'));
export const navFailure = () => createSelector(selectHomePageDomain, substate => substate.get('navFailure'));

export const versionSuccess = () => createSelector(selectHomePageDomain, substate => substate.get('versionSuccess'));
export const versionFailure = () => createSelector(selectHomePageDomain, substate => substate.get('versionFailure'));