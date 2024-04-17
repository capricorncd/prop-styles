/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import {
  toSnakeCase,
  toCssValue,
  isNumberLike,
  isColorLike,
  isNullOrUndefined,
} from '@libs/utils'
import type {
  PropMappingHandlerReturn,
  PropMappingHandler,
  PropMappings,
  BaseProps,
} from './types.d'

export function format<K extends string, V>(
  key: K,
  value: V,
  str?: string
): PropMappingHandlerReturn {
  return isNullOrUndefined(value) || value === false
    ? null
    : [key, str ?? (value as string)]
}

function generateStyleMapping<T extends BaseProps>(
  keys: string[],
  handler: (prop: string, value: any) => PropMappingHandlerReturn
): PropMappings<T> {
  return keys.reduce((prev, prop) => {
    // @ts-ignore
    prev[prop] = (value: any) => handler(prop, value)
    return prev
  }, {} as PropMappings<T>)
}

export function display(keys: string[]) {
  return generateStyleMapping(keys, (prop, value?: boolean) =>
    format('display', value, toSnakeCase(prop))
  )
}

export function numerical(keys: string[]) {
  return generateStyleMapping(keys, (prop, value?: number | string) =>
    format(prop, value, toCssValue(value))
  )
}

export function changeless(keys: string[]) {
  return generateStyleMapping(keys, (prop, value: string) => [prop, value])
}

const cssNumericalValueReg = /^-?\d+(\.\d+)?[a-z]+$/i

function isCssNumericalValue(val: unknown) {
  return typeof val === 'string' && cssNumericalValueReg.test(val)
}

export function border(value: unknown): PropMappingHandlerReturn {
  if (isNullOrUndefined(value)) return null
  if (isNumberLike(value) || isCssNumericalValue(value))
    return ['borderWidth', toCssValue(value)]
  if (isColorLike(value)) return ['borderColor', value]
  return ['border', String(value)]
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
