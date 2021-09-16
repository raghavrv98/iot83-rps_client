/**
 *
 * Asynchronously loads the component for AddOrEditAgent
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
