import { isNumberLike, toCssValue, toNumber } from '@libs/utils';
import { transform, border } from './utils';
import type {
  OriginalBaseProps as BaseProps,
  BooleanValueKeys,
  PropMappings,
  PropMappingHandler,
} from './types';

const PROP_KEY_MAPPINGS: Record<
  keyof Omit<BaseProps, BooleanValueKeys>,
  string
> = {
  display: 'display',
  width: 'width',
  minWidth: 'minWidth',
  maxWidth: 'maxWidth',
  height: 'height',
  minHeight: 'minHeight',
  maxHeight: 'maxHeight',
  gap: 'gap',
  fd: 'flexDirection',
  ai: 'alignItems',
  ac: 'alignContent',
  ji: 'justifyItems',
  jc: 'justifyContent',
  ws: 'whiteSpace',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingInline',
  py: 'paddingBlock',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginInline',
  my: 'marginBlock',
  radius: 'borderRadius',
  fs: 'fontSize',
  lh: 'lineHeight',
  color: 'color',
  bg: 'background',
  bgs: 'backgroundSize',
  bgo: 'backgroundOrigin',
  fw: 'fontWeight',
  border: 'border',
  borderTop: 'borderTop',
  borderRight: 'borderRight',
  borderBottom: 'borderBottom',
  borderLeft: 'borderLeft',
  gtc: 'gridTemplateColumns',
  gtr: 'gridTemplateRows',
  ta: 'textAlign',
  position: 'position',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  zIndex: 'zIndex',
  inset: 'inset',
  transform: 'transform',
  cursor: 'cursor',
  whiteSpace: 'whiteSpace',
  ratio: 'aspectRatio',
};

const booleanValuePropMappings: Record<
  BooleanValueKeys,
  PropMappingHandler<Pick<BaseProps, BooleanValueKeys>>
> = {
  column: (v: BaseProps['column']) => transform('flexDirection', v, 'column'),
  wrap: (v: BaseProps['wrap']) =>
    transform('flexWrap', v, v === true ? 'wrap' : String(v)),
  breakWord: (v: BaseProps['breakWord']) =>
    transform('overflowWrap', v, 'break-word'),
  // overflow
  scroll: (v: BaseProps['scroll']) =>
    transform(
      `overflow${typeof v === 'string' ? v.toUpperCase() : ''}`,
      v,
      'auto'
    ),
  shadow: (v: BaseProps['shadow']) =>
    transform(
      'boxShadow',
      v,
      v === true ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : String(v)
    ),
  flex: (v: BaseProps['flex']) => {
    if (v === true) {
      return transform('display', 'flex');
    }
    return transform('flex', v);
  },
  inline: (v: BaseProps['inline']) => transform('display', v, 'inline'),
  nowrap: (v: BaseProps['nowrap']) => transform('whiteSpace', v, 'nowrap'),
};

export const CSS_PROP_MAPPINGS = {
  ...Object.entries(PROP_KEY_MAPPINGS).reduce((result, [abb, cssFullKey]) => {
    result[abb as keyof BaseProps] = (v: BaseProps[keyof BaseProps]) =>
      transform(cssFullKey, v, toCssValue(v));
    return result;
  }, {} as PropMappings<BaseProps>),
  ...booleanValuePropMappings,
  border: (v: BaseProps['border']) => border(v),
  borderTop: (v: BaseProps['borderTop']) => border(v, 'Top'),
  borderRight: (v: BaseProps['borderRight']) => border(v, 'Right'),
  borderBottom: (v: BaseProps['borderBottom']) => border(v, 'Bottom'),
  borderLeft: (v: BaseProps['borderLeft']) => border(v, 'Left'),
  fw: (v: BaseProps['fw']) => transform('fontWeight', v),
  gtc: (v: BaseProps['gtc']) =>
    transform('gridTemplateColumns', v, toCssValue(v, 'fr')),
  gtr: (v: BaseProps['gtr']) =>
    transform('gridTemplateRows', v, toCssValue(v, 'fr')),
  zIndex: (v: BaseProps['zIndex']) => transform('zIndex', v),
  lh: (v: BaseProps['lh']) =>
    transform(
      'lineHeight',
      v,
      isNumberLike(v) && toNumber(v) < 8 ? String(v) : toCssValue(v)
    ),
} as PropMappings<BaseProps>;
