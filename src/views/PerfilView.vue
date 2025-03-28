<template>
  <div class="page-background">
    <div class="mi-cuenta-container">
      
      <div class="mi-cuenta">
        <h2>Mi Cuenta</h2>
        <div class="perfil-container">
          <div class="datos-perfil">
            <div class="campo">
              <label>Nombre</label>
              <input v-model="perfil.nombreAdmin" @input="validateNombre" :class="{ 'input-error': errores.nombre }"
                type="text">
              <p v-if="errores.nombre" class="error-msg">El campo Nombre es obligatorio.</p>
            </div>
            <div class="campo">
              <label>SAP</label>
              <input v-model="perfil.sapAdmin" @input="validateSap" :class="{ 'input-error': errores.sap }" type="text">
              <p v-if="errores.sap" class="error-msg">El campo SAP es obligatorio.</p>
            </div>

            <div class="campo">
              <label>Correo</label>
              <input v-model="perfil.correoAdmin" @input="validateCorreo" :class="{ 'input-error': errores.correo }"
                type="email" disabled>
              <p v-if="errores.correo" class="error-msg">El campo Correo es obligatorio y debe ser un correo electrónico
                válido.</p>
            </div>

            <div class="campo">
              <label for="provinciaAdmin" class="form-label">Provincia</label>
              <select id="provinciaAdmin" v-model="perfil.provinciaAdmin" @change="updateTiendas" class="form-select">
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

            <div class="campo">
              <label for="empresaAdmin" class="form-label">Empresa</label>
              <select id="empresaAdmin" v-model="perfil.empresaAdmin" class="form-select">
                <option value="" disabled>Seleccione una empresa</option>
                <option value="Comercial Etatex C. A.">Comercial Etatex C. A.</option>
                <option value="Tiendec S. A">Tiendec S. A</option>
                <!-- Añadir más empresas según sea necesario -->
              </select>
            </div>

            <div class="campo">
              <label>Zona</label>
              <input v-model="perfil.zonaAdmin" type="text" disabled>
            </div>
          </div>
        </div>
        <button @click="actualizarInformacion" class="actualizar-btn">Actualizar Información</button>
        <div v-if="mensaje" :class="['mensaje', { 'exito': !error, 'error': error }]">
          {{ mensaje }}
        </div>
      </div>
      
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
          provinciaAdmin: this.perfil.provinciaAdmin,
          empresaAdmin: this.perfil.empresaAdmin
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
  
  padding-top: 0px;
  background-color: #F1F1F2;
  /* Fondo negro */

}

.imagen-lateral {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.imagen-lateral.izquierda {
  left: 150px;
  animation: slideInLeft 1s ease-in-out;
  animation-fill-mode: forwards;
  /* Cambiar 'none' a 'forwards' */


}

.imagen-lateral.derecha {
  right: 150px;
  animation: slideInRight 1s ease-in-out;
  animation-fill-mode: forwards;
  /* Cambiar 'none' a 'forwards' */

}

@keyframes slideInLeft {
  from {
    transform: translate(-150px, 0);
    opacity: 1;
  }

  to {
    transform: translate(0, -20px);
    /* Subir la imagen 20px hacia arriba */
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translate(150px, 0);
    opacity: 1;
  }

  to {
    transform: translate(0, -20px);
    /* Subir la imagen 20px hacia arriba */
    opacity: 1;
  }
}

.mi-cuenta {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  width: 70%;
  padding: 20px;
  border: 3px solid #000000;
  /* Borde más grueso */
  border-radius: 20px;
  background-color: #4b4646;
  /* Fondo blanco para el recuadro */
  color: #ffffff;
  /* Color del texto dentro del cuadro */
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  background-color: #c1272d;
  /* Un rojo más oscuro */
  transform: scale(1.05);
  /* Aumenta ligeramente el tamaño del botón */
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

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  .mi-cuenta-container {
    flex-direction: column;
    align-items: center;
    padding: 1rem;

  }

  .imagen-lateral {
    position: relative;
    width: 60%;
    /* Reduce el tamaño de la imagen */
    margin-bottom: 1rem;
  }

  .imagen-lateral.izquierda {
    left: auto;
    right: auto;
    display: none;
    /* Oculta la imagen de la izquierda en pantallas pequeñas */
  }

  .imagen-lateral.derecha {
    left: auto;
    right: auto;

  }

  .mi-cuenta {
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid #000000;
    /* Ajustar grosor del borde */
    background-color: #4b4646;
    font-size: 0.9em;
  }

  .perfil-container {
    flex-direction: column;
    gap: 10px;
  }

  .campo {
    margin-bottom: 10px;
  }

  .actualizar-btn {
    font-size: 0.9em;
    padding: 8px;
    margin-top: 15px;
  }

  .mensaje {
    font-size: 0.9em;
    margin-top: 15px;
    padding: 8px;
  }
}

/* Media query para pantallas medianas (768px a 1024px) */
@media (min-width: 768px) and (max-width: 1300px) {
  .imagen-lateral {
    display: none;
    /* Oculta las imágenes en pantallas medianas */
  }
}
</style>