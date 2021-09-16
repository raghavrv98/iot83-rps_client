/**
 *
 * Asynchronously loads the component for ModalLoader
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
