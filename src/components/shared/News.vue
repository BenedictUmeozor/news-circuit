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
  <div class="flex flex-col h-full border rounded-lg shadow-sm">
    <div class="relative w-full pt-[56.25%]">
      <a
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute inset-0"
      >
        <img
          :src="news.image ?? '/news-placeholder.png'"
          :alt="news.title"
          class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </a>
    </div>

    <div class="flex flex-col flex-grow p-4 space-y-4">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <div class="flex items-center gap-1">
          <Calendar class="w-4 h-4" />
          {{ lightFormat(new Date(news.published_at), 'yyyy-MM-dd') }}
        </div>
        <span class="text-gray-400">|</span>
        <RouterLink
          :to="{ name: 'category', params: { category: news.category } }"
          class="flex items-center gap-1 text-red-500 hover:text-red-600"
        >
          {{ news.category }}
          <MoveUpRight class="w-4 h-4" />
        </RouterLink>
      </div>

      <div class="flex-grow space-y-2">
        <a
          :href="news.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block font-medium hover:underline line-clamp-2"
        >
          {{ news.title }}
        </a>
        <p class="text-gray-600 line-clamp-3">
          {{ news.description }}
        </p>
      </div>

      <Separator class="my-2" />

      <div class="flex items-center justify-between">
        <div class="space-y-1 text-sm">
          <p v-if="news.author" class="italic text-gray-600">
            By {{ news.author }}
          </p>
          <p class="text-gray-500">Source: {{ news.source }}</p>
        </div>
        <Button asChild variant="secondary" size="sm">
          <a
            :href="news.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1"
          >
            Read more
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
