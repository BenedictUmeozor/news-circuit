<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Input } from '../ui/input'

const router = useRouter()

const handleSubmit = (e: Event) => {
  const formData = new FormData(e.target as HTMLFormElement)
  const searchTerm = formData.get('search') as string
  router.push({ name: 'search', params: { query: searchTerm } })
}
</script>

<template>
  <form class="relative w-full max-w-xs" @submit.prevent="handleSubmit">
    <Input placeholder="Search news..." name="search" class="w-full" />
  </form>
</template>
