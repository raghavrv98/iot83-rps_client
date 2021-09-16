/**
 *
 * Asynchronously loads the component for ManageLogs
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
