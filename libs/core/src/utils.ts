/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import { toCssValue, isNumberLike, isColorLike } from '@libs/utils';
import type {
  PropMappingHandler,
  PropMappings,
  BaseProps,
  PropMappingHandlerReturn,
} from './types.d';

/**
 * @method transform(key, value, strValue)
 *
 * Used for [PropMappingHandler](#PropMappingHandler) processing. When `value` is `null/undefined/''/false`, return null, otherwise return the specified value.
 *
 * Example
 *
 * ```js
 * transform('width', 100) // { key: 'width', value: '100' }
 * transform('width', '100px') // { key: 'width', value: '100px' }
 * transform('width', 100, '100%') // { key: 'width', value: '100%' }
 *
 * transform('key', false) // null
 * transform('key', '') // null
 * transform('key', undefined) // null
 * transform('key', null) // null
 * transform('key', null, 'stringValue') // null
 * transform('key', true, 'stringValue') // { key: 'key', value: 'stringValue' }
 * ```
 *
 * @param key `string` The PropMappingHandler Return `key` or customize `key`
 * @param value `any` The `props[prop]'s value`
 * @param strValue? `string` Customize the `value` of PropMappingHandler Return
 * @returns `{ key: string, value: string } | null`
 */
export const transform = (
  key: string,
  value: any,
  strValue?: string
): PropMappingHandlerReturn => {
  if (!value && value !== 0) return null;
  return { key, value: strValue ?? String(value) };
};

export const handleMappings = <T extends BaseProps>(
  props: T,
  mappings: PropMappings<T>
) => {
  const style: Record<string, string> = {};
  let mappingHandler: PropMappingHandler<T> | undefined;
  for (const prop of Object.keys(props)) {
    mappingHandler = mappings[prop as keyof T];
    if (!mappingHandler) continue;
    const result = mappingHandler(props[prop as keyof T], props);
    if (!result) continue;
    if (Array.isArray(result)) {
      result.forEach((v) => {
        if (v) style[v.key] = v.value;
      });
    } else {
      const { key, value } = result;
      style[key] = value;
    }
  }
  return style;
};

const REG_CSS_NUMERICAL_VALUE = /^-?\d+(\.\d+)?[a-z]+$/i;

const isCssNumericalValueLike = (val: unknown) => {
  return typeof val === 'string' && REG_CSS_NUMERICAL_VALUE.test(val);
};

export const border = (value: unknown) => {
  if (isNumberLike(value) || isCssNumericalValueLike(value)) {
    return { key: 'borderWidth', value: toCssValue(value) };
  }
  if (isColorLike(value)) return { key: 'borderColor', value };
  return transform('border', value);
};
