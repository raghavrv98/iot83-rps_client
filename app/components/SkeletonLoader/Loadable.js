/**
 *
 * Asynchronously loads the component for SkeletonLoader
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
