# @prop-styles/core
<p>
<a href="https://npmcharts.com/compare/@prop-styles/core?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/core.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@prop-styles/core"><img src="https://img.shields.io/npm/v/@prop-styles/core.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@prop-styles/core"><img src="https://img.shields.io/npm/l/@prop-styles/core.svg?sanitize=true" alt="License"></a>
</p>

The library provides a static method [createPropStyles](#createpropstylesprops-mappings) to create Style objects.

```bash
npm i @prop-styles/core
```

Example
```js
import { createPropStyles } from '@prop-styles/core'

const style = createPropStyles({ color: 'red', width: 100 }, {
  color: (value) => ['--color-primary', 'red']
})

// style
// { '--color-primary': 'red', width: '100px' }
```

## Methods

### createPropStyles(props, mappings)

Create Styles Object

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|[BaseProps](#BaseProps)
mappings|`PropMappings`|no|[PropMappings](#PropMappings)

- @generic `T extends BaseProps`

- @returns `Record<string, string>`

## Types

### BaseProps

Prop|Types|Required|Description
:--|:--|:--|:--
style|`any`|no|style
width|`number`/`string`|no|width
minWidth|`number`/`string`|no|-
maxWidth|`number`/`string`|no|-
height|`number`/`string`|no|height
minHeight|`number`/`string`|no|-
maxHeight|`number`/`string`|no|-
flex|`boolean`|no|display
grid|`boolean`|no|-
inlineFlex|`boolean`|no|-
inlineBlock|`boolean`|no|-
inline|`boolean`|no|-
gap|`number`/`string`|no|flex/grid
column|`boolean`|no|-
align|`Property.AlignItems`|no|-
justify|`Property.JustifyContent`|no|-
wrap|`boolean`/`Property.FlexWrap`|no|-
padding|`number`/`string`|no|padding
paddingTop|`number`/`string`|no|-
paddingBottom|`number`/`string`|no|-
paddingLeft|`number`/`string`|no|-
paddingRight|`number`/`string`|no|-
paddingInline|`number`/`string`|no|-
paddingBlock|`number`/`string`|no|-
margin|`number`/`string`|no|margin
marginTop|`number`/`string`|no|-
marginBottom|`number`/`string`|no|-
marginLeft|`number`/`string`|no|-
marginRight|`number`/`string`|no|-
marginInline|`number`/`string`|no|-
marginBlock|`number`/`string`|no|-
radius|`string`/`number`|no|border-radius
fontSize|`string`/`number`|no|font
fs|`string`/`number`|no|fontSize
lineHeight|`string`/`number`|no|-
color|`string`|no|color
background|`Property.Background`|no|-
bg|`Property.Background`|no|background
scroll|`boolean`/`'x'`/`'y'`|no|scroll direction
breakWord|`boolean`|no|text
bold|`boolean`|no|bold of font
thin|`boolean`/`string`|no|thin of font
fontWeight|`Property.FontWeight`|no|-
fw|`Property.FontWeight`|no|fontWeight
border|`string`/`number`|no|border, border-width, border-color

<details>
<summary>Source Code</summary>

```ts
interface BaseProps {
  // style
  style?: any
  // width
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  // height
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  // display
  flex?: boolean
  grid?: boolean
  inlineFlex?: boolean
  inlineBlock?: boolean
  inline?: boolean
  // flex/grid
  gap?: number | string
  column?: boolean
  align?: Property.AlignItems
  justify?: Property.JustifyContent
  wrap?: boolean | Property.FlexWrap
  // padding
  padding?: number | string
  paddingTop?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  paddingRight?: number | string
  paddingInline?: number | string
  paddingBlock?: number | string
  // margin
  margin?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  marginRight?: number | string
  marginInline?: number | string
  marginBlock?: number | string
  // border-radius
  radius?: string | number
  // font
  fontSize?: string | number
  // fontSize
  fs?: string | number
  lineHeight?: string | number
  // color
  color?: string
  background?: Property.Background
  // background
  bg?: Property.Background
  // scroll direction
  scroll?: boolean | 'x' | 'y'
  // text
  breakWord?: boolean
  // bold of font
  bold?: boolean
  // thin of font
  thin?: boolean | string
  fontWeight?: Property.FontWeight
  // fontWeight
  fw?: Property.FontWeight
  // border, border-width, border-color
  border?: string | number
}
```

</details>

### PropMappingHandler

Prop|Types|Required|Description
:--|:--|:--|:--
value|`T[keyof T],`|yes|-
props|`T`|yes|-

<details>
<summary>Source Code</summary>

```ts
type PropMappingHandler<T extends BaseProps> = (
  value: T[keyof T],
  props: T
) => PropMappingHandlerReturn
```

</details>

### PropMappings

Prop|Types|Required|Description
:--|:--|:--|:--
[key: keyof T]|`PropMappingHandler<T>`|yes|-

<details>
<summary>Source Code</summary>

```ts
type PropMappings<T extends BaseProps> = {
  [key: keyof T]: PropMappingHandler<T>
}
```

</details>

## License

MIT License © 2024-Present [Capricorncd](https://github.com/capricorncd).
