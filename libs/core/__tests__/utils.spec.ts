import { toCssValue } from '@libs/utils'
import { it, expect, describe } from 'vitest'
import { formatReturn } from '../src'

describe('utils', () => {
  it('formatReturn', () => {
    expect(formatReturn('width', 100, toCssValue(100))).toStrictEqual([
      'width',
      '100px',
    ])
    expect(formatReturn('width', 0)).toStrictEqual(['width', '0'])

    expect(formatReturn('display', true, 'flex')).toStrictEqual([
      'display',
      'flex',
    ])
    expect(formatReturn('display', false, 'flex')).toBeNull()

    expect(formatReturn('key', null)).toBeNull()
    expect(formatReturn('key', null, 'stringValue')).toBeNull()
    expect(formatReturn('key', undefined)).toBeNull()
    expect(formatReturn('key', undefined, 'stringValue')).toBeNull()
    expect(formatReturn('key', false)).toBeNull()
    expect(formatReturn('key', false, 'stringValue')).toBeNull()
    expect(formatReturn('key', '')).toBeNull()
    expect(formatReturn('key', '', 'stringValue')).toBeNull()
  })
})
