<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h1 class="card-title text-center">Iniciar Sesión</h1>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="correo" class="form-label">Correo Electrónico</label>
                <input type="email" id="correo" v-model="correo" class="form-control" required placeholder="Ingrese su correo electrónico">
              </div>
              <div class="mb-3 position-relative">
                <label for="password" class="form-label">Contraseña</label>
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="form-control" required placeholder="Ingrese su contraseña">
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
import AdminService from '@/services/AdminService';
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      correo: '',
      password: '',
      rol: '',
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const response = await AdminService.loginAdmin({
          correoAdmin: this.correo,
          contraAdmin: this.password,
          //rolAdmins: this.rol,
        });
        console.log('Inicio de sesión exitoso:', response);
        
        // Guardar el token y redirigir a la página principal
        if (response.accessToken) {
          console.log('accessToken:', response.accessToken);

          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userRole', JSON.stringify(response.rolAdmins));
          //await this.login( { token: response.accessToken , roles: response.rolAdmins} );
          this.login({ accessToken: response.accessToken, userRole: response.rolAdmins , expiresIn: response.expiresIn});
          this.$router.push('/');
        } else {
          throw new Error('No se recibió un token de acceso');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
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
