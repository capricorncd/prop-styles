/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:27:22 (GMT+0900)
 */
export * from '@zx-libs/utils';

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

const COLOR_VALUE_REG =
  /^(#[a-f0-9]{3,8}|(rgba?|hsla?|hwb|lab|lch|oklab|oklch|hwb|lch|light-dark)\(.+\))$/i;

export function isColorLike(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return COLOR_VALUE_REG.test(value);
}
