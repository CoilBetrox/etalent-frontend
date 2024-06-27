<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h1 class="card-title text-center">ETalent Login</h1>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo Electrónico</label>
                  <input type="text" id="correo" v-model="correo" class="form-control" required>
                </div>
                <div class="mb-3 position-relative">
                  <label for="password" class="form-label">Contraseña</label>
                  <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" required>
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" @click="togglePasswordVisibility" class="toggle-password"></i>
                </div>
                <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <div class="text-center mt-3">
                <router-link to="/register" class="btn btn-link">Registrarse</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiAdmin from '@/services/AdminService'

  export default {
    name: 'LoginView',
    data() {
      return {
        correo: '',
        password: '',
        showPassword: false
      };
    },
    methods: {
      async handleLogin() {
        try {
            const response = await apiAdmin.post('/login',{
                correo: this.correo,
                passwod: this.password
            });
            console.log('Inicio existoso:', response.data);
            localStorage.setItem('token', response.data.token);
            this.$router.push('/');
        } catch (error) {
            console.error('Error al iniciar sesion:', error);
            alert('Correo o contraseña incorrectos');
        } 
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
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
  