<template>
  <div>
    <NavComp v-if="!isLoginRoute" />
    <RouterView />
  </div>
  <FiltersWrapper @filter="handleFilter" @add-new-employee="showAddEmployeeForm" />
  
</template>

<script>
import NavComp from './components/NavComp.vue';
import FiltersWrapper from './components/FiltersWrapper.vue';
import { useRoute } from 'vue-router';

export default {
  name: "App",
  components: {
    
  },
  data() {
    return {
      // ... (otros datos de la aplicación)
    };
  },
  methods: {
    handleFilter(filters) {
      // Lógica para filtrar los datos de los empleados
    },
    showAddEmployeeForm() {
      // Lógica para mostrar el formulario de agregar nuevo empleado
    },
    editEmployee(employeeId) {
      // Lógica para editar el empleado con el ID dado
    },
    deleteEmployee(employeeId) {
      // Lógica para eliminar el empleado con el ID dado
    },
    showFeedback(employeeId) {
      // Lógica para mostrar el feedback del empleado con el ID dado
    }
  },
  setup() {
    const route = useRoute();
    const isLoginRoute = route.path === '/login' || route.path === '/register';
    return {
      isLoginRoute
    };
  }
}
</script>


<style>
/* Estilos globales */
.navbar-brand,
.nav-link {
  color: white !important;
  /* !important para sobrescribir estilos de Bootstrap */
}
</style>
