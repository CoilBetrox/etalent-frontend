<template>
  <div class="filters-container">
    <div class="filter-item">
      <label for="search">Búsqueda:</label>
      <input type="text" id="search" v-model="searchQuery" placeholder="SAP"
    </div>
    <div class="filter-item">
      <label for="area">Área:</label>
      <select id="area" v-model="selectedArea">
        <option value="">Todas</option>
        <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
      </select>
    </div>
    <div class="filter-item">
      <label for="category">Categoría:</label>
      <select id="category" v-model="selectedCategory">
        <option value="">Todas</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <!-- 
    <div class="filter-item">
      <label for="startDate">Fecha inicio:</label>
      <input type="date" id="startDate" v-model="startDate">
    </div>
    <div class="filter-item">
      <label for="endDate">Fecha fin:</label>
      <input type="date" id="endDate" v-model="endDate">
    </div>
    -->
    <div class="filter-buttons">
      <button @click="applyFilters">Buscar</button>
      <button @click="clearFilters">Eliminar filtros</button>
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
      searchQuery: '',
      selectedArea: '',
      selectedCategory: '',
      startDate: '',
      endDate: '',
      areas: ['Ventas', 'Marketing', 'Desarrollo', 'Recursos Humanos'],
      categories: ['Enigma', 'Esencial', 'Eminente', 'Dilema', 'Prometedor', 'Experto', 'Riesgo', 'Destacado', 'Sobresaliente'],
      showModal: false, //controla la visibilidad del modal
      showInfo: false,
    };
  },
  components: {
    AgregarNuevoComp,
    InfoCategoriaComp
  },
  methods: {
    applyFilters() {
      this.$emit('filter', {
        searchQuery: this.searchQuery,
        area: this.selectedArea,
        category: this.selectedCategory,
      });
    },
    clearFilters() {
      this.searchQuery = '';
      this.selectedArea = '';
      this.selectedCategory = '';
      this.applyFilters();
    },
    exportToExcel() {
      console.log('Exportar a Excel');
      this.$emit('export-excel');
    },
    exportToPDF() {
      console.log('Exportar a PDF');
      this.$emit('export-pdf');
    }
  }
};
</script>

<style scoped>
.filters-container {
  display: flex;
  width: 100%; 
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-item {
  flex: 1; /* O flex: 0 1 auto; */
  /* margin-bottom: 1rem; */ /* Eliminar esta línea */
}

.filter-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.filter-item input,
.filter-item select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.filter-buttons {
  /* flex-wrap: wrap; */ /* Agregar solo si los botones no caben */
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 10px;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #343a40; /* Gris oscuro */
  color: white;
}

.filter-buttons button:hover {
  opacity: 0.8;
}

/* Estilos específicos para los botones */
.filter-buttons .btn-primary {
  background-color: #007bff;
  color: white;
}

.filter-buttons .btn-secondary {
  background-color: #6c757d;
  color: white;
}

.filter-buttons .btn-success {
  background-color: #28a745;
  color: white;
}
</style>
