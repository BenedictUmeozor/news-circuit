<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{ class?: string }>(), {
  class: '',
})
</script>

<template>
  <div :class="cn('container max-w-7xl px-4 md:px-6 lg:px-8', props.class)">
    <slot />
  </div>
</template>
