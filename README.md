# props-style

usePropStyle in vue or react

see 

- [@prop-styles/react](libs/react)
- [@prop-styles/vue](libs/vue)
- [@prop-styles/core](libs/core)

## @prop-styles/react

```jsx
import { usePropStyles } from '@prop-styles/react'

export default App(props) {
  const { style } = usePropStyles(props)

  return (
    <div style={style}></div>
  )
}
```

```jsx
<App width="100" radius="12 12 0 12" marginTop="20" />
// <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
```

## @prop-styles/vue

```vue
<script>
import { usePropStyles } from '@prop-styles/vue'

export default {
  setup(props) {
    const { style } = usePropStyles(props)

    return {
      style
    }
  }
}
</script>

<template>
  <div :style="{style}"></div>
</template>
```

```vue
<App width="100" radius="12 12 0 12" marginTop="20" />
// <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
```

## @prop-styles/core

```js
import { createPropStyles, formatReturn } from '@prop-styles/core'

const style = createPropStyles({ color: 'red', width: 100 }, {
  color: (value) => value ? ['--color-primary', value] : null
  // or use formatReturn to make null judgment
  // color: (value) => formatReturn('--color-primary', value)
})

// style
// { '--color-primary': 'red', width: '100px' }
```

## License

MIT License © 2024-Present [Capricorncd](https://github.com/capricorncd).
