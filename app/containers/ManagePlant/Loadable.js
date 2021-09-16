/**
 *
 * Asynchronously loads the component for ManagePlant
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
