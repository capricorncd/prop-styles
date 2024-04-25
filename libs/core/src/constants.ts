import { toCssValue, isBoolean } from '@libs/utils'
import {
  display,
  numerical,
  changeless,
  border,
  formatReturn as f,
} from './utils'
import type { BaseProps, PropMappings } from './types'

export const ABBREVIATIONS = {
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
}

export const NUMERICAL_PROP_KEYS = [
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
]

export const CHANGELESS_PROP_KEYS = ['background', 'color']

export const DISPLAY_PROP_KEYS = [
  'flex',
  'grid',
  'inline',
  'inlineFlex',
  'inlineBlock',
]

const CSS_PROP_MAPPINGS: PropMappings<BaseProps> = {
  radius: (v: BaseProps['radius']) => f('borderRadius', v, toCssValue(v)),
  align: (v: BaseProps['align']) => f('alignItems', v),
  alignContent: (v: BaseProps['alignContent']) => f('alignContent', v),
  justify: (v: BaseProps['justify']) => f('justifyContent', v),
  justifyItems: (v: BaseProps['justifyItems']) => f('justifyItems', v),
  column: (v: BaseProps['column']) => f('flexDirection', v, 'column'),
  wrap: (v: BaseProps['wrap']) =>
    v ? ['flexWrap', isBoolean(v) ? 'wrap' : v] : null,
  breakWord: (v: BaseProps['breakWord']) => f('overflowWrap', v, 'break-word'),
  // font
  bold: (v: BaseProps['bold']) => f('fontWeight', v, 'bold'),
  thin: (v: BaseProps['thin']) => f('fontWeight', v, '500'),
  // display
  ...display(DISPLAY_PROP_KEYS),
  // overflow
  scroll: (v: BaseProps['scroll']) =>
    v
      ? [`overflow${typeof v === 'string' ? v.toUpperCase() : ''}`, 'auto']
      : null,
  ...numerical(NUMERICAL_PROP_KEYS),
  ...changeless(CHANGELESS_PROP_KEYS),
  // border
  border: (v: BaseProps['border']) => border(v),
  fontWeight: (v: BaseProps['fontWeight']) => f('fontWeight', v),
  tempColumns: (v: BaseProps['tempColumns']) =>
    f('gridTemplateColumns', toCssValue(v, 'fr')),
  tempRows: (v: BaseProps['tempRows']) =>
    f('gridTemplateRows', toCssValue(v, 'fr')),
}

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
