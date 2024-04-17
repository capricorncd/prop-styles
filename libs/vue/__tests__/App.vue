<script lang="ts" setup>
import { usePropStyles, type VueBaseProps } from '../src'
import { defineProps } from 'vue'

const props = defineProps<VueBaseProps>();

const { style } = usePropStyles(props)
</script>

<template>
  <div :style="style">Hello world</div>
</template>