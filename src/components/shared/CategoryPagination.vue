<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { Button } from '../ui/button'
import { RouterLink } from 'vue-router'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'
import Container from './Container.vue'

const { currentPage, totalPages, lastPage } = defineProps<{
  currentPage: number
  totalPages: number
  lastPage: number
  category: string
}>()
</script>

<template>
  <Container class="flex justify-center">
    <Pagination
      v-slot="{ page }"
      :total="totalPages"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst>
          <RouterLink
            :to="{ name: 'category-page', params: { page: 1, category } }"
          >
            <ChevronsLeft class="w-4" />
          </RouterLink>
        </PaginationFirst>
        <PaginationPrev>
          <RouterLink
            :to="{
              name: 'category-page',
              params: { page: currentPage - 1, category },
            }"
            v-if="currentPage > 1"
          >
            <ChevronLeft class="w-4" />
          </RouterLink>
        </PaginationPrev>

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              asChild
              :variant="item.value === page ? 'default' : 'outline'"
            >
              <RouterLink
                :to="{
                  name: 'category-page',
                  params: { page: item.value, category },
                }"
              >
                {{ item.value }}
              </RouterLink>
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext>
          <RouterLink
            :to="{
              name: 'category-page',
              params: { page: currentPage + 1, category },
            }"
            v-if="currentPage < lastPage"
          >
            <ChevronRight class="w-4" />
          </RouterLink>
        </PaginationNext>
        <PaginationLast>
          <RouterLink
            :to="{
              name: 'category-page',
              params: { page: lastPage, category },
            }"
          >
            <ChevronsRight class="w-4" />
          </RouterLink>
        </PaginationLast>
      </PaginationList>
    </Pagination>
  </Container>
</template>
