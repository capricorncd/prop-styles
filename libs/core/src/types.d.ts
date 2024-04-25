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
  // align-content
  alignContent?: Property.AlignContent
  // justify-content
  justify?: Property.JustifyContent
  // justify-items
  justifyItems?: Property.JustifyItems
  // flex-wrap
  wrap?: boolean | Property.FlexWrap
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
  // bold of font
  bold?: boolean
  // thin of font
  thin?: boolean | string
  fontWeight?: Property.FontWeight
  // fontWeight
  fw?: Property.FontWeight
  // border, border-width, border-color
  border?: string | number
  // grid-template-columns
  tempColumns?: string
  // grid-template-rows
  tempRows?: string
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
 * PropMappings processing function, returns [PropMappingHandlerReturn](#PropMappingHandlerReturn)
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
