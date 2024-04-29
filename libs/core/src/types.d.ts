/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import type { Property } from 'csstype'

/**
 * @type BaseProps
 *
 * Commonly used CSS properties for components.
 *
 * csstype [Property](https://github.com/frenic/csstype)
 */
export interface BaseProps {
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
  // font-weight: bold
  bold?: boolean
  // font-weight: 500
  thin?: boolean
  fontWeight?: Property.FontWeight
  // fontWeight
  fw?: Property.FontWeight
  // border, border-width, border-color
  border?: string | number
  // grid-template-columns
  tempColumns?: string
  // grid-template-columns
  gtc?: string
  // grid-template-rows
  tempRows?: string
  // grid-template-rows
  gtr?: string
  // text-align
  textAlign?: Property.TextAlign
  // text-align
  ta?: Property.TextAlign
  // position
  position?: Property.Position
  top?: string | number
  // top
  t?: string | number
  right?: string | number
  // right
  r?: string | number
  bottom?: string | number
  // bottom
  b?: string | number
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

/**
 * @type PropMappingHandlerReturn
 *
 * [PropMappingHandler](#PropMappingHandler)'s returns
 */
export type PropMappingHandlerReturn = [key: string, val: string] | null

/**
 * @type PropMappingHandler
 *
 * PropMappings processing function, returns `[key: string, val: string] | null`
 */
export type PropMappingHandler<T extends BaseProps> = (
  value: T[keyof T],
  props: T
) => PropMappingHandlerReturn

/**
 * @type PropMappings
 *
 * [PropMappingHandler](#PropMappingHandler)
 */
export type PropMappings<T extends BaseProps> = {
  [key: keyof T]: PropMappingHandler<T>
}
