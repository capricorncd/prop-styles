/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:21:56 (GMT+0900)
 */
import { CSS_PROP_MAPPINGS } from './constants'
import { handleMappings } from './utils'
import type { BaseProps, PropMappings } from './types'

/**
 * @method createPropStyles<T extends BaseProps>(props, mappings)
 *
 * Create Styles Object
 *
 * Example
 *
 * ```js
 * import { createPropStyles, f } from '@prop-styles/core'
 *
 * const props = { width: 100, color: '#fff' }
 *
 * createPropStyles(props) // { width: '100px', color, '#fff' }
 *
 * // Use custom Mapping handler
 * createPropStyles(props, {
 *   // custom mapping handler
 *   color: (v) => ['--color', v]
 * }) // { width: '100px', '--color', '#fff' }
 *
 * // Use f function to remove null/undefined props
 * createPropStyles(props, {
 *   color: (v) => f('--color', v)
 * }) // { width: '100px', '--color', '#fff' }
 * ```
 *
 * @param props `T` [BaseProps](#BaseProps)
 * @param mappings? `PropMappings<T>` [PropMappings](#PropMappings)
 * @returns `Record<string, string>`
 */
export function createPropStyles<T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
) {
  const styles: Record<string, string> = {
    ...props.style,
  }
  const _mappings = {
    ...CSS_PROP_MAPPINGS,
    ...mappings,
  }
  handleMappings(props, _mappings, styles)
  return styles
}
