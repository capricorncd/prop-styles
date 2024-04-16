/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:45 (GMT+0900)
 *
 * @document @prop-styles/react
 *
 * <p>
 * <a href="https://npmcharts.com/compare/@prop-styles/react?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/react.svg?sanitize=true" alt="Downloads"></a>
 * <a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/v/@prop-styles/react.svg?sanitize=true" alt="Version"></a>
 * <a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/l/@prop-styles/react.svg?sanitize=true" alt="License"></a>
 * </p>
 *
 * Process CSS-related properties in Props so that they can generate the element style.
 *
 * ```bash
 * npm i @prop-styles/react
 * ```
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
 *
 * <App width="100" radius="12 12 0 12" marginTop="20" />
 * // <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
 * ```
 */
import { createPropStyles } from '@libs/style'
import { useMemo, type ReactNode } from 'react'
import type { BaseProps, PropMappings } from '@libs/style'

/**
 * @type ReactBaseProps
 */
export interface ReactBaseProps extends BaseProps {
  className?: string
  children?: ReactNode
  onClick?: (event: Event) => void
}

/**
 * @method usePropStyles<T extends BaseProps>(props, mappings)
 *
 * Convert component properties to Style key-value pair objects
 *
 * @param props `T` Component properties
 * @param mappings? `PropMappings<T>` [PropMappings](#PropMappings)
 * @returns `UsePropStylesReturn`
 */
export function usePropStyles<T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
): UsePropStylesReturn {
  const style = useMemo(() => createPropStyles(props, mappings), [props])
  return {
    style,
  }
}

/**
 * @type UsePropStylesReturn
 */
export interface UsePropStylesReturn {
  style: { [key: string]: string }
}
