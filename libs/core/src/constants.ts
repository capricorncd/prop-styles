import { toCssValue, isBoolean } from '@libs/utils'
import { display, numerical, changeless, border, f } from './utils'
import type { BaseProps, PropMappings } from './types'

const ABBREVIATIONS = {
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  px: 'paddingInline',
  py: 'paddingBlock',
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mx: 'marginInline',
  my: 'marginBlock',
  fs: 'fontSize',
  lh: 'lineHeight',
  bg: 'background',
  fw: 'fontWeight',
  ta: 'textAlign',
  gtc: 'tempColumns',
  gtr: 'tempRows',
  align: 'alignItems',
  ai: 'alignItems',
  ac: 'alignContent',
  ji: 'justifyItems',
  justify: 'justifyContent',
  jc: 'justifyContent',
  t: 'top',
  r: 'right',
  l: 'left',
  b: 'bottom',
  z: 'zIndex',
  tf: 'transform',
}

const NUMERICAL_PROP_KEYS = [
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingInline',
  'paddingBlock',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginInline',
  'marginBlock',
  'gap',
  'fontSize',
  'lineHeight',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
]

const CHANGELESS_PROP_KEYS = [
  'background',
  'color',
  'alignItems',
  'alignContent',
  'justifyContent',
  'justifyItems',
  'fontWeight',
  'whiteSpace',
  'textAlign',
  'position',
  'zIndex',
  'transform',
]

const DISPLAY_PROP_KEYS = [
  'flex',
  'grid',
  'inline',
  'inlineFlex',
  'inlineBlock',
]

const CSS_PROP_MAPPINGS: PropMappings<BaseProps> = {
  radius: (v: BaseProps['radius']) => f('borderRadius', v, toCssValue(v)),
  column: (v: BaseProps['column']) => f('flexDirection', v, 'column'),
  wrap: (v: BaseProps['wrap']) => f('flexWrap', v, isBoolean(v) ? 'wrap' : v),
  breakWord: (v: BaseProps['breakWord']) => f('overflowWrap', v, 'break-word'),
  // font
  bold: (v: BaseProps['bold']) => f('fontWeight', v, 'bold'),
  thin: (v: BaseProps['thin']) => f('fontWeight', v, '500'),
  // overflow
  scroll: (v: BaseProps['scroll']) =>
    f(`overflow${typeof v === 'string' ? v.toUpperCase() : ''}`, v, 'auto'),
  // border
  border: (v: BaseProps['border']) => border(v),
  tempColumns: (v: BaseProps['tempColumns']) =>
    f('gridTemplateColumns', v, toCssValue(v, 'fr')),
  tempRows: (v: BaseProps['tempRows']) =>
    f('gridTemplateRows', v, toCssValue(v, 'fr')),
  nowrap: (v: BaseProps['nowrap']) => f('whiteSpace', v, 'nowrap'),
}

display(DISPLAY_PROP_KEYS, CSS_PROP_MAPPINGS)
numerical(NUMERICAL_PROP_KEYS, CSS_PROP_MAPPINGS)
changeless(CHANGELESS_PROP_KEYS, CSS_PROP_MAPPINGS)

// Abbreviation attribute handling
for (const [abb, keyFullName] of Object.entries(ABBREVIATIONS)) {
  // @ts-ignore
  if (CSS_PROP_MAPPINGS[keyFullName]) {
    // @ts-ignore
    CSS_PROP_MAPPINGS[abb] = CSS_PROP_MAPPINGS[keyFullName]
  } else {
    throw new Error(`The alias of ${abb} does not exist`)
  }
}

export { CSS_PROP_MAPPINGS }
