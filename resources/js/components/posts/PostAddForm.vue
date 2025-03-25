<script setup>
import { useErrorStore } from '@/stores/error';
import { usePostStore } from '@/stores/post';
import { shallowRef } from 'vue';

  const dialog = shallowRef(false)
  const errorStore = useErrorStore()
  const postStore = usePostStore()

  const form = ref({
    title: '',
    description: '',
  })

  const resetForm = () => {
    form.value = {
      title: '',
      description: '',
    }
  }

  const savePost = async () => {
    try {
      await postStore.createPost(form.value)
      dialog.value = false
      resetForm()
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <VDialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <VBtn
        append-icon="mdi-plus"
        type="button"
        class="mb-4"
        color="primary"
        v-bind="activatorProps"
      >
        + Add
      </VBtn>
    </template>

    <VCard>
      <VCardTitle>Add Post</VCardTitle>
      <VForm @submit.prevent="savePost">
        <div v-if="errorStore.validationErrors">
          <VAlert
            color="error"
            class="app-error-message"
          >
            <ul>
              <li v-for="(error, key) in errorStore.validationErrors" :key="key">{{ error.join('') }}</li>
            </ul>
          </VAlert>
        </div>
        <VCardText>
          <VTextField
            v-model="form.title"
            label="Title *"
            class="mb-4"
            required
          />
          <VTextarea
            v-model="form.description"
            label="Description *"
            class="mb-4"
            required
          />
          <small class="text-caption text-medium-emphasis">* indicates required field</small>
        </VCardText>

        <VDivider></VDivider>

        <VCardActions
          class="d-flex justify-end mt-2">
          <VBtn
              text="Close"
              @click="dialog = false"
            ></VBtn>

            <VBtn
              color="primary"
              text="Save"
              type="submit"
              :disabled="postStore.loading"
            ></VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>
