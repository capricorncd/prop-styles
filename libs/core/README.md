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
import { createPropStyles, formatReturn } from '@prop-styles/core'

const style = createPropStyles({ color: 'red', width: 100 }, {
  color: (value) => value ? ['--color-primary', value] : null
  // or use formatReturn to make null judgment
  // color: (value) => formatReturn('--color-primary', value)
})

// style
// { '--color-primary': 'red', width: '100px' }
```

## Methods

### createPropStyles(props, mappings)

Create Styles Object

Example

```js
const props = { width: 100, color: '#fff' }

createPropStyles(props, {
  // custom mapping handler
  color: (v) => ['--color', v]
}) // { width: '100px', '--color', '#fff' }
```

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|[BaseProps](#BaseProps)
mappings|`PropMappings`|no|[PropMappings](#PropMappings)

- @generic `T extends BaseProps`

- @returns `Record<string, string>`

### formatReturn(key, value, strValue)

Used for [PropMappingHandler](#PropMappingHandler) processing. When `value` is `null/undefined/''/false`, return null, otherwise return the specified value.

Example

```js
formatReturn('width', 100) // ['width', '100']
formatReturn('width', '100px') // ['width', '100px']
formatReturn('width', 100, '100%') // ['width', '100%']

formatReturn('key', false) // null
formatReturn('key', '') // null
formatReturn('key', undefined) // null
formatReturn('key', null) // null
formatReturn('key', null, 'stringValue') // null
```

Param|Types|Required|Description
:--|:--|:--|:--
key|`string`|yes|The PropMappingHandlerReturn `key` or customize `key`
value|`V`|yes|The `props[prop]'s value`
strValue|`string`|no|Customize the `value` of PropMappingHandlerReturn

- @generic `K extends string, V`

- @returns `PropMappingHandlerReturn` see [PropMappingHandlerReturn](#PropMappingHandlerReturn)

## Types

### BaseProps

Commonly used CSS properties for components.

csstype [Property](https://github.com/frenic/csstype)

Prop|Types|Required|Description
:--|:--|:--|:--
style|`any`|no|style
width|`number`/`string`|no|width
minWidth|`number`/`string`|no|min-width
maxWidth|`number`/`string`|no|max-width
height|`number`/`string`|no|height
minHeight|`number`/`string`|no|min-height
maxHeight|`number`/`string`|no|max-height
flex|`boolean`|no|display flex
grid|`boolean`|no|display grid
inlineFlex|`boolean`|no|-
inlineBlock|`boolean`|no|-
inline|`boolean`|no|-
gap|`number`/`string`|no|flex/grid's gap
column|`boolean`|no|flex-direction
align|`Property.AlignItems`|no|align-items
alignContent|`Property.AlignContent`|no|align-content
justify|`Property.JustifyContent`|no|justify-content
justifyItems|`Property.JustifyItems`|no|justify-items
wrap|`boolean`/`Property.FlexWrap`|no|flex-wrap
nowrap|`boolean`|no|white-space: nowrap
whiteSpace|`Property.WhiteSpace`|no|white-space
padding|`number`/`string`|no|padding
p|`number`/`string`|no|padding
paddingTop|`number`/`string`|no|padding-top
pt|`number`/`string`|no|padding-top
paddingBottom|`number`/`string`|no|-
pb|`number`/`string`|no|padding-bottom
paddingLeft|`number`/`string`|no|-
pl|`number`/`string`|no|padding-left
paddingRight|`number`/`string`|no|-
pr|`number`/`string`|no|padding-right
paddingInline|`number`/`string`|no|-
px|`number`/`string`|no|padding-inline
paddingBlock|`number`/`string`|no|-
py|`number`/`string`|no|padding-block
margin|`number`/`string`|no|margin
m|`number`/`string`|no|margin
marginTop|`number`/`string`|no|-
mt|`number`/`string`|no|margin-top
marginBottom|`number`/`string`|no|-
mb|`number`/`string`|no|margin-bottom
marginLeft|`number`/`string`|no|-
ml|`number`/`string`|no|margin-left
marginRight|`number`/`string`|no|-
mr|`number`/`string`|no|margin-right
marginInline|`number`/`string`|no|-
mx|`number`/`string`|no|margin-inline
marginBlock|`number`/`string`|no|-
my|`number`/`string`|no|margin-block
radius|`string`/`number`|no|border-radius
fontSize|`string`/`number`|no|font-size
fs|`string`/`number`|no|font-size
lineHeight|`string`/`number`|no|-
lh|`string`/`number`|no|line-height
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
tempColumns|`string`|no|grid-template-columns
tempRows|`string`|no|grid-template-rows

<details>
<summary>Source Code</summary>

```ts
interface BaseProps {
  // style
  style?: any
  // width
  width?: number | string
  // min-width
  minWidth?: number | string
  // max-width
  maxWidth?: number | string
  // height
  height?: number | string
  // min-height
  minHeight?: number | string
  // max-height
  maxHeight?: number | string
  // display flex
  flex?: boolean
  // display grid
  grid?: boolean
  inlineFlex?: boolean
  inlineBlock?: boolean
  inline?: boolean
  // flex/grid's gap
  gap?: number | string
  // flex-direction
  column?: boolean
  // align-items
  align?: Property.AlignItems
  // align-content
  alignContent?: Property.AlignContent
  // justify-content
  justify?: Property.JustifyContent
  // justify-items
  justifyItems?: Property.JustifyItems
  // flex-wrap
  wrap?: boolean | Property.FlexWrap
  // white-space: nowrap
  nowrap?: boolean
  // white-space
  whiteSpace?: Property.WhiteSpace
  // padding
  padding?: number | string
  // padding
  p?: number | string
  // padding-top
  paddingTop?: number | string
  // padding-top
  pt?: number | string
  paddingBottom?: number | string
  // padding-bottom
  pb?: number | string
  paddingLeft?: number | string
  // padding-left
  pl?: number | string
  paddingRight?: number | string
  // padding-right
  pr?: number | string
  paddingInline?: number | string
  // padding-inline
  px?: number | string
  paddingBlock?: number | string
  // padding-block
  py?: number | string
  // margin
  margin?: number | string
  // margin
  m?: number | string
  marginTop?: number | string
  // margin-top
  mt?: number | string
  marginBottom?: number | string
  // margin-bottom
  mb?: number | string
  marginLeft?: number | string
  // margin-left
  ml?: number | string
  marginRight?: number | string
  // margin-right
  mr?: number | string
  marginInline?: number | string
  // margin-inline
  mx?: number | string
  marginBlock?: number | string
  // margin-block
  my?: number | string
  // border-radius
  radius?: string | number
  // font-size
  fontSize?: string | number
  // font-size
  fs?: string | number
  lineHeight?: string | number
  // line-height
  lh?: string | number
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
  // grid-template-columns
  tempColumns?: string
  // grid-template-rows
  tempRows?: string
}
```

</details>

### PropMappingHandler

PropMappings processing function, returns [PropMappingHandlerReturn](#PropMappingHandlerReturn)

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

### PropMappingHandlerReturn

[PropMappingHandler](#PropMappingHandler)'s returns

<details>
<summary>Source Code</summary>

```ts
type PropMappingHandlerReturn = [key: string, val: string] | null
```

</details>

### PropMappings

[PropMappingHandler](#PropMappingHandler)

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
