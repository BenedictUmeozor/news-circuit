<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import Container from '../shared/Container.vue'
import Searchbar from './Searchbar.vue'
import Separator from '../ui/separator/Separator.vue'
import { CATEGORIES } from '@/lib/constants'
import { Button } from '../ui/button'
import { MoveUpRight } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

const route = useRoute()

const activeCategory = ref(route.params.category)

const activeCategoryValue = computed(() => {
  if (typeof activeCategory.value !== 'string') return ''
  return activeCategory.value
})

watch(
  () => route.params.category,
  value => {
    activeCategory.value = value
  },
)
</script>

<template>
  <header class="pt-4 pb-2">
    <Container
      class="flex flex-col gap-y-4 lg:flex-row items-center justify-between"
    >
      <RouterLink to="/">
        <h1 class="text-xl lg:text-2xl font-bold tracking-wide">NewsCircuit</h1>
      </RouterLink>
      <Searchbar />
    </Container>
  </header>
  <Separator class="my-2" />
  <nav>
    <Container
      class="lg:flex items-center justify-center gap-4 overflow-x-auto"
    >
      <Button
        v-for="category in CATEGORIES"
        :key="category"
        variant="ghost"
        asChild
      >
        <RouterLink
          :to="{ name: 'category', params: { category: category } }"
          :class="cn(activeCategoryValue === category && 'text-red-500')"
          class="flex items-center gap-1 capitalize"
        >
          {{ category }} <MoveUpRight class="w-3"
        /></RouterLink>
      </Button>
    </Container>
  </nav>
</template>
