/**
 *
 * Asynchronously loads the component for Loader
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
