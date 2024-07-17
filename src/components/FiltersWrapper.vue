<template>
  <FilterComp 
    @filter="handleFilter" 
    @add-new-employee="showAddEmployeeForm" 
    @export-excel="handleExportExcel"
    @export-pdf="handleExportPDF"
  />
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
    },
    handleExportExcel() {
      console.log('Manejando exportación a Excel en FiltersWrapper');
      this.$emit('export-excel');
    },
    handleExportPDF() {
      console.log('Manejando exportación a PDF en FiltersWrapper');
      this.$emit('export-pdf');
    }
  }
};
</script>
