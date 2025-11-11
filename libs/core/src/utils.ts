/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import {
  toCssValue,
  isNumberLike,
  isColorLike,
  toColorValue,
} from '@libs/utils';
import type {
  PropMappingHandler,
  PropMappings,
  OriginalBaseProps,
  PropMappingHandlerReturn,
} from './types.d';

/**
 * @method transform(key, value, strValue)
 *
 * Helper for creating PropMappingHandler functions. Handles common value transformations
 * and null/empty value filtering.
 *
 * @param key `string` - The CSS property name or custom key for the style
 * @param value `any` - The value to transform (from props[propName])
 * @param strValue? `string` - Optional override for the output value string
 * @returns `PropMappingHandlerReturn` Object with key and transformed value, or null if value should be skipped
 *
 * When to use:
 * - Basic prop-to-style mapping with null/empty filtering
 * - Value type conversion (number to px, etc)
 * - Custom key mapping with value preprocessing
 *
 * @example
 * ```js
 * // Basic usage
 * transform('width', 100) // { key: 'width', value: '100px' }
 * transform('width', '100px') // { key: 'width', value: '100px' }
 *
 * // With custom output value
 * transform('width', 100, '100%') // { key: 'width', value: '100%' }
 *
 * // Null/empty handling
 * transform('key', false) // null
 * transform('key', '') // null
 * transform('key', undefined) // null
 * transform('key', null) // null
 *
 * // Boolean to string value
 * transform('key', true, 'value') // { key: 'key', value: 'value' }
 * ```
 */
export const transform = (
  key: string,
  value: any,
  strValue?: string
): PropMappingHandlerReturn => {
  if (!value && value !== 0) return null;
  return { key, value: toColorValue(strValue ?? String(value)) };
};

/**
 * handleMappings
 *
 * Core function that processes props using provided mapping handlers to generate
 * a style object. Each prop is passed through its corresponding handler if one exists.
 *
 * @param props - The props object to process (already flattened if responsive)
 * @param mappings - Object mapping prop names to their handler functions
 * @returns Record of CSS property names to their computed values
 *
 * @example
 * ```js
 * const props = { width: 100, color: '#fff' };
 * const mappings = {
 *   width: v => transform('width', v),
 *   color: v => transform('color', v)
 * };
 * handleMappings(props, mappings);
 * // { width: '100px', color: '#fff' }
 * ```
 */
export const handleMappings = <T extends OriginalBaseProps>(
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

/**
 * border
 *
 * Smart border property handler that can process different value types:
 * - Numbers/numeric strings -> borderWidth
 * - Color values -> borderColor
 * - Other values -> border
 *
 * @param value - The border value to process
 * @param position - Optional position suffix (Top/Right/Bottom/Left)
 * @returns Processed border style entry or null
 *
 * @example
 * ```js
 * border(1) // { key: 'borderWidth', value: '1px' }
 * border('1px solid') // { key: 'border', value: '1px solid' }
 * border('#fff') // { key: 'borderColor', value: '#fff' }
 * border(1, 'Top') // { key: 'borderTopWidth', value: '1px' }
 * ```
 */
export const border = (
  value: unknown,
  position?: 'Top' | 'Right' | 'Bottom' | 'Left'
) => {
  const borderPosition = position ? `border${position}` : 'border';
  if (isNumberLike(value) || isCssNumericalValueLike(value)) {
    return { key: `${borderPosition}Width`, value: toCssValue(value) };
  }
  if (isColorLike(value)) return { key: `${borderPosition}Color`, value };
  return transform(borderPosition, value);
};
