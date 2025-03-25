<script setup>
  import { usePostStore } from '@/stores/post';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { onMounted, ref, watch } from 'vue';

  const search = ref('')
  const postStore = usePostStore()

  const headers = [
    { title: 'Title', key: 'title' },
    { title: 'Description', key: 'description' },
    { title: 'Created At', key: 'created_at' },
  ]

  onMounted(() => {
    postStore.fetchPosts()
  })

  const handleSearch = debounce((value) => {
    postStore.fetchPosts(1, postStore.pagination.perPage, value)
  }, 1000)

  const handlePageChange = (page) => {
    postStore.fetchPosts(page, postStore.pagination.perPage, search.value)
  }

  const handleItemsPerPageChange = (perPage) => {
    if (postStore.pagination.perPage !== perPage) {
      postStore.pagination.perPage = perPage
    }
    postStore.fetchPosts(1, perPage, search.value)
  }

  watch(() => search.value, handleSearch)
</script>

<template>
  <VCard title="Posts">
    <VCardText>
      <PostAddForm />
      <VTextField
        v-model="search"
        label="Search"
        class="mb-4"
      />
      <VDataTableServer
        :headers="headers"
        :items="postStore.posts"
        :items-per-page="postStore.pagination.perPage"
        :page="postStore.pagination.page"
        :loading="postStore.loading"
        loading-text="Loading..."
        no-data-text="No posts found"
        no-results-text="No results found"
        :items-length="postStore.pagination.total"
        @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange"
      >
        <template #[`item.created_at`]="{ item }">
          {{ dayjs(item.created_at).format('DD.MM.YYYY HH:mm') }}
        </template>
      </VDataTableServer>
    </VCardText>
  </VCard>
</template>
