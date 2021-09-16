/**
 * Asynchronously loads the component for Dashboard
 */
import loadable from '@loadable/component';

export default loadable(() => import('./index'));