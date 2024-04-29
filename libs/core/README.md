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
import { createPropStyles, f } from '@prop-styles/core'

const style = createPropStyles({ color: 'red', width: 100 }, {
  color: (value) => value ? ['--color-primary', value] : null
  // or Use f function to remove null/undefined props
  // color: (value) => f('--color-primary', value)
})

// style
// { '--color-primary': 'red', width: '100px' }
```

## Methods

### createPropStyles(props, mappings)

Create Styles Object

Example

```js
import { createPropStyles, f } from '@prop-styles/core'

const props = { width: 100, color: '#fff' }

createPropStyles(props) // { width: '100px', color, '#fff' }

// Use custom Mapping handler
createPropStyles(props, {
  // custom mapping handler
  color: (v) => ['--color', v]
}) // { width: '100px', '--color', '#fff' }

// Use f function to remove null/undefined props
createPropStyles(props, {
  color: (v) => f('--color', v)
}) // { width: '100px', '--color', '#fff' }
```

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|[BaseProps](#BaseProps)
mappings|`PropMappings<T>`|no|[PropMappings](#PropMappings)

- @generic `T extends BaseProps`

- @returns `Record<string, string>`

### f(key, value, strValue)

Alias and abbreviation of [formatReturn](#formatreturnkey-value-strvalue).

Param|Types|Required|Description
:--|:--|:--|:--
key|`K`|yes|The PropMappingHandler Return `key` or customize `key`
value|`V`|yes|The `props[prop]'s value`
strValue|`string`|no|Customize the `value` of PropMappingHandler Return

- @generic `K extends string, V`

- @returns `[key: string, val: string] | null`

### formatReturn(key, value, strValue)

