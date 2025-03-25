import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
  state: () => ({
    errors: [],
    validationErrors: null,
  }),
  actions: {
    dismiss() {
      setTimeout(() => {
        this.errors = [];
      }, 5000);
    },
    addError(error, ajax = true) {
      if (ajax) {
        if (error._data?.errors) {
          for (const key in error._data.errors) {
            this.errors = this.errors.concat(error._data.errors[key]);
          }
        } else {
          this.errors.push(error?._data?.message || 'Undefined error!');
        }
      } else {
        if (Array.isArray(error)) {
          this.errors = this.errors.concat(error);
        } else {
          this.errors.push(error);
        }
      }

      this.dismiss();
    },
    addValidationError(errors) {
      this.validationErrors = errors;
    },
  },
});
