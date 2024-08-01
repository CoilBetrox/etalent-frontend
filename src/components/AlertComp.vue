<template>
    <div v-if="alert" :class="['alert', `alert-${alert.type}`]" role="alert">
      {{ alert.message }}
      <button type="button" class="btn-close" @click="clearAlert" aria-label="Close"></button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'AlertComp',
    setup() {
      const store = useStore();
      
      const alert = computed(() => store.getters.alert);
      
      const clearAlert = () => {
        store.dispatch('clearAlert');
      };
  
      return {
        alert,
        clearAlert,
      };
    },
  };
  </script>