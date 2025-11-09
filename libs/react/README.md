# @prop-styles/react

<p>
<a href="https://npmcharts.com/compare/@prop-styles/react?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/react.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/v/@prop-styles/react.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/@prop-styles/react"><img src="https://img.shields.io/npm/l/@prop-styles/react.svg?sanitize=true" alt="License"></a>
</p>

Process CSS-related properties in Props so that they can generate the element style.

```bash
npm i @prop-styles/react
```

```tsx
import { usePropStyles, transform, type ReactBaseProps } from '@prop-styles/react'

interface Props extends ReactBaseProps {
  customProp?: unknown
}

export default App(props: Props) {
  const { style } = usePropStyles(props, {
    // Custom prop mapping handler
    customProp: (v: Props['customProp]) => f('custom-prop', v, 'default value used when v is null/false')
  })

  return (
    <div style={style}></div>
  )
}
```

```jsx
<App width="100" radius="12 12 0 12" marginTop="20" />
// <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
```

## Methods

### createPropStyles(props, mappings, options)

Create Styles Object

Example

```js
import { createPropStyles, transform } from '@prop-styles/core'

const props = { width: 100, color: '#fff' }

createPropStyles(props) // { width: '100px', color, '#fff' }

// Use custom Mapping handler
createPropStyles(props, {
  // custom mapping handler
  color: (v) => { key: '--color', value: v }
}) // { width: '100px', '--color', '#fff' }

// Use transform function to remove null/undefined props
createPropStyles(props, {
  color: (v) => transform('--color', v)
}) // { width: '100px', '--color', '#fff' }
```