Used for [PropMappingHandler](#PropMappingHandler) processing. When `value` is `null/undefined/''/false`, return null, otherwise return the specified value.

Example

```js
f('width', 100) // ['width', '100']
f('width', '100px') // ['width', '100px']
f('width', 100, '100%') // ['width', '100%']

f('key', false) // null
f('key', '') // null
f('key', undefined) // null
f('key', null) // null
f('key', null, 'stringValue') // null
f('key', true, 'stringValue') // ['key', 'stringValue']
```

Param|Types|Required|Description
:--|:--|:--|:--
key|`K`|yes|The PropMappingHandler Return `key` or customize `key`
value|`V`|yes|The `props[prop]'s value`
strValue|`string`|no|Customize the `value` of PropMappingHandler Return

- @generic `K extends string, V`

- @returns `[key: string, val: string] | null`

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
flex|`boolean`|no|display: flex
grid|`boolean`|no|display: grid
inlineFlex|`boolean`|no|display: inline-flex
inlineBlock|`boolean`|no|display: inline-block
inline|`boolean`|no|display: inline
gap|`number`/`string`|no|flex/grid's gap
column|`boolean`|no|flex-direction
align|`Property.AlignItems`|no|align-items
alignItems|`Property.AlignItems`|no|align-items
ai|`Property.AlignItems`|no|align-items
alignContent|`Property.AlignContent`|no|align-content
ac|`Property.AlignContent`|no|align-content
justify|`Property.JustifyContent`|no|justify-content
justifyContent|`Property.JustifyContent`|no|justify-content
jc|`Property.JustifyContent`|no|justify-content
justifyItems|`Property.JustifyItems`|no|justify-items
ji|`Property.JustifyItems`|no|justify-items
wrap|`boolean`/`Property.FlexWrap`|no|flex-wrap
nowrap|`boolean`|no|white-space: nowrap
whiteSpace|`Property.WhiteSpace`|no|white-space
padding|`number`/`string`|no|padding
p|`number`/`string`|no|padding
paddingTop|`number`/`string`|no|padding-top
pt|`number`/`string`|no|padding-top
paddingBottom|`number`/`string`|no|padding-bottom
pb|`number`/`string`|no|padding-bottom
paddingLeft|`number`/`string`|no|padding-left
pl|`number`/`string`|no|padding-left
paddingRight|`number`/`string`|no|padding-right
pr|`number`/`string`|no|padding-right
paddingInline|`number`/`string`|no|padding-inline
px|`number`/`string`|no|padding-inline
paddingBlock|`number`/`string`|no|padding-block
py|`number`/`string`|no|padding-block
margin|`number`/`string`|no|margin
m|`number`/`string`|no|margin
marginTop|`number`/`string`|no|margin-top
mt|`number`/`string`|no|margin-top
marginBottom|`number`/`string`|no|margin-bottom
mb|`number`/`string`|no|margin-bottom
marginLeft|`number`/`string`|no|margin-left
ml|`number`/`string`|no|margin-left
marginRight|`number`/`string`|no|margin-right
mr|`number`/`string`|no|margin-right
marginInline|`number`/`string`|no|margin-inline
mx|`number`/`string`|no|margin-inline
marginBlock|`number`/`string`|no|margin-block
my|`number`/`string`|no|margin-block
radius|`string`/`number`|no|border-radius
fontSize|`string`/`number`|no|font-size
fs|`string`/`number`|no|font-size
lineHeight|`string`/`number`|no|line-height
lh|`string`/`number`|no|line-height
color|`string`|no|color
background|`Property.Background`|no|background
bg|`Property.Background`|no|background
scroll|`boolean`/`'x'`/`'y'`|no|scroll direction
breakWord|`boolean`|no|text
bold|`boolean`|no|font-weight: bold
thin|`boolean`|no|font-weight: 500
fontWeight|`Property.FontWeight`|no|font-weight
fw|`Property.FontWeight`|no|font-weight
border|`string`/`number`|no|border, border-width, border-color
tempColumns|`string`/`number`|no|grid-template-columns
gtc|`string`/`number`|no|grid-template-columns
tempRows|`string`/`number`|no|grid-template-rows
gtr|`string`/`number`|no|grid-template-rows
textAlign|`Property.TextAlign`|no|text-align
ta|`Property.TextAlign`|no|text-align
position|`Property.Position`|no|position
top|`string`/`number`|no|-
t|`string`/`number`|no|top
right|`string`/`number`|no|right
r|`string`/`number`|no|right
bottom|`string`/`number`|no|bottom
b|`string`/`number`|no|bottom
left|`string`/`number`|no|left
l|`string`/`number`|no|left
zIndex|`Property.ZIndex`|no|z-index
z|`Property.ZIndex`|no|z-index
inset|`string`/`number`|no|inset
transform|`Property.Transform`|no|transform
tf|`Property.Transform`|no|transform

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
  // display: flex
  flex?: boolean
  // display: grid
  grid?: boolean
  // display: inline-flex
  inlineFlex?: boolean
  // display: inline-block
  inlineBlock?: boolean
  // display: inline
  inline?: boolean
  // flex/grid's gap
  gap?: number | string
  // flex-direction
  column?: boolean
  // align-items
  align?: Property.AlignItems
  // align-items
  alignItems?: Property.AlignItems
  // align-items
  ai?: Property.AlignItems
  // align-content
  alignContent?: Property.AlignContent
  // align-content
  ac?: Property.AlignContent
  // justify-content
  justify?: Property.JustifyContent
  // justify-content
  justifyContent?: Property.JustifyContent
  // justify-content
  jc?: Property.JustifyContent
  // justify-items
  justifyItems?: Property.JustifyItems
  // justify-items
  ji?: Property.JustifyItems
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
  // padding-bottom
  paddingBottom?: number | string
  // padding-bottom
  pb?: number | string
  // padding-left
  paddingLeft?: number | string
  // padding-left
  pl?: number | string
  // padding-right
  paddingRight?: number | string
  // padding-right
  pr?: number | string
  // padding-inline
  paddingInline?: number | string
  // padding-inline
  px?: number | string
  // padding-block
  paddingBlock?: number | string
  // padding-block
  py?: number | string
  // margin
  margin?: number | string
  // margin
  m?: number | string
  // margin-top
  marginTop?: number | string
  // margin-top
  mt?: number | string
  // margin-bottom
  marginBottom?: number | string
  // margin-bottom
  mb?: number | string
  // margin-left
  marginLeft?: number | string
  // margin-left
  ml?: number | string
  // margin-right
  marginRight?: number | string
  // margin-right
  mr?: number | string
  // margin-inline
  marginInline?: number | string
  // margin-inline
  mx?: number | string
  // margin-block
  marginBlock?: number | string
  // margin-block
  my?: number | string
  // border-radius
  radius?: string | number
  // font-size
  fontSize?: string | number
  // font-size
  fs?: string | number
  // line-height
  lineHeight?: string | number
  // line-height
  lh?: string | number
  // color
  color?: string
  // background
  background?: Property.Background
  // background
  bg?: Property.Background
  // scroll direction
  scroll?: boolean | 'x' | 'y'
  // text
  breakWord?: boolean
  // font-weight: bold
  bold?: boolean
  // font-weight: 500
  thin?: boolean
  // font-weight
  fontWeight?: Property.FontWeight
  // font-weight
  fw?: Property.FontWeight
  // border, border-width, border-color
  border?: string | number
  // grid-template-columns
  tempColumns?: string | number
  // grid-template-columns
  gtc?: string | number
  // grid-template-rows
  tempRows?: string | number
  // grid-template-rows
  gtr?: string | number
  // text-align
  textAlign?: Property.TextAlign
  // text-align
  ta?: Property.TextAlign
  // position
  position?: Property.Position
  top?: string | number
  // top
  t?: string | number
  // right
  right?: string | number
  // right
  r?: string | number
  // bottom
  bottom?: string | number
  // bottom
  b?: string | number
  // left
  left?: string | number
  // left
  l?: string | number
  // z-index
  zIndex?: Property.ZIndex
  // z-index
  z?: Property.ZIndex
  // inset
  inset?: string | number
  // transform
  transform?: Property.Transform
  // transform
  tf?: Property.Transform
}
```

</details>

### PropMappingHandler

PropMappings processing function, returns `[key: string, val: string] | null`

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
