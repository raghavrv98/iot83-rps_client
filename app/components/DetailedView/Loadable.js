/**
 *
 * Asynchronously loads the component for DetailedView
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
