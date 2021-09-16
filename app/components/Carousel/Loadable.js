/**
 *
 * Asynchronously loads the component for Carousel
 *
 */

import loadable from "@loadable/component";

export default loadable(() => import("./index"));
