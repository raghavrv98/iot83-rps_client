/**
 *
 * Asynchronously loads the component for AddOrEditUser
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
