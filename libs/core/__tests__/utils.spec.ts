import { toCssValue } from '@libs/utils';
import { it, expect, describe } from 'vitest';
import { transform } from '../src';

describe('utils', () => {
  it('transform', () => {
    expect(transform('width', 100, toCssValue(100))).toStrictEqual({
      key: 'width',
      value: '100px',
    });
    expect(transform('width', 0)).toStrictEqual({ key: 'width', value: '0' });
    expect(transform('display', true, 'flex')).toStrictEqual({
      key: 'display',
      value: 'flex',
    });

    expect(transform('display', false, 'flex')).toBeNull();
    expect(transform('key', null)).toBeNull();
    expect(transform('key', null, 'stringValue')).toBeNull();
    expect(transform('key', undefined)).toBeNull();
    expect(transform('key', undefined, 'stringValue')).toBeNull();
    expect(transform('key', false)).toBeNull();
    expect(transform('key', false, 'stringValue')).toBeNull();
    expect(transform('key', '')).toBeNull();
    expect(transform('key', '', 'stringValue')).toBeNull();
  });
});
