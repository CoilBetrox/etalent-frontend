<template>
  <div class="app-container"> <div class="content-wrapper">
    <NavComp v-if="!isLoginRoute" />
    <FiltersWrapper v-if="$route.path === '/feedbacks'" @filter="handleFilter" @add-new-employee="showAddEmployeeForm" />
    <FiltersWrapper @filter="handleFilter" @add-new-employee="showAddEmployeeForm" />
    <RouterView />
  </div>
  </div>
  <footer class="footer">
    <div>
      <FooterComp />
    </div>
  </footer>
</template>


<script>
import NavComp from './components/NavComp.vue';
import FiltersWrapper from './components/FiltersWrapper.vue';
import { useRoute } from 'vue-router';
import FooterComp from './components/FooterComp.vue';

export default {
  name: "App",
  components: {
    NavComp,
    FiltersWrapper,
    FooterComp
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
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.$router.push('/login');
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

.app-container {
  display: flex; /* Permite distribuir el contenido y el footer verticalmente */
  flex-direction: column; /* Apila el contenido y el footer uno encima del otro */
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
}

.content-wrapper {
  flex: 1; /* Permite que el contenido ocupe el espacio disponible */
}

.footer {
  /* Estilos para el footer */
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

</style>
