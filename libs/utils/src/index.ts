/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:27:22 (GMT+0900)
 */
export * from '@zx-libs/utils';

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

const COLOR_VALUE_REG =
  /^(#[a-f0-9]{3,8}|(rgba?|hsla?|hwb|lab|lch|oklab|oklch|hwb|lch|light-dark)\(.+\))$/i;

const CSS_VAR_REG = /^--\w+(-\w+)*$/;
const HAS_CSS_VAR_REG = /(\s)*--\w+(-\w+)*/;

export const isColorLike = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  return COLOR_VALUE_REG.test(value);
};

export const toColorValue = (value?: string) => {
  if (!value) return '';
  return HAS_CSS_VAR_REG.test(value)
    ? value
        .split(/\s+/g)
        .map((v) => {
          return CSS_VAR_REG.test(v) ? `var(${v})` : v;
        })
        .join(' ')
    : value;
};
