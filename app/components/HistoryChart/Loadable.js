/**
 *
 * Asynchronously loads the component for HistoryChart
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
