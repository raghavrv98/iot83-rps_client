/**
 *
 * Asynchronously loads the component for PipelineHealth
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
