import type { Breakpoint } from './types';

/**
 * @constant DEFAULT_BREAKPOINTS
 *
 * Default minimum width values (in pixels) for each breakpoint
 * These values are used when breakpoints parameter is true or not provided
 *
 * @example
 * ```js
 * DEFAULT_BREAKPOINTS.xs // 640
 * DEFAULT_BREAKPOINTS.sm // 768
 * DEFAULT_BREAKPOINTS.md // 1024
 * DEFAULT_BREAKPOINTS.lg // 1280
 * DEFAULT_BREAKPOINTS.xl // 1536
 * DEFAULT_BREAKPOINTS.xxl // 1920
 * ```
 */
export const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
  xxl: 1920,
};

/**
 * @method getDefaultBreakpoint(breakpoints)
 *
 * Determines the active breakpoint based on window width using media queries
 *
 * @param breakpoints? `boolean | Record<Breakpoint, number>` - Configuration for breakpoint detection:
 *   - `true` to use DEFAULT_BREAKPOINTS
 *   - `false` or `undefined` to disable responsive behavior
 *   - `Record<Breakpoint, number>` to use custom breakpoint values
 *
 * @returns The active breakpoint key based on current window width, or undefined if:
 *   - breakpoints is false/undefined (responsive disabled)
 *   - running in non-browser environment
 *   - no breakpoint matches current width
 *
 * @example
 * ```js
 * // Use default breakpoints
 * getDefaultBreakpoint(true) // 'md' if window width >= 1024px
 *
 * // Use custom breakpoints
 * getDefaultBreakpoint({ sm: 500, md: 1000 })
 *
 * // Disable responsive behavior
 * getDefaultBreakpoint(false) // undefined
 * ```
 */
export const getDefaultBreakpoint = (
  breakpoints?: boolean | Record<Breakpoint, number>
): Breakpoint | undefined => {
  // If breakpoints explicitly disabled, return undefined so caller can skip responsive logic
  if (!breakpoints) return undefined;

  const bpMap: Record<Breakpoint, number> =
    breakpoints === true ? DEFAULT_BREAKPOINTS : breakpoints;

  const entries = Object.entries(bpMap).sort((a, b) => a[1] - b[1]);

  // If not running in a browser, return the smallest breakpoint key
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return;
  }

  // Use media queries to determine the active breakpoint. We pick the largest
  // breakpoint whose min-width matches the current viewport.
  for (const [key, val] of entries) {
    try {
      if (window.matchMedia(`(min-width: ${val}px)`).matches) {
        return key as Breakpoint;
      }
    } catch (e) {
      // If matchMedia throws for some reason, fall back to first key
      // and continue.
    }
  }
};
