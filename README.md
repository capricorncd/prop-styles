# props-style

Quickly create style properties in Vue or React, or use [createPropStyles](#prop-stylescore) to generate style objects.

see 

- [@prop-styles/react](libs/react)
- [@prop-styles/vue](libs/vue)
- [@prop-styles/core](libs/core)

## @prop-styles/react

<p>
<a href="https://npmcharts.com/compare/@prop-styles/react?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/react.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/v/@prop-styles/react.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/l/@prop-styles/react.svg?sanitize=true" alt="License"></a>
</p>

```bash
npm i @prop-styles/react
```

Used in React, see [@prop-styles/react](libs/react) for details.

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

<p>
<a href="https://npmcharts.com/compare/@prop-styles/vue?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/vue.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@prop-styles/vue"><img src="https://img.shields.io/npm/v/@prop-styles/vue.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@prop-styles/vue"><img src="https://img.shields.io/npm/l/@prop-styles/vue.svg?sanitize=true" alt="License"></a>
</p>

```bash
npm i @prop-styles/vue
```

Used in Vue, see [@prop-styles/vue](libs/vue) for details.

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

<p>
<a href="https://npmcharts.com/compare/@prop-styles/core?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/core.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@prop-styles/core"><img src="https://img.shields.io/npm/v/@prop-styles/core.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@prop-styles/core"><img src="https://img.shields.io/npm/l/@prop-styles/core.svg?sanitize=true" alt="License"></a>
</p>

```bash
npm i @prop-styles/core
```

Create style object directly using static method createPropStyles, see [@prop-styles/core](libs/core) for details.

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
