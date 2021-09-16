/**
 *
 * Asynchronously loads the component for SideNav
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import('./index'));
