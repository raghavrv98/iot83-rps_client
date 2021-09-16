/**
 *
 * Asynchronously loads the component for SchematicView
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
