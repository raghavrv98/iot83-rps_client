/**
 *
 * Asynchronously loads the component for ManageAgents
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
