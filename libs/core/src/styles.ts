/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:21:56 (GMT+0900)
 */
import { CSS_PROP_MAPPINGS } from './constants';
import { handleMappings } from './utils';
import type {
  BaseProps,
  PropMappings,
  CreatePropStylesOptions,
  OriginalBaseProps,
} from './types';

/**
 * @method createPropStyles<T extends BaseProps>(props, mappings, options)
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
 * @param options? `CreatePropStylesOptions`
 * @returns `Record<string, string>`
 */
export const createPropStyles = <
  Breakpoint extends string = string,
  T extends BaseProps<Breakpoint> = BaseProps<Breakpoint>,
>(
  props: T,
  mappings?: PropMappings<T>,
  options: CreatePropStylesOptions<Breakpoint> = {}
) => {
  // Mappings expect non-breakpoint types
  const _mappings = {
    ...CSS_PROP_MAPPINGS,
    ...mappings,
  } as PropMappings<OriginalBaseProps>;
  const activeBreakpoint = options.breakpoint || 'default';

  // Always flatten props, using breakpoint value if active, or default if available
  const finalProps = ((): OriginalBaseProps => {
    const out = {} as any;
    for (const k of Object.keys(props) as (keyof T)[]) {
      const val = props[k];
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        if (
          activeBreakpoint &&
          Object.prototype.hasOwnProperty.call(val as object, activeBreakpoint)
        ) {
          // 1. If breakpoint is active and value exists for it, use that
          out[k] = (val as any)[activeBreakpoint];
        } else if (
          Object.prototype.hasOwnProperty.call(val as object, 'default')
        ) {
          // 2. Otherwise if there's a default value, use that (even when no breakpoint active)
          out[k] = (val as any)['default'];
        } else {
          // 3. No matching breakpoint/default exists - keep original object
          out[k] = val;
        }
      } else {
        out[k] = val;
      }
    }
    return out;
  })();

  return handleMappings(finalProps, _mappings);
};
