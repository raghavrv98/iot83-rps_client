/**
 *
 * Asynchronously loads the component for AddOrEditMapping
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
