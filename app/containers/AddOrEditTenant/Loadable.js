/**
 *
 * Asynchronously loads the component for AddOrEditTenant
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
