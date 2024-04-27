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
 * ```tsx
 * import { usePropStyles, f, type ReactBaseProps } from '@prop-styles/react'
 *
 * interface Props extends ReactBaseProps {
 *   customProp?: unknown
 * }
 *
 * export default App(props: Props) {
 *   const { style } = usePropStyles(props, {
 *     // Custom prop mapping handler
 *     customProp: (v: Props['customProp]) => f('custom-prop', v, 'default value used when v is null/false')
 *   })
 *
 *   return (
 *     <div style={style}></div>
 *   )
 * }
 * ```
 *
 * ```jsx
 * <App width="100" radius="12 12 0 12" marginTop="20" />
 * // <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
 * ```
 */
import { createPropStyles } from '@prop-styles/core'
import { useMemo, type ReactNode } from 'react'
import type { BaseProps, PropMappings } from '@prop-styles/core'

export * from '@prop-styles/core'

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
 * @sort 1
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
