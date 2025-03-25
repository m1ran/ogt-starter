import { defineStore } from "pinia";
import { useErrorStore } from './error';

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    loading: false,
    pagination: {
      page: 1,
      perPage: 10,
      total: 100,
    },
  }),
  actions: {
    async createPost(post) {
      this.loading = true
      const errorStore = useErrorStore()
      errorStore.addValidationError(null)

      try {
        await $api('/api/posts', {
          method: 'POST',
          body: post,
          onResponseError({ response }) {
            errorStore.addValidationError(response?._data?.errors)
          }
        })

        await this.fetchPosts()
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchPosts(pageNum = 1, perPage = 10, search = '') {
      this.loading = true
      const errorStore = useErrorStore();

      try {
        const response = await $api('/api/posts', {
          method: 'GET',
          params: {
            search,
            page: pageNum,
            per_page: perPage,
          },
          onResponseError({ response }) {
            errorStore.addError(response)
          }
        })

        const { posts, page, per_page, total } = response

        this.posts = posts
        this.pagination.page = page
        this.pagination.perPage = per_page
        this.pagination.total = total
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
});
