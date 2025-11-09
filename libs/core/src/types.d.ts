/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import type { Property } from 'csstype';

/**
 * @type Breakpoint
 *
 * Available breakpoint keys for responsive design
 * @example
 * type Width = { xs?: string; sm?: string; md?: string; lg?: string; xl?: string; xxl?: string; }
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * @type Breakpoints
 *
 * Maps breakpoint keys to their minimum width values in pixels
 * @example
 * const breakpoints = { xs: 640, sm: 768, md: 1024, lg: 1280, xl: 1536, xxl: 1920 };
 */
export type Breakpoints = Record<Breakpoint, number>;

/**
 * @type BreakpointObject
 *
 * Makes a value type responsive by allowing per-breakpoint values and an optional default
 * @example
 * const responsiveDisplay: BreakpointObject<'block' | 'flex'> = {
 *   default: 'block',
 *   md: 'flex'
 * };
 */
export type BreakpointObject<V> = Partial<Record<Breakpoint, V>> & {
  // Shared default value used when a breakpoint isn't specified
  default?: V;
};

/**
 * @type BreakpointTransfer
 *
 * Transforms a props type to support responsive values at each property
 * @example
 * type ResponsiveProps = BreakpointTransfer<{ display: 'block' | 'flex' }>;
 * // Results in: { display: 'block' | 'flex' | { xs?: '...', sm?: '...', default?: '...' } }
 */
export type BreakpointTransfer<T extends OriginalBaseProps> = {
  [K in keyof T]: T[K] | BreakpointObject<T[K]>;
};

/**
 * @type BooleanValueKeys
 */
export type BooleanValueKeys =
  | 'flex'
  | 'column'
  | 'wrap'
  | 'scroll'
  | 'inline'
  | 'breakWord'
  | 'nowrap'
  | 'shadow';

/**
 * @type OriginalBaseProps
 *
 * Commonly used CSS properties for components.
 *
 * csstype [Property](https://github.com/frenic/csstype)
 */
export type OriginalBaseProps = {
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

/**
 * @type BaseProps
 */
export type BaseProps = BreakpointTransfer<OriginalBaseProps>;

/**
 * @type PropMappingHandlerReturn
 */
export type PropMappingHandlerReturn = { key: string; value: string } | null;

/**
 * @type PropMappingHandler
 *
 * PropMappings processing function, returns `{ key: string, value: string } | null`
 */
export type PropMappingHandler<T extends BaseProps> = (
  value: any,
  props: T
) => PropMappingHandlerReturn | PropMappingHandlerReturn[];

/**
 * @type PropMappings
 *
 * [PropMappingHandler](#PropMappingHandler)
 */
export type PropMappings<T extends BaseProps> = Partial<
  Record<keyof T, PropMappingHandler<T>>
>;

/**
 * @type CreatePropStylesOptions
 */
export interface CreatePropStylesOptions {
  breakpoint?: Breakpoint;
  breakpoints?: boolean | Record<Breakpoint, number>;
}
