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
 * import { usePropStyles, transform, type VueBaseProps } from '@prop-styles/vue'
 *
 * interface Props extends VueBaseProps {
 *   customProp?: unknown
 * }
 *
 * const props = defineProps<Props>()
 *
 * const { style } = usePropStyles(props, {
 *   // Custom prop mapping handler
 *   customProp: (v: Props['customProp']) => transform('custom-prop', v, 'default value used when v is null/false')
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
import {
  createPropStyles,
  type BaseProps,
  type PropMappings,
} from '@prop-styles/core';
import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core';
import { computed, type ComputedRef, type StyleValue } from 'vue';

export {
  createPropStyles,
  type BaseProps,
  type PropMappings,
  type CreatePropStylesOptions,
} from '@prop-styles/core';

/**
 * @type VueBaseProps
 */
export interface VueBaseProps<Breakpoint extends string = string>
  extends BaseProps<Breakpoint> {
  style?: StyleValue;
  class?: any;
}

export interface UsePropStylesOptions<Breakpoint extends string> {
  breakpoints?: Partial<Record<Breakpoint, number>>;
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
export const usePropStyles = <
  Breakpoint extends string = string,
  T extends VueBaseProps<Breakpoint> = VueBaseProps<Breakpoint>,
>(
  props: T,
  mappings?: PropMappings<T>,
  options: UsePropStylesOptions<Breakpoint> = {}
): UsePropStylesReturn => {
  const breakpoints = useBreakpoints(
    (options.breakpoints || breakpointsBootstrapV5) as Record<
      Breakpoint,
      number
    >
  );
  const active = breakpoints.active();

  const style = computed(() => {
    return [
      props.style,
      createPropStyles(props, mappings, {
        breakpoint: (active.value as Breakpoint) || undefined,
      }),
    ];
  });

  return {
    style,
  };
};

/**
 * @type UsePropStylesReturn
 */
export interface UsePropStylesReturn {
  style: ComputedRef<StyleValue[]>;
}
