/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:21:56 (GMT+0900)
 */
import { toCssValue, isBoolean } from '@libs/utils'
import { handleMappings, display, numerical, changeless, border } from './utils'
import type { BaseProps, PropMappings } from './types'

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
]

const CHANGELESS_PROP_KEYS = ['background', 'color']

const DISPLAY_PROP_KEYS = [
  'flex',
  'grid',
  'inline',
  'inlineFlex',
  'inlineBlock',
]

const CSS_PROP_MAPPINGS: PropMappings<BaseProps> = {
  radius: (value: BaseProps['radius']) => ['borderRadius', toCssValue(value)],
  align: (value: BaseProps['align']) => ['alignItems', value ?? ''],
  justify: (value: BaseProps['justify']) => ['justifyContent', value ?? ''],
  column: (value: BaseProps['column']) =>
    value ? ['flexDirection', 'column'] : null,
  wrap: (value: BaseProps['wrap']) =>
    value ? ['flexWrap', isBoolean(value) ? 'wrap' : value] : null,
  breakWord: (value: BaseProps['breakWord']) =>
    value ? ['overflowWrap', 'break-word'] : null,
  // font
  bold: (value: BaseProps['bold']) => (value ? ['fontWeight', 'bold'] : null),
  thin: (value: BaseProps['thin']) => (value ? ['fontWeight', '500'] : null),
  // display
  ...display(DISPLAY_PROP_KEYS),
  // overflow
  scroll: (value: BaseProps['scroll']) => [
    `overflow${typeof value === 'string' ? value.toUpperCase() : ''}`,
    'auto',
  ],
  ...numerical(NUMERICAL_PROP_KEYS),
  ...changeless(CHANGELESS_PROP_KEYS),
  // border
  border: (value: BaseProps['border']) => border(value),
}

/**
 * Create Prop Styles
 *
 * @param props {@link BaseProps}
 * @param mappings {@link PartialPropMappingRecord}
 * @returns Record<string, string>
 */
export function createPropStyles<T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
) {
  const styles: Record<string, string> = {
    ...props.style,
  }
  const _mappings = {
    ...CSS_PROP_MAPPINGS,
    ...mappings,
  }
  handleMappings(props, _mappings, styles)
  return styles
}
