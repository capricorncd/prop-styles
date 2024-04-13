/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/03/16 17:23:21 (GMT+0900)
 */
import type { Property } from 'csstype'

/**
 * @type BaseProps
 */
export interface BaseProps {
  // style
  style?: any
  // width
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  // height
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  // display
  flex?: boolean
  grid?: boolean
  inlineFlex?: boolean
  inlineBlock?: boolean
  inline?: boolean
  // flex/grid
  gap?: number | string
  column?: boolean
  align?: Property.AlignItems
  justify?: Property.JustifyContent
  wrap?: boolean | Property.FlexWrap
  // padding
  padding?: number | string
  paddingTop?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  paddingRight?: number | string
  paddingInline?: number | string
  paddingBlock?: number | string
  // margin
  margin?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  marginRight?: number | string
  marginInline?: number | string
  marginBlock?: number | string
  // border-radius
  radius?: string | number
  // font
  fontSize?: string | number
  lineHeight?: string | number
  // color
  color?: string
  background?: string
  // scroll direction
  scroll?: boolean | 'x' | 'y'
  // text
  breakWord?: boolean
  // bold of font
  bold?: boolean
  // thin of font
  thin?: boolean
  // border, border-width, border-color
  border?: string | number
}

/**
 * @PropMappingHandlerReturn
 */
export type PropMappingHandlerReturn = [key: string, val: string] | null

/**
 * @type PropMappingHandler
 */
export type PropMappingHandler<T extends BaseProps> = (
  value: T[keyof T],
  props: T
) => PropMappingHandlerReturn

/**
 * @type PropMappings
 */
export type PropMappings<T extends BaseProps> = {
  [key: keyof T]: PropMappingHandler<T>
}