/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:45 (GMT+0900)
 *
 * @document @prop-styles/react
 *
 * ```js
 * import { usePropStyles } from '@prop-styles/react'
 *
 * export default App(props) {
 *   const { style } = usePropStyles(props)
 *
 *   return (
 *     <div style={style}></div>
 *   )
 * }
 * ```
 */
import { createPropStyles } from '@libs/style'
import { useMemo } from 'react'
import type { BaseProps, PropMappings } from '@libs/style'

export * from '@libs/style'

/**
 * @method usePropStyles(props, mappings)
 *
 * Convert component properties to Style key-value pair objects
 *
 * @param props `T` Component properties
 * @param mappings? `PropMappings<T>` [PropMappings](#PropMappings)
 * @returns `{style: {[key: string]: string}}`
 */
export function usePropStyles<T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
) {
  const style = useMemo(() => createPropStyles(props, mappings), [props])
  return {
    style,
  }
}
