/**
 *
 * Asynchronously loads the component for HelpPage
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
