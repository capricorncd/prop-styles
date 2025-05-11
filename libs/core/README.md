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
import { createPropStyles, format } from '@prop-styles/core'

const props = { width: 100, color: '#fff' }

createPropStyles(props) // { width: '100px', color, '#fff' }

// Use custom Mapping handler
createPropStyles(props, {
  // custom mapping handler
  color: (v) => ['--color', v]
}) // { width: '100px', '--color', '#fff' }

// Use format function to remove null/undefined props
createPropStyles(props, {
  color: (v) => format('--color', v)
}) // { width: '100px', '--color', '#fff' }
```

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|[BaseProps](#BaseProps)
mappings|`PropMappings<T>`|no|[PropMappings](#PropMappings)

- @generic `T extends BaseProps`

- @returns `Record<string, string>`

### transform(key, value, strValue)

Used for [PropMappingHandler](#PropMappingHandler) processing. When `value` is `null/undefined/''/false`, return null, otherwise return the specified value.

Example

```js
transform('width', 100) // { key: 'width', value: '100' }
transform('width', '100px') // { key: 'width', value: '100px' }
transform('width', 100, '100%') // { key: 'width', value: '100%' }

transform('key', false) // null
transform('key', '') // null
transform('key', undefined) // null
transform('key', null) // null
transform('key', null, 'stringValue') // null
transform('key', true, 'stringValue') // { key: 'key', value: 'stringValue' }
```

Param|Types|Required|Description
:--|:--|:--|:--
key|`string`|yes|The PropMappingHandler Return `key` or customize `key`
value|`any`|yes|The `props[prop]'s value`
strValue|`string`|no|Customize the `value` of PropMappingHandler Return

- @returns `{ key: string, value: string } | null`

## Types

### BaseProps

Commonly used CSS properties for components.

csstype [Property](https://github.com/frenic/csstype)

Prop|Types|Required|Description
:--|:--|:--|:--
display|`Property.Display`|no|display
width|`number`/`string`|no|width
minWidth|`number`/`string`|no|min-width
maxWidth|`number`/`string`|no|max-width
height|`number`/`string`|no|height
minHeight|`number`/`string`|no|min-height
maxHeight|`number`/`string`|no|max-height
flex|`Property.Flex`|no|flex
gap|`number`/`string`|no|flex/grid's gap
column|`boolean`|no|flex-direction
fd|`Property.FlexDirection`|no|flex-direction
ai|`Property.AlignItems`|no|align-items
ac|`Property.AlignContent`|no|align-content
ji|`Property.JustifyItems`|no|justify-items
jc|`Property.JustifyContent`|no|justify-content
wrap|`boolean`/`Property.FlexWrap`|no|flex-wrap
ws|`Property.WhiteSpace`|no|white-space
p|`number`/`string`|no|padding
pt|`number`/`string`|no|padding-top
pr|`number`/`string`|no|padding-right
pb|`number`/`string`|no|padding-bottom
pl|`number`/`string`|no|padding-left
px|`number`/`string`|no|padding-inline
py|`number`/`string`|no|padding-block
m|`number`/`string`|no|margin
mt|`number`/`string`|no|margin-top
mr|`number`/`string`|no|margin-right
mb|`number`/`string`|no|margin-bottom
ml|`number`/`string`|no|margin-left
mx|`number`/`string`|no|margin-inline
my|`number`/`string`|no|margin-block
radius|`string`/`number`|no|border-radius
fs|`string`/`number`|no|font-size
fw|`Property.FontWeight`|no|font-weight
lh|`string`/`number`|no|line-height
color|`string`|no|color
bg|`Property.Background`|no|background
scroll|`boolean`/`'x'`/`'y'`|no|scroll direction
breakWord|`boolean`|no|text
border|`string`/`number`|no|border, border-width, border-color
gtc|`string`/`number`|no|grid-template-columns
gtr|`string`/`number`|no|grid-template-rows
ta|`Property.TextAlign`|no|text-align
position|`Property.Position`|no|position
top|`string`/`number`|no|top
right|`string`/`number`|no|right
bottom|`string`/`number`|no|bottom
left|`string`/`number`|no|left
zIndex|`Property.ZIndex`|no|z-index
inset|`string`/`number`|no|inset
transform|`Property.Transform`|no|transform

<details>
<summary>Source Code</summary>

```ts
interface BaseProps {
  // display
  display?: Property.Display;
  // width
  width?: number | string;
  // min-width
  minWidth?: number | string;
  // max-width
  maxWidth?: number | string;
  // height
  height?: number | string;
  // min-height
  minHeight?: number | string;
  // max-height
  maxHeight?: number | string;
  // flex
  flex?: Property.Flex;
  // flex/grid's gap
  gap?: number | string;
  // flex-direction
  column?: boolean;
  // flex-direction
  fd?: Property.FlexDirection;
  // align-items
  ai?: Property.AlignItems;
  // align-content
  ac?: Property.AlignContent;
  // justify-items
  ji?: Property.JustifyItems;
  // justify-content
  jc?: Property.JustifyContent;
  // flex-wrap
  wrap?: boolean | Property.FlexWrap;
  // white-space
  ws?: Property.WhiteSpace;
  // padding
  p?: number | string;
  // padding-top
  pt?: number | string;
  // padding-right
  pr?: number | string;
  // padding-bottom
  pb?: number | string;
  // padding-left
  pl?: number | string;
  // padding-inline
  px?: number | string;
  // padding-block
  py?: number | string;
  // margin
  m?: number | string;
  // margin-top
  mt?: number | string;
  // margin-right
  mr?: number | string;
  // margin-bottom
  mb?: number | string;
  // margin-left
  ml?: number | string;
  // margin-inline
  mx?: number | string;
  // margin-block
  my?: number | string;
  // border-radius
  radius?: string | number;
  // font-size
  fs?: string | number;
  // font-weight
  fw?: Property.FontWeight;
  // line-height
  lh?: string | number;
  // color
  color?: string;
  // background
  bg?: Property.Background;
  // scroll direction
  scroll?: boolean | 'x' | 'y';
  // text
  breakWord?: boolean;
  // border, border-width, border-color
  border?: string | number;
  // grid-template-columns
  gtc?: string | number;
  // grid-template-rows
  gtr?: string | number;
  // text-align
  ta?: Property.TextAlign;
  // position
  position?: Property.Position;
  // top
  top?: string | number;
  // right
  right?: string | number;
  // bottom
  bottom?: string | number;
  // left
  left?: string | number;
  // z-index
  zIndex?: Property.ZIndex;
  // inset
  inset?: string | number;
  // transform
  transform?: Property.Transform;
}
```

</details>

### PropMappingHandler

PropMappings processing function, returns `{ key: string, value: string } | null`

Prop|Types|Required|Description
:--|:--|:--|:--
value|`any,`|yes|-
props|`T`|yes|-

<details>
<summary>Source Code</summary>

```ts
type PropMappingHandler<T extends BaseProps> = (
  value: any,
  props: T
) => PropMappingHandlerReturn | PropMappingHandlerReturn[];
```

</details>

### PropMappingHandlerReturn

<details>
<summary>Source Code</summary>

```ts
type PropMappingHandlerReturn = { key: string; value: string } | null;
```

</details>

### PropMappings

[PropMappingHandler](#PropMappingHandler)

<details>
<summary>Source Code</summary>

```ts
type PropMappings<T extends BaseProps> = Partial<
  Record<keyof T, PropMappingHandler<T>>
>;
```

</details>

## License

MIT License © 2024-Present [Capricorncd](https://github.com/capricorncd).
