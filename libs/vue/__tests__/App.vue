<script lang="ts" setup>
import { usePropStyles, type VueBaseProps } from '../src'
const props = defineProps<VueBaseProps<'xs'>>()

const { style } = usePropStyles(props)
</script>

<template>
  <div :style="style">Hello world</div>
</template>