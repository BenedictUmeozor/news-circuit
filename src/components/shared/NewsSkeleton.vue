<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
</script>

<template>
  <div class="space-y-3">
    <Skeleton class="w-full aspect-[6/4]" />
    <div class="space-y-2">
      <Skeleton class="w-full h-6" />
      <Skeleton class="w-full h-6" />
      <Skeleton class="w-full h-6" />
      <Skeleton class="w-full h-6" />
    </div>
  </div>
</template>
