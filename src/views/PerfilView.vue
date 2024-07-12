<template>
  <div class="mi-cuenta">
    <h2>Mi Cuenta</h2>
    <div class="perfil-container">
      <div class="foto-perfil">
        <img :src="fotoPerfil" alt="Foto de perfil" width="64" height="64" />
      </div>
      <div class="datos-perfil">
        <div class="campo">
          <label>Nombre</label>
          <input v-model="perfil.nombreAdmin" type="text" disabled>
        </div>
        <div class="campo">
          <label>SAP</label>
          <input v-model="perfil.sapAdmin" type="text" disabled>
        </div>
        <div class="campo">
          <label>Correo</label>
          <input v-model="perfil.correoAdmin" type="email" disabled>
        </div>
        <div class="campo">
          <label>Provincia</label>
          <input v-model="perfil.provinciaAdmin" type="email" disabled>
          <!-- 
          <select v-model="perfil.provinciaAdmin">
            <option value="Pichincha">{{ perfil.provinciaAdmin }}</option>
            
          </select>
          -->
        </div>
        <div class="campo">
          <label>Empresa</label>
          <input v-model="perfil.empresaAdmin" type="email" disabled>
          <!-- 
          <select v-model="perfil.empresaAdmin">
            <option value="RM">RM</option>
            
          </select>
          -->
        </div>
        <div class="campo">
          <label>Tienda</label>
          <input v-model="perfil.zonaAdmin" type="email" disabled>
          <!-- 
          <select v-model="perfil.zonaAdmin">
            <option value="Tienda RM 6 de Diciembre">Tienda RM 6 de Diciembre</option>
            
          </select>
          -->
        </div>
        <div class="campo">
          <label>Cargar Foto Perfil</label>
          <input type="file" @change="cargarFoto" accept="image/*">
          <span class="file-info">Max. 50Mb</span>
          <span class="file-chosen">No file chosen</span>
        </div>
      </div>
    </div>
    <button @click="actualizarInformacion" class="actualizar-btn">Actualizar Información</button>
    <div v-if="mensaje" :class="['mensaje', { 'exito': !error, 'error': error }]">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService';

export default {
  name: 'MiPerfilView',
  data() {
    return {
      perfil: {
        nombreAdmin: '',
        sapAdmin: '',
        correoAdmin: '',
        provinciaAdmin: '',
        empresaAdmin: '',
        zonaAdmin: ''
      },
      fotoPerfil: '',
      mensaje: '',
      error: false
    };
  },
  mounted() {
    this.cargarPerfil();
  },
  methods: {
    async cargarPerfil() {
      try {
        const response = await AdminService.getAdminProfile();
        this.perfil = response;
        this.fotoPerfil = response.fotoPerfil || 'ruta/a/imagen/por/defecto.jpg';
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    },
    async actualizarInformacion() {
      try {
        await AdminService.updateAdminProfilePartial({
          provinciaAdmin: this.perfil.provinciaAdmin,
          empresaAdmin: this.perfil.empresaAdmin,
          zonaAdmin: this.perfil.zonaAdmin
        });
        this.mensaje = 'Información actualizada correctamente';
        this.error = false;
      } catch (error) {
        this.mensaje = 'Hubo un error al actualizar la información, vuelva a intentarlo más tarde';
        this.error = true;
        console.error('Error al actualizar el perfil:', error);
      }
    },
    async cargarFoto(event) {
      const file = event.target.files[0];
      if (file && file.size <= 50 * 1024 * 1024) { // 50MB max
        const formData = new FormData();
        formData.append('foto', file);
        try {
          const response = await AdminService.updateAdminProfilePhoto(formData);
          this.fotoPerfil = response.url;
        } catch (error) {
          console.error('Error al cargar la foto:', error);
        }
      } else {
        alert('El archivo es demasiado grande. El tamaño máximo es 50MB.');
      }
    }
  }
}
</script>

<style scoped>
.mi-cuenta {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.perfil-container {
  display: flex;
  gap: 20px;
}

.foto-perfil img {
  width: 64px;
  height: 64px;
  background-color: #ccc;
}

.datos-perfil {
  flex-grow: 1;
}

.campo {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  display: none;
}

.file-info {
  font-size: 0.8em;
  color: #666;
}

.file-chosen {
  display: inline-block;
  margin-left: 10px;
  font-size: 0.9em;
  color: #333;
}

.actualizar-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 20px;
}

.mensaje {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.exito {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>