import { useCookie } from '@/@core/composable/useCookie';
import { router } from '@/plugins/1.router';
import { defineStore } from "pinia";
import { nextTick } from 'vue';
import { useErrorStore } from './error';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      if (!useCookie('accessToken').value) {
        this.logout()
      }

      const errorStore = useErrorStore();

      try {
        const response = await $api('/api/user', {
          method: 'GET',
            onResponseError({ response }) {
              errorStore.addError(response)
              this.logout()
            }
        })
    
        const { user } = response

        this.user = user
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      this.user = null
      useCookie('accessToken').value = null

      await nextTick(() => {
        router.push('/login')
      })
    }
  },
});
