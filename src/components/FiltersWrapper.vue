<template>
  <FilterComp v-if="$route.path === '/feedbacks'" @filter="handleFilter" @add-new-employee="showAddEmployeeForm" />
</template>

<script>
import FilterComp from './FilterComp.vue';

export default {
  components: { FilterComp },
  methods: {
    handleFilter(filters) {
      this.$emit('filter', filters);
    },
    showAddEmployeeForm() {
      this.$emit('add-new-employee');
    }
  }
};
</script>
