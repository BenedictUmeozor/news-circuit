<script setup lang="ts">
import type { News } from '@/interfaces'
import { Calendar, MoveUpRight } from 'lucide-vue-next'
import { lightFormat } from 'date-fns'
import { RouterLink } from 'vue-router'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

const { news } = defineProps<{ news: News }>()
</script>

<template>
  <div class="space-y-3">
    <a
      :href="news.url"
      target="_blank"
      rel="noopener noreferrer"
      class="block rounded"
    >
      <img
        :src="news.image ?? '/news-placeholder.png'"
        :alt="news.title"
        class="w-full aspect-[6/4] object-cover rounded"
      />
    </a>
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <Calendar class="w-4" />
          {{ lightFormat(new Date(news.published_at), 'yyyy-MM-dd') }}
        </div>
        |
        <RouterLink
          :to="{ name: 'category', params: { category: news.category } }"
          class="flex items-center gap-1 text-red-500"
        >
          {{ news.category }}
          <MoveUpRight class="w-4" />
        </RouterLink>
      </div>
      <a
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="line-clamp-3 block hover:underline"
        >{{ news.title }}</a
      >
      <p class="text-gray-600 line-clamp-4">{{ news.description }}</p>
    </div>
    <Separator />
    <div class="flex items-center justify-between py-1">
      <div class="space-y-1">
        <p v-if="news.author" class="italic">By {{ news.author }}</p>
        <p>Source: {{ news.source }}</p>
      </div>
      <Button asChild>
        <a :href="news.url" target="_blank" rel="noopener noreferrer"
          >Read more</a
        >
      </Button>
    </div>
  </div>
</template>
