/**
 *
 * Asynchronously loads the component for Tooltip
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
