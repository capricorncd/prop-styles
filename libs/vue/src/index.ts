/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2024/04/16 21:09:45 (GMT+0900)
 *
 * @document @prop-styles/vue
 *
 * <p>
 * <a href="https://npmcharts.com/compare/@prop-styles/vue?minimal=true"><img src="https://img.shields.io/npm/dm/@prop-styles/vue.svg?sanitize=true" alt="Downloads"></a>
 * <a href="https://www.npmjs.com/package/@prop-styles/vue"><img src="https://img.shields.io/npm/v/@prop-styles/vue.svg?sanitize=true" alt="Version"></a>
 * <a href="https://www.npmjs.com/package/@prop-styles/vue"><img src="https://img.shields.io/npm/l/@prop-styles/vue.svg?sanitize=true" alt="License"></a>
 * </p>
 *
 * Process CSS-related properties in Props so that they can generate the element style.
 *
 * ```bash
 * npm i @prop-styles/vue
 * ```
 *
 * App.vue
 *
 * ```vue
 * <script setup lang="ts">
 * import { usePropStyles, f, type VueBaseProps } from '@prop-styles/vue'
 *
 * interface Props extends VueBaseProps {
 *   customProp?: unknown
 * }
 *
 * const props = defineProps<Props>()
 *
 * const { style } = usePropStyles(props, {
 *   // Custom prop mapping handler
 *   customProp: (v: Props['customProp']) => f('custom-prop', v, 'default value used when v is null/false')
 * })
 * </script>
 *
 * <template>
 *   <div :style="{style}"></div>
 * </template>
 * ```
 *
 * ```vue
 * <App width="100" radius="12 12 0 12" marginTop="20" />
 * // <div style="width:100px;border-radius:12px 12px 0 12px;margin-top:20px;"></div>
 * ```
 */
import { createPropStyles } from '@prop-styles/core'
import { computed, type ComputedRef, type StyleValue } from 'vue'
import type { BaseProps, PropMappings } from '@prop-styles/core'

export * from '@prop-styles/core'

/**
 * @type VueBaseProps
 */
export interface VueBaseProps extends BaseProps {
  class?: any
}

/**
 * @method usePropStyles<T extends BaseProps>(props, mappings)
 *
 * Convert component properties to Style key-value pair objects
 *
 * @param props `T` Component properties
 * @param mappings? `PropMappings<T>` [PropMappings](#PropMappings)
 * @returns `UsePropStylesReturn`
 */
export function usePropStyles<T extends BaseProps>(
  props: T,
  mappings?: PropMappings<T>
): UsePropStylesReturn {
  const style = computed(() => {
    const _styles: StyleValue[] = [props.style].flat()
    const style = createPropStyles(
      {
        ...props,
        style: {},
      },
      mappings
    )
    _styles.push(style)
    return _styles
  })
  return {
    style,
  }
}

/**
 * @type UsePropStylesReturn
 */
export interface UsePropStylesReturn {
  style: ComputedRef<StyleValue[]>
}
