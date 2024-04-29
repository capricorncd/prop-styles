/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import { toSnakeCase, toCssValue, isNumberLike, isColorLike } from '@libs/utils'
import type {
  PropMappingHandlerReturn,
  PropMappingHandler,
  PropMappings,
  BaseProps,
} from './types.d'

/**
 * @method formatReturn<K extends string, V>(key, value, strValue)
 *
 * Used for [PropMappingHandler](#PropMappingHandler) processing. When `value` is `null/undefined/''/false`, return null, otherwise return the specified value.
 *
 * Example
 *
 * ```js
 * f('width', 100) // ['width', '100']
 * f('width', '100px') // ['width', '100px']
 * f('width', 100, '100%') // ['width', '100%']
 *
 * f('key', false) // null
 * f('key', '') // null
 * f('key', undefined) // null
 * f('key', null) // null
 * f('key', null, 'stringValue') // null
 * f('key', true, 'stringValue') // ['key', 'stringValue']
 * ```
 *
 * @param key `K` The PropMappingHandler Return `key` or customize `key`
 * @param value `V` The `props[prop]'s value`
 * @param strValue? `string` Customize the `value` of PropMappingHandler Return
 * @returns `[key: string, val: string] | null`
 */
export function formatReturn<K extends string, V>(
  key: K,
  value: V,
  strValue?: string
): [key: string, val: string] | null {
  return !value && value !== 0 ? null : [key, strValue ?? String(value)]
}

/**
 * @method f<K extends string, V>(key, value, strValue)
 *
 * Alias and abbreviation of [formatReturn](#formatreturnkey-value-strvalue).
 *
 * @param key `K` The PropMappingHandler Return `key` or customize `key`
 * @param value `V` The `props[prop]'s value`
 * @param strValue? `string` Customize the `value` of PropMappingHandler Return
 * @returns `[key: string, val: string] | null`
 */
export const f = formatReturn

function generatePropMappings(
  keys: string[],
  handler: (prop: string, value: any) => PropMappingHandlerReturn,
  mappings: PropMappings<BaseProps>
) {
  keys.forEach((prop) => {
    // @ts-ignore
    mappings[prop] = (value: any) => handler(prop, value)
  })
}

export function display(keys: string[], mappings: PropMappings<BaseProps>) {
  return generatePropMappings(
    keys,
    (prop, value?: boolean) => f('display', value, toSnakeCase(prop)),
    mappings
  )
}

export function numerical(keys: string[], mappings: PropMappings<BaseProps>) {
  return generatePropMappings(
    keys,
    (prop, value?: number | string) => f(prop, value, toCssValue(value)),
    mappings
  )
}

export function changeless(keys: string[], mappings: PropMappings<BaseProps>) {
  return generatePropMappings(
    keys,
    (prop, value: string) => f(prop, value),
    mappings
  )
}

const REG_CSS_NUMERICAL_VALUE = /^-?\d+(\.\d+)?[a-z]+$/i

function isCssNumericalValueLike(val: unknown) {
  return typeof val === 'string' && REG_CSS_NUMERICAL_VALUE.test(val)
}

export function border(value: unknown): [key: string, val: string] | null {
  if (isNumberLike(value) || isCssNumericalValueLike(value))
    return ['borderWidth', toCssValue(value)]
  if (isColorLike(value)) return ['borderColor', value]
  return f('border', value)
}

export function handleMappings<T extends BaseProps>(
  props: T,
  mappings: PropMappings<T>,
  target: any
) {
  let mappingHandler: PropMappingHandler<T>
  for (const prop of Object.keys(props)) {
    // @ts-ignore
    mappingHandler = mappings[prop]
    if (mappingHandler) {
      const result = mappingHandler(props[prop as keyof T], props)
      if (result) {
        const [key, value] = result
        target[key] = value
      }
    }
  }
}
