import { toCssValue } from '@libs/utils';
import { transform, border } from './utils';
import type {
  BaseProps,
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
  flex: 'flex',
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
  fw: 'fontWeight',
  border: 'border',
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
};

export const CSS_PROP_MAPPINGS = {
  ...Object.entries(PROP_KEY_MAPPINGS).reduce((result, [abb, cssFullKey]) => {
    result[abb as keyof BaseProps] = (v: BaseProps[keyof BaseProps]) =>
      transform(cssFullKey, v, toCssValue(v));
    return result;
  }, {} as PropMappings<BaseProps>),
  ...booleanValuePropMappings,
  flex: (v: BaseProps['flex']) => transform('flex', v),
  border,
  fw: (v: BaseProps['fw']) => transform('fontWeight', v, String(v)),
  gtc: (v: BaseProps['gtc']) =>
    transform('gridTemplateColumns', v, toCssValue(v, 'fr')),
  gtr: (v: BaseProps['gtr']) =>
    transform('gridTemplateRows', v, toCssValue(v, 'fr')),
  zIndex: (v: BaseProps['zIndex']) => transform('zIndex', v, String(v)),
} as PropMappings<BaseProps>;
