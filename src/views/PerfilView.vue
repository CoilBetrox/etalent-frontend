<template>
    <div class="page-background">
  <div class="mi-cuenta-container">
   <img src="@/assets/logo eta-rm.png" alt="Imagen izquierda" class="imagen-lateral izquierda ">  
    <div class="mi-cuenta">
      <h2>Mi Cuenta</h2>
      <div class="perfil-container">
        <div class="datos-perfil">
          <div class="campo">
            <label>Nombre</label>
            <input v-model="perfil.nombreAdmin" @input="validateNombre" :class="{ 'input-error': errores.nombre }" type="text">
            <p v-if="errores.nombre" class="error-msg">El campo Nombre es obligatorio.</p>
          </div>
          <div class="campo">
            <label>SAP</label>
            <input v-model="perfil.sapAdmin" @input="validateSap" :class="{ 'input-error': errores.sap }" type="text">
            <p v-if="errores.sap" class="error-msg">El campo SAP es obligatorio.</p>
          </div>

          <div class="campo">
            <label>Correo</label>
            <input v-model="perfil.correoAdmin" @input="validateCorreo" :class="{ 'input-error': errores.correo }" type="email" disabled>
            <p v-if="errores.correo" class="error-msg">El campo Correo es obligatorio y debe ser un correo electrónico válido.</p>
          </div>

          <div class="campo">
            <label>Provincia</label>
            <input v-model="perfil.provinciaAdmin" type="text" disabled>
          </div>
          <div class="campo">
            <label>Empresa</label>
            <input v-model="perfil.empresaAdmin" type="text" disabled>
          </div>
          <div class="campo">
            <label>Tienda</label>
            <input v-model="perfil.zonaAdmin" type="text" disabled>
          </div>
        </div>
      </div>
      <button @click="actualizarInformacion" class="actualizar-btn">Actualizar Información</button>
      <div v-if="mensaje" :class="['mensaje', { 'exito': !error, 'error': error }]">
        {{ mensaje }}
      </div>
    </div>
    <img src="@/assets/logo eta-rm.png" alt="Imagen derecha" class="imagen-lateral derecha">
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
      mensaje: '',
      error: false,
      errores: {
        nombre: false,
        sap: false,
        correo: false
      }
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
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    },
    async actualizarInformacion() {
      // Validar campos
      if (!this.perfil.nombreAdmin.trim()) {
        this.errores.nombre = true;
        return;
      }
      if (!this.perfil.sapAdmin.match(/^\d{1,8}$/)) {
        this.errores.sap = true;
        return;
      }
     
      try {
        await AdminService.updateAdminProfilePartial({
          nombreAdmin: this.perfil.nombreAdmin,
          sapAdmin: this.perfil.sapAdmin,
        });
        this.mensaje = 'Información actualizada correctamente';
        this.error = false;
      } catch (error) {
        this.mensaje = 'Hubo un error al actualizar la información, vuelva a intentarlo más tarde';
        this.error = true;
        console.error('Error al actualizar el perfil:', error);
      }
    },
    
    validateNombre(event) {
      const value = event.target.value;
      // Remove numbers and trim to 25 characters
      this.perfil.nombreAdmin = value.replace(/\d/g, '').slice(0, 25);

      // Validar si el campo está vacío
      this.errores.nombre = this.perfil.nombreAdmin.trim() === '';
    },

    validateSap(event) {
      const value = event.target.value;
      // Keep only digits and limit to 8 characters
      this.perfil.sapAdmin = value.replace(/\D/g, '').slice(0, 8);

      // Validar si el campo no cumple con el formato
      this.errores.sap = !this.perfil.sapAdmin.match(/^\d{1,8}$/);
    },

    validateCorreo(event) {
      const value = event.target.value;
      this.perfil.correoAdmin = value;

      // Validar si el campo está vacío o no es un correo electrónico válido
      this.errores.correo = !this.isValidEmail(this.perfil.correoAdmin);
    },

    isValidEmail(email) {
      // Expresión regular básica para validar correos electrónicos
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');



.mi-cuenta-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
  padding-top: 0px;
  background-color: #F1F1F2; /* Fondo negro */
}
.imagen-lateral {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.imagen-lateral.izquierda {
  left: 150px;
  animation: slideInLeft 1s ease-in-out;
}

.imagen-lateral.derecha {
  right: 150px;
  animation: slideInRight 1s ease-in-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-150px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(150px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}


.mi-cuenta {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  width: 100%;
  padding: 20px;
  border: 3px solid #000000; /* Borde más grueso */
  border-radius: 20px;
  background-color: #4b4646; /* Fondo blanco para el recuadro */
  color: #ffffff; /* Color del texto dentro del cuadro */

}



h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

.perfil-container {
  display: flex;
  gap: 20px;
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
  font-weight: 700;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-error {
  border-color: #f00;
}

.error-msg {
  color: #f00;
  font-size: 0.9em;
  margin-top: 5px;
}

.actualizar-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #e62e2e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;

}

.actualizar-btn:hover {
  background-color: #c1272d; /* Un rojo más oscuro */
  transform: scale(1.05); /* Aumenta ligeramente el tamaño del botón */
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

.page-background {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
