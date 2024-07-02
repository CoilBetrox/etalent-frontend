PERFIL
<template>
    <div class="perfil">
      <h2>Mi Cuenta</h2>
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group">
            <img src="https://via.placeholder.com/64" alt="Foto de Perfil" class="profile-pic" />
          </div>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="user.nombre" disabled />
          </div>
        </div>
        <div class="form-group">
          <label for="sap">SAP</label>
          <input type="text" id="sap" v-model="user.sap" disabled />
        </div>
        <div class="form-group">
          <label for="correo">Correo</label>
          <input type="email" id="correo" v-model="user.correo" disabled />
        </div>
        <div class="form-group">
          <label for="provincia">Provincia</label>
          <select id="provincia" v-model="user.provincia">
            <option>Pichincha</option>
            <!-- Agrega más opciones aquí -->
          </select>
        </div>
        <div class="form-group">
          <label for="empresa">Empresa</label>
          <select id="empresa" v-model="user.empresa">
            <option>RM</option>
            <!-- Agrega más opciones aquí -->
          </select>
        </div>
        <div class="form-group">
          <label for="tienda">Tienda</label>
          <select id="tienda" v-model="user.tienda">
            <option>Tienda RM 6 de Diciembre</option>
            <!-- Agrega más opciones aquí -->
          </select>
        </div>
        <div class="form-group">
          <label for="foto">Cargar Foto Perfil</label>
          <input type="file" id="foto" @change="handleFileUpload" />
          <p>Max. 50Mb</p>
        </div>
        <button type="submit" class="btn">Actualizar Información</button>
      </form>
      <div v-if="successMessage" class="success-message">Información actualizada correctamente</div>
      <div v-if="errorMessage" class="error-message">Hubo un error al actualizar la información, vuelva a intentarlo más tarde</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          nombre: 'Nombre1 Nombre2 Apellido1 Apellido2',
          sap: '2011528',
          correo: 'email@example.com',
          provincia: 'Pichincha',
          empresa: 'RM',
          tienda: 'Tienda RM 6 de Diciembre',
        },
        foto: null,
        successMessage: false,
        errorMessage: false
      };
    },
    methods: {
      handleFileUpload(event) {
        this.foto = event.target.files[0];
      },
      submitForm() {
        // Aquí puedes manejar el envío del formulario
        // Por ejemplo, enviar los datos a tu API y mostrar los mensajes de éxito o error
        this.successMessage = true;  // Muestra mensaje de éxito
        this.errorMessage = false;  // Asegúrate de que el mensaje de error esté oculto
        console.log('Formulario enviado', this.user, this.foto);
        // Simulación de envío de formulario
        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      }
    }
  };
  </script>
  
  <style scoped>
  .perfil {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .profile-pic {
    width: 64px;
    height: 64px;
    margin-right: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
    width: 100%;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
  }
  
  .btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
    text-align: center;
  }
  
  .btn:hover {
    background-color: #555;
  }
  
  .success-message {
    color: green;
    margin-top: 1rem;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>
  