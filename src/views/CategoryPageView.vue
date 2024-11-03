<script setup lang="ts">
import CategoryPagination from '@/components/shared/CategoryPagination.vue'
import Container from '@/components/shared/Container.vue'
import News from '@/components/shared/News.vue'
import NewsSkeleton from '@/components/shared/NewsSkeleton.vue'
import type { NewsResponse } from '@/interfaces'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/vue-query'
import { computed, useTemplateRef, watch } from 'vue'

const props = defineProps<{ category: string; page: string }>()

const offsetValue = computed(() => (Number(props.page) - 1) * 25)

const { data, isPending, isError, refetch } = useQuery({
  queryKey: ['news', props.category, Number(props.page)],
  queryFn: async (): Promise<NewsResponse> => {
    const response = await api.get(
      `/news?categories=${props.category}&languages=en&limit=25&offset=${offsetValue.value}`,
    )
    return response.data
  },
  staleTime: 1500,
  retry: 2,
})

const div = useTemplateRef('scroll-div')

const allNews = computed(() => data.value?.data ?? [])
const totalPages = computed(() => {
  return Math.floor((data.value?.pagination.total ?? 0) / 25) + 1
})
const currentPage = computed(() => {
  const offsetValue = data.value?.pagination.offset ?? 0
  const limitValue = data.value?.pagination.limit ?? 0
  return Math.floor(offsetValue / limitValue) + 1
})
const lastPage = computed(() => Math.floor(totalPages.value / 25) + 1)

const showPagination = computed(() => {
  return (
    !isError.value &&
    !isPending.value &&
    !!data.value &&
    !!totalPages.value &&
    !!currentPage.value &&
    !!lastPage.value
  )
})

watch(
  () => props.page,
  (newVal, oldVal) => {
    if (typeof oldVal === 'undefined' || newVal !== oldVal) {
      refetch()
      div.value?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div ref="scroll-div" />
  <section class="my-8 space-y-8">
    <Container
      v-if="isPending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <NewsSkeleton v-for="n in 9" :key="n" />
    </Container>
    <Container v-else-if="isError" class="my-16">
      <p class="text-center text-red-500">
        We are having problems communicating with the server at the moment.
        Please try again later
      </p>
    </Container>
    <Container
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <News v-for="news in allNews" :key="news.url" :news="news" />
    </Container>
    <CategoryPagination
      v-if="showPagination"
      :current-page="currentPage"
      :total-pages="totalPages"
      :last-page="lastPage"
      :category="category"
    />
  </section>
</template>
