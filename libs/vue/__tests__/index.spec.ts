import { mount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import App from './App.vue'

describe('vue usePropStyles', () => {
  test('width and height', () => {
    const wrapper = mount(App, {
      props: {
        width: 200,
        minWidth: '150',
        maxWidth: 500,
        height: 100,
        minHeight: 90,
        maxHeight: '50vh',
      },
    })
    expect(wrapper.text()).toBe('Hello world')
    expect(wrapper.attributes('style')).toBe(
      'width: 200px; min-width: 150px; max-width: 500px; height: 100px; min-height: 90px; max-height: 50vh;'
    )
  })

  test('padding', () => {
    const wrapper = mount(App, {
      props: {
        padding: 10,
        paddingTop: '10em',
        paddingBottom: 10,
        paddingLeft: '10em',
        paddingRight: 10,
        paddingInline: '10em',
        paddingBlock: 10,
      },
    })

    expect(wrapper.attributes('style')).toBe(
      'padding: 10em 10px 10px 10em; padding-inline: 10em; padding-block: 10px;'
    )
  })
})