Param|Types|Required|Description
:--|:--|:--|:--
props|`T`|yes|[BaseProps](#BaseProps)
mappings|`PropMappings<T>`|no|[PropMappings](#PropMappings)
options|`CreatePropStylesOptions`|no|-

- @generic `T extends BaseProps`

- @returns `Record<string, string>`

### getDefaultBreakpoint(breakpoints)

Determines the active breakpoint based on window width using media queries

- `true` to use DEFAULT_BREAKPOINTS
- `false` or `undefined` to disable responsive behavior
- `Record<Breakpoint, number>` to use custom breakpoint values

- breakpoints is false/undefined (responsive disabled)
- running in non-browser environment
- no breakpoint matches current width

@example
```js
// Use default breakpoints
getDefaultBreakpoint(true) // 'md' if window width >= 1024px

// Use custom breakpoints
getDefaultBreakpoint({ sm: 500, md: 1000 })

// Disable responsive behavior
getDefaultBreakpoint(false) // undefined
```

Param|Types|Required|Description
:--|:--|:--|:--
breakpoints|`boolean`/`Record<Breakpoint, number>`|no|- Configuration for breakpoint detection:

- @returns The active breakpoint key based on current window width, or undefined if:

### transform(key, value, strValue)

Helper for creating PropMappingHandler functions. Handles common value transformations
and null/empty value filtering.

When to use:
- Basic prop-to-style mapping with null/empty filtering
- Value type conversion (number to px, etc)
- Custom key mapping with value preprocessing

@example
```js
// Basic usage
transform('width', 100) // { key: 'width', value: '100px' }
transform('width', '100px') // { key: 'width', value: '100px' }

// With custom output value
transform('width', 100, '100%') // { key: 'width', value: '100%' }

// Null/empty handling
transform('key', false) // null
transform('key', '') // null
transform('key', undefined) // null
transform('key', null) // null

// Boolean to string value
transform('key', true, 'value') // { key: 'key', value: 'value' }
```

Param|Types|Required|Description
:--|:--|:--|:--
key|`string`|yes|- The CSS property name or custom key for the style
value|`any`|yes|- The value to transform (from props[propName])
strValue|`string`|no|- Optional override for the output value string

- @returns Object with key and transformed value, or null if value should be skipped

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

<details>
<summary>Source Code</summary>

```ts
type BaseProps = BreakpointTransfer<OriginalBaseProps>;
```

</details>

### BooleanValueKeys

<details>
<summary>Source Code</summary>

```ts
type BooleanValueKeys =
  | 'flex'
  | 'column'
  | 'wrap'
  | 'scroll'
  | 'inline'
  | 'breakWord'
  | 'nowrap'
  | 'shadow';
```

</details>

### Breakpoint

Available breakpoint keys for responsive design
@example
type Width = { xs?: string; sm?: string; md?: string; lg?: string; xl?: string; xxl?: string; }

<details>
<summary>Source Code</summary>

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
```

</details>

### BreakpointObject

Makes a value type responsive by allowing per-breakpoint values and an optional default
@example
const responsiveDisplay: BreakpointObject<'block' | 'flex'> = {
default: 'block',
md: 'flex'
};

Prop|Types|Required|Description
:--|:--|:--|:--
default|`V`|no|Shared default value used when a breakpoint isn't specified

<details>
<summary>Source Code</summary>

```ts
type BreakpointObject<V> = Partial<Record<Breakpoint, V>> & {
  // Shared default value used when a breakpoint isn't specified
  default?: V;
};
```

</details>

### BreakpointTransfer

Transforms a props type to support responsive values at each property
@example
type ResponsiveProps = BreakpointTransfer<{ display: 'block' | 'flex' }>;
// Results in: { display: 'block' | 'flex' | { xs?: '...', sm?: '...', default?: '...' } }

Prop|Types|Required|Description
:--|:--|:--|:--
[K in keyof T]|`T[K]`/`BreakpointObject<T[K]>`|yes|-

<details>
<summary>Source Code</summary>

```ts
type BreakpointTransfer<T extends OriginalBaseProps> = {
  [K in keyof T]: T[K] | BreakpointObject<T[K]>;
};
```

</details>

### Breakpoints

Maps breakpoint keys to their minimum width values in pixels
@example
const breakpoints = { xs: 640, sm: 768, md: 1024, lg: 1280, xl: 1536, xxl: 1920 };

<details>
<summary>Source Code</summary>

```ts
type Breakpoints = Record<Breakpoint, number>;
```

</details>

### CreatePropStylesOptions

Prop|Types|Required|Description
:--|:--|:--|:--
breakpoint|`Breakpoint`|no|-
breakpoints|`boolean`/`Record<Breakpoint, number>`|no|-

<details>
<summary>Source Code</summary>

```ts
interface CreatePropStylesOptions {
  breakpoint?: Breakpoint;
  breakpoints?: boolean | Record<Breakpoint, number>;
}
```

</details>

### OriginalBaseProps

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
inline|`boolean`|no|inline
flex|`boolean`/`Property.Flex`|no|flex or display=flex
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
bgs|`Property.BackgroundSize`|no|background-size
bgo|`Property.BackgroundOrigin`|no|background-origin
scroll|`boolean`/`'x'`/`'y'`|no|scroll direction
breakWord|`boolean`|no|text
border|`string`/`number`|no|border, border-width, border-color
borderTop|`string`/`number`|no|-
borderRight|`string`/`number`|no|-
borderBottom|`string`/`number`|no|-
borderLeft|`string`/`number`|no|-
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
cursor|`Property.Cursor`|no|-
shadow|`boolean`/`Property.BoxShadow`|no|-
nowrap|`boolean`|no|-
whiteSpace|`Property.WhiteSpace`|no|-
ratio|`Property.AspectRatio`|no|aspect-ratio

<details>
<summary>Source Code</summary>

```ts
type OriginalBaseProps = {
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
  // inline
  inline?: boolean;
  // flex or display=flex
  flex?: boolean | Property.Flex;
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
  // background-size
  bgs?: Property.BackgroundSize;
  // background-origin
  bgo?: Property.BackgroundOrigin;
  // scroll direction
  scroll?: boolean | 'x' | 'y';
  // text
  breakWord?: boolean;
  // border, border-width, border-color
  border?: string | number;
  borderTop?: string | number;
  borderRight?: string | number;
  borderBottom?: string | number;
  borderLeft?: string | number;
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
  cursor?: Property.Cursor;
  shadow?: boolean | Property.BoxShadow;
  nowrap?: boolean;
  whiteSpace?: Property.WhiteSpace;
  // aspect-ratio
  ratio?: Property.AspectRatio;
};
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

### ReactBaseProps

Prop|Types|Required|Description
:--|:--|:--|:--
style|`CSSProperties`|no|-
className|`string`|no|-
children|`ReactNode`/`JSX.Element`|no|-
onClick|`(event: Event) => void`|no|-

<details>
<summary>Source Code</summary>

```ts
interface ReactBaseProps extends BaseProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode | JSX.Element;
  onClick?: (event: Event) => void;
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
  style: { [key: string]: string };
}
```

</details>

## Constants

### DEFAULT_BREAKPOINTS

Default minimum width values (in pixels) for each breakpoint
These values are used when breakpoints parameter is true or not provided

@example
```js
DEFAULT_BREAKPOINTS.xs // 640
DEFAULT_BREAKPOINTS.sm // 768
DEFAULT_BREAKPOINTS.md // 1024
DEFAULT_BREAKPOINTS.lg // 1280
DEFAULT_BREAKPOINTS.xl // 1536
DEFAULT_BREAKPOINTS.xxl // 1920
```

```ts
const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
  xxl: 1920,
};
```

## License

MIT License © 2024-Present [Capricorncd](https://github.com/capricorncd).
