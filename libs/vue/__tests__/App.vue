<script setup lang="ts">
import { usePropStyles } from '../src';
import type { VueBaseProps } from '../src';

const props = defineProps([
  'width','minWidth','maxWidth','height','minHeight','maxHeight',
  'p','pt','pr','pb','pl','px','py',
  'fw','fs','gtc','gtr','display'
]) as any as VueBaseProps;

const { style } = usePropStyles(props);

</script>

<template>
  <div :style="style">Hello world</div>
</template>