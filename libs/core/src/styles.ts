/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:21:56 (GMT+0900)
 */
import { CSS_PROP_MAPPINGS } from './constants';
import { handleMappings } from './utils';
import type { BaseProps, PropMappings } from './types';

/**
 * @method createPropStyles<T extends BaseProps>(props, mappings)
 *
 * Create Styles Object
 *
 * Example
 *
 * ```js
 * import { createPropStyles, transform } from '@prop-styles/core'
 *
 * const props = { width: 100, color: '#fff' }
 *
 * createPropStyles(props) // { width: '100px', color, '#fff' }
 *
 * // Use custom Mapping handler
 * createPropStyles(props, {
 *   // custom mapping handler
 *   color: (v) => { key: '--color', value: v }
 * }) // { width: '100px', '--color', '#fff' }
 *
 * // Use transform function to remove null/undefined props
 * createPropStyles(props, {
 *   color: (v) => transform('--color', v)
 * }) // { width: '100px', '--color', '#fff' }
 * ```
 *
 * @param props `T` [BaseProps](#BaseProps)
 * @param mappings? `PropMappings<T>` [PropMappings](#PropMappings)
 * @returns `Record<string, string>`
 */
export const createPropStyles = <T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
) => {
  const _mappings = {
    ...CSS_PROP_MAPPINGS,
    ...mappings,
  } as PropMappings<T>;
  return handleMappings(props, _mappings);
};
