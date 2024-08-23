<template>
  <div class="filters-container">
    <div class="filter-buttons">
      <button @click="showInfo = true">Información</button>
      <button @click="showModal = true">Agregar nuevo</button>
      <button @click="exportToExcel">Exportar a Excel</button>
      <button @click="exportToPDF">Exportar a PDF</button>
    </div>
    <AgregarNuevoComp v-if="showModal" @close="showModal = false"/>
    <InfoCategoriaComp v-if="showInfo" @close="showInfo = false"/>
  </div>
</template>

<script>
import AgregarNuevoComp from '@/components/AgregarNuevoComp.vue';
import InfoCategoriaComp from '@/components/InfoCategoriaComp.vue';

export default {
  data() {
    return {
      showModal: false,
      showInfo: false,
    };
  },
  components: {
    AgregarNuevoComp,
    InfoCategoriaComp
  },
  methods: {
    exportToExcel() {
      this.$emit('export-excel');
    },
    exportToPDF() {
      this.$emit('export-pdf');
    }
  }
};
</script>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  align-items: center;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-buttons button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #e62e2e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.filter-buttons button:hover {
  background-color: #c1272d;
  transform: scale(1.05);
}

/* Estilos responsivos */
@media (min-width: 768px) {
  .filter-buttons {
    flex-direction: row;
    gap: 1rem;
  }

  .filter-buttons button {
    width: auto; /* Permitir que los botones tomen el ancho necesario en pantallas grandes */
    margin-top: 0;
  }
}
</style>
