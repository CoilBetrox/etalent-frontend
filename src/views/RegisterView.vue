<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h1 class="card-title text-center">ETalent Registro</h1>
              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="nombreAdmin" class="form-label">Nombre y Apellido</label>
                  <input type="text" id="nombreAdmin" v-model="nombreAdmin" class="form-control" required placeholder="Ingrese su nombre y apellido">
                </div>
                <div class="mb-3">
                  <label for="sapAdmin" class="form-label">SAP</label>
                  <input type="text" id="sapAdmin" v-model="sapAdmin" class="form-control" title="Debe contener 8 dígitos" placeholder="Ingrese su número SAP">
                </div>
                <div class="mb-3">
                  <label for="correoAdmin" class="form-label">Correo Electrónico</label>
                  <input type="email" id="correoAdmin" v-model="correoAdmin" class="form-control" required placeholder="Ingrese su correo electrónico">
                </div>
                <div class="mb-3 position-relative">
                  <label for="contraAdmin" class="form-label">Contraseña</label>
                  <input :type="showPassword ? 'text' : 'password'" id="contraAdmin" v-model="contraAdmin" class="form-control" required placeholder="Ingrese una contraseña segura">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" @click="togglePasswordVisibility" class="toggle-password"></i>
                </div>
                <div class="mb-3">
                  <label for="empresaAdmin" class="form-label">Empresa</label>
                  <select id="empresaAdmin" v-model="empresaAdmin" class="form-select" required>
                    <option value="" disabled>Seleccione una empresa</option>
                    <option value="Etafashion">Etafashion</option>
                    <option value="RM">RM</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="provinciaAdmin" class="form-label">Provincia</label>
                  <select id="provinciaAdmin" v-model="provinciaAdmin" @change="updateZonas" class="form-select" required>
                    <option value="" disabled>Seleccione una provincia</option>
                    <option value="Azuay">Azuay</option>
                    <option value="Chimborazo">Chimborazo</option>
                    <option value="Cotopaxi">Cotopaxi</option>
                    <option value="Esmeraldas">Esmeraldas</option>
                    <option value="Guayas">Guayas</option>
                    <option value="Imbabura">Imbabura</option>
                    <option value="Loja">Loja</option>
                    <option value="Los Ríos">Los Ríos</option>
                    <option value="Machala">Machala</option>
                    <option value="Manabí">Manabí</option>
                    <option value="Pichincha">Pichincha</option>
                    <option value="Tungurahua">Tungurahua</option>
                    
                    <!-- Añadir más provincias según sea necesario -->
                  </select>
                </div>
                <div class="mb-3">
                  <label for="zonaAdmin" class="form-label">Tienda</label>
                  <select id="zonaAdmin" v-model="zonaAdmin" class="form-select" required>
                    <option value="" disabled>Seleccione una zona</option>
                    <option v-for="zona in zonas" :key="zona" :value="zona">{{ zona }}</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary w-100">Registrarse</button>
              </form>
              <div class="text-center mt-3">
                <router-link to="/login" class="btn btn-link">Iniciar Sesión</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';

  export default {
    name: 'RegisterView',
    data() {
      return {
        nombreAdmin: '',
        sapAdmin: '',
        correoAdmin: '',
        contraAdmin: '',
        empresaAdmin: '',
        provinciaAdmin: '',
        zonaAdmin: '',
        estadoAdmin:'',
        rolAdmin:'',
        showPassword: false,
        zonas: []
      };
    },
    methods: {
      async handleRegister() {
        try {
            const response = await AdminService.registerAdmin({
                nombreAdmin: this.nombreAdmin,
                sapAdmin: this.sapAdmin,
                correoAdmin: this.correoAdmin,
                contraAdmin: this.contraAdmin,
                empresaAdmin: this.empresaAdmin,
                provinciaAdmin: this.provinciaAdmin,
                zonaAdmin: this.zonaAdmin,
                rolAdmin:'JefeTienda',
                estadoAdmin: 'Activo'
            });
            console.log('Respuesta del registro:', response);

            alert('Registro exitoso. Ahora puede iniciar sesión');
            this.$router.push('/login');
            
        } catch (error) {
            console.error('Error al registrarse:', error);
            
            if (error.response) {
              console.error('Respuesta del sevidor:', error.response.data);
              alert(`Error al registrarse: ${error.response.data.message || 'Verifique los datos y vuelva a intentar'}`);
            } else if (error.request) {
              console.error('No se recibió respuesta del servidor');
              alert('Error de conexion. Verifique la conexion');
            } else {
              console.error('Error de la configuracion de la solicitud:', error.message);
              alert('Error al registrarse, intente nuevamente');
            }
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      updateZonas() {
        // Actualizar las zonas según la provincia seleccionada
        if (this.provinciaAdmin === 'Azuay') {
          this.zonas = ['Tienda Mall del Rio', 'R.M. Mall del Río', 'R.M Monay'];
        } else if (this.provinciaAdmin === 'Chimborazo') {
          this.zonas = ['Tienda Riobamba', 'R.M. Riobamba'];
        } else if (this.provinciaAdmin === 'Cotopaxi') {
          this.zonas = ['Tienda Latacunga', 'R.M. Latacunga'];
        } else if (this.provinciaAdmin === 'Esmeraldas') {
            this.zonas = ['R.M. Esmeraldas'];
        } else if (this.provinciaAdmin === 'Guayaquil') {
            this.zonas = ['Tienda Citymall', 'Tienda Los Ceibos', 'Tienda Mall del Sur', 
            'Tienda Mall del Norte', 'Tienda Guayaquil', 'Tienda Mall del Sol', 
            'Tienda San Marino', 'R.M. City Mall', 'R.M. Terminal Terrestre', 
            'R.M. Gye Centro', 'R.M. Duran', 'R.M. Río Centro Dorado', 
            'R.M Río Centro Norte', 'R.M. Ceibos'];
        } else if (this.provinciaAdmin === 'Imbabura') {
            this.zonas = ['Tienda Ibarra', 'R.M. Ibarra'];
        } else if (this.provinciaAdmin === 'Loja') {
            this.zonas = ['Tienda Loja', 'R.M. Loja'];
        } else if (this.provinciaAdmin === 'Los Ríos') {
            this.zonas = ['Tienda Babahoyo', 'R.M. Babahoyo'];
        } else if (this.provinciaAdmin === 'Machala') {
            this.zonas = ['Tienda Machala', 'Tienda Machala Expoceanica', 'R.M. Machala'];
        } else if (this.provinciaAdmin === 'Manabi') {
            this.zonas = ['Tienda Mall Pacífico', 'R.M. Mall Pacífico'];
        } else if (this.provinciaAdmin === 'Pichincha') {
            this.zonas = ['Tienda Quicentro Sur', 'Tienda Recreo', 'Tienda Pananorte',
                'Tienda San Luis Shopping', 'Tienda CCI', 'Tienda 9 de Octubre', 
                'Tienda Condado', 'Tienda Scala', 'Tienda Quicentro Norte', 'Tienda Bosque', 
                'R.M. Río Centro Sur', 'R.M. Recreo', 'R.M. Condado', 'R.M. Portal Shoping', 
                'R.M. Quicentro Sur', 'R.M. 6 de Diciembre', 'R.M. Batán', 'R.M Venezuela'];
        } else if (this.provinciaAdmin === 'Tungurahua') {
            this.zonas = ['Tienda Mall de los Andes', 'R.M. Ambato', 'R.M. Ambato Mall Andes',
                'R.M. Paseo Shopping Ambato'];
        } else {
          this.zonas = [];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    padding: 2rem;
  }
  .position-relative {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    top: 70%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
  </style>
  