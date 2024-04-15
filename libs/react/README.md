# @prop-styles/react

Process CSS-related properties in Props so that they can generate the element style.

```bash
npm i @prop-styles/react
```

```js
import { usePropStyles } from '@prop-styles/react'

export default App(props) {
  const { style } = usePropStyles(props)

  return (
    <div style={style}></div>
  )
}

<App width="100" radius="12 12 0 12" marginTop="20" />
// <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
```

## Methods

### usePropStyles(props, mappings)

Convert component properties to Style key-value pair objects

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|Component properties
mappings|`PropMappings<T>`|no|[PropMappings](#PropMappings)

- @generic `T extends BaseProps`

- @returns `UsePropStylesReturn`

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
lineHeight|`string`/`number`|no|-
color|`string`|no|color
background|`string`|no|-
scroll|`boolean`/`'x'`/`'y'`|no|scroll direction
breakWord|`boolean`|no|text
bold|`boolean`|no|bold of font
thin|`boolean`|no|thin of font
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
  lineHeight?: string | number
  // color
  color?: string
  background?: string
  // scroll direction
  scroll?: boolean | 'x' | 'y'
  // text
  breakWord?: boolean
  // bold of font
  bold?: boolean
  // thin of font
  thin?: boolean
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

### UsePropStylesReturn

Prop|Types|Required|Description
:--|:--|:--|:--
style|`{ [key: string]: string }`|yes|-

<details>
<summary>Source Code</summary>

```ts
interface UsePropStylesReturn {
  style: { [key: string]: string }
}
```

</details>
