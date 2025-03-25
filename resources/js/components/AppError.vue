<script setup>
import { useErrorStore } from '@/stores/error';
import { ref, watch } from 'vue';

const handleAlertClose = () => {
  isAlertVisible.value = false;
}

const errorStore = useErrorStore()
const isAlertVisible = ref(errorStore.errors.length > 0)

watch(() => errorStore.errors.length, (newLength) => {
  if (newLength > 0) {
    isAlertVisible.value = true
  }
})
</script>

<template>
  <div>
    <VAlert v-if="errorStore.errors.length" color="error" closable close-label="Close Alert"
      v-model="isAlertVisible"
      @update:modelValue="handleAlertClose"
      class="m-4 position-absolute app-error-message" style="z-index: 100;">
      <slot v-if="errorStore.errors === 1">{{ errorStore.errors[0] }}</slot>
      <ul v-else>
        <li v-for="(error, key) in errorStore.errors" :key="key">{{ error }}</li>
      </ul>
    </VAlert>
  </div>
</template>

<style lang="scss">
.app-error-message {
  z-index: 100;
  inline-size: 96%;
  margin-block: 20px;
  margin-inline: 2%;
}
</style>
