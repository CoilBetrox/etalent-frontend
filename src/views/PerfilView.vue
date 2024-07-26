<template>
  <div class="perfil">
    <h2>Mi Cuenta</h2>

    <div v-if="isLoading" class="loading-message">Cargando información...</div>
    <div v-else-if="showForm">
      <div class="form-row">
        <div class="form-group">
          <img
            v-if="user && user.foto"
            :src="user.foto"
            alt="Foto de Perfil"
            class="profile-pic"
          />
          <img
            v-else
            src="https://via.placeholder.com/64"
            alt="Foto de Perfil"
            class="profile-pic"
          />
          <label for="foto" class="btn-upload">Cambiar foto</label>
          <input
            type="file"
            id="foto"
            @change="handleFileUpload"
            ref="fileInput"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <p>Max. 50Mb</p>
        </div>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-group" :class="{ 'has-error': errors.nombre }">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model="user.nombre" @input="validateNombre" :disabled="user.nombre !== originalNombre" />
          <span v-if="errors.nombre" class="error-message">{{ errors.nombre }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.sap }">
          <label for="sap">SAP</label>
          <input type="text" id="sap" v-model="user.sap" @input="validateSap" :disabled="user.sap !== originalSap" />
          <span v-if="errors.sap" class="error-message">{{ errors.sap }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.correo }">
          <label for="correo">Correo</label>
          <input
            type="email"
            id="correo"
            v-model="user.correo"
            @input="validateCorreo"
          />
          <span v-if="errors.correo" class="error-message">{{ errors.correo }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.provincia }">
          <label for="provincia">Provincia</label>
          <select
            id="provincia"
            v-model="user.provincia"
            @change="cargarTiendas"
          >
            <option value="">Selecciona una provincia</option>
            <option value="Azuay">Azuay</option>
            <option value="Bolivar">Bolivar</option>
            <option value="Guayaquil">Guayaquil</option>
            <option value="Pichincha">Pichincha</option>
            <option value="Ambato"> Ambato</option>
            <option value="Babahoyo"> Babahoyo</option>
            <option value="Cuenca">Cuenca</option>
            <option value="Ibarrra">Ibarra</option>
            <option value="Latacunga">Latacunga</option>
            <option value="Loja">Loja</option>
            <option value="Machala">Machala</option>
            <option value="Manta">Manta</option>
            <option value="Esmeraldas">Esmeraldas</option>
            <option value="Riobamba">Esmeraldas</option>
            <option value="Ticori San Jose">Ticori San Jose</option>

          </select>
          <span v-if="errors.provincia" class="error-message">{{ errors.provincia }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.empresa }">
          <label for="empresa">Empresa</label>
          <select id="empresa" v-model="user.empresa">
            <option value="">Selecciona una empresa</option>
            <option value="Etafashion">Etafashion</option>
            <option value="Etafashion">Cobranza Judicial</option>
            <option value="RM">RM</option>
          </select>
          <span v-if="errors.empresa" class="error-message">{{ errors.empresa }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.tienda }">
          <label for="tienda">Tienda</label>
          <select id="tienda" v-model="user.tienda">
            <option value="">Selecciona una tienda</option>
            <option value="R.M. 6 de Diciembre">R.M. 6 de Diciembre</option>
            <option value="R.M. Ambato">R.M. Ambato</option>
            <option value="R.M. Ambato Mall And">R.M. Ambato Mall And</option>
            <option value="R.M. Babahoyo">R.M. Babahoyo</option>
            <option value="R.M. Batán">R.M. Batán</option>
            <option value="R.M. City Mall">R.M. City Mall</option>
            <option value="R.M. Condado">R.M. Condado</option>
            <option value="R.M. Duran">R.M. Duran</option>
            <option value="R.M. Esmeraldas">R.M. Esmeraldas</option>
            <option value="R.M. Granados">R.M. Granados</option>
            <option value="R.M. Gye Centro">R.M. Gye Centro</option>
            <option value="R.M. Gye Centro">R.M. Gye Centro</option>
            <option value="R.M. Latacunga">R.M. Latacunga</option>
            <option value="R.M. Loja">R.M. Loja</option>
            <option value="R.M. Los Ceibos">R.M. Los Ceibos</option>
            <option value="R.M. Machala">R.M. Machala</option>
            <option value="R.M. Mall del Río">R.M. Mall del Río</option>
            <option value="R.M. Mall Pacífico">R.M. Mall Pacífico</option>
            <option value="R.M. Monay">R.M. Monay</option>
            <option value="R.M. Paseo Shop. Ambato ">R.M. Paseo Shop. Ambato </option>
            <option value="R.M. Portal Shop. Carapungo ">R.M. Portal Shop. Carapungo </option>
            <option value="R.M. Quicentro Sur">R.M. Quicentro Sur</option>
            <option value="R.M. Recreo">R.M. Recreo</option>
            <option value="R.M. Río Centro Dora">R.M. Río Centro Dora</option>
            <option value="R.M. Río Centro Sur">R.M. Río Centro Sur</option>
            <option value="R.M. Riobamba">R.M. Riobamba</option>
            <option value="R.M. Terminal Terres">R.M. Terminal Terres</option>
            <option value="R.M. Venezuela">R.M. Venezuela</option>
            <option value="R.M. Río Centro Norte">R.M. Río Centro Norte</option>
            <option value="Tienda 9 de Octubre">Tienda 9 de Octubre</option>
            <option value="Tienda Babahoyos">Tienda Babahoyo</option>
            <option value="Tienda Bosque">R.M. Tienda Bosque</option>
            <option value="Tienda Carapungo ">Tienda Carapungo</option>
            <option value="Tienda CCI">Tienda CCI</option>
            <option value="Tienda Citymall">Tienda Citymall</option>
            <option value="Tienda Condado">Tienda Condado</option>
            <option value="Tienda Guayaquil">Tienda Guayaquil</option>
            <option value="Tienda Ibarra">Tienda Ibarra</option>
            <option value="Tienda Latacunga">Tienda Latacunga</option>
            <option value="Tienda Loja">Tienda Loja</option>
            <option value="Tienda Los Ceibos">Tienda Los Ceibos</option>
            <option value="Tienda Machala Expoceanica">Tienda Machala Expoceanica</option>
            <option value="Tienda Mall de los A">Tienda Mall de los A</option>
            <option value="Tienda Mall del Norte">Tienda Mall del Norte</option>
            <option value="Tienda Mall del Rio">Tienda Mall del Rio</option>
            <option value="Tienda Mall del Sol">Tienda Mall del Sol</option>
            <option value="Tienda Mall del Sur">Tienda Mall del Sur</option>
            <option value="Tienda Mall Pacífico">Tienda Mall Pacífico</option>
            <option value="Tienda Pananorte">Tienda Pananorte</option>
            <option value="Tienda Quicentro Norte">Tienda Quicentro Norte</option>
            <option value="Tienda Quicentro Sur">Tienda Quicentro Sur</option>
            <option value="Tienda Recreo">Tienda Recreo</option>
            <option value="Tienda Riobamba">Tienda Riobamba</option>
            <option value="Tienda San Luis Shop "> Tienda San Luis Shop</option>
            <option value="Tienda San Marino "> Tienda San Marino</option>
            <option value="Tienda Scala"> Tienda Scala </option>

            <option
              v-for="tienda in tiendasFiltradas"
              :key="tienda.id"
              :value="tienda.id"
            >
              {{ tienda.nombre }}
            </option>
          </select>
          <span v-if="errors.tienda" class="error-message">{{ errors.tienda }}</span>
        </div>

        <button type="submit" class="btn">Actualizar Información</button>
      </form>

      <div v-if="showDeleteConfirmation">
        <p>¿Estás seguro de que quieres eliminar tu perfil?</p>
        <button @click="confirmDelete">Sí</button>
        <button @click="cancelDelete">No</button>
      </div>
      <button
        v-else
        @click="showDeleteConfirmation = true"
        class="btn delete-btn"
      >
        Eliminar Perfil
      </button>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        nombre: '',
        sap: '',
        correo: '',
        provincia: '',
        empresa: '',
        tienda: '',
        foto: '',
        originalNombre: '',
        originalSap: ''
      },
      isLoading: true,
      errors: {},
      tiendas: [],
      tiendasFiltradas: [],
      showDeleteConfirmation: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    showForm() {
      return !this.isLoading;
    }
  },
  async created() {
    await this.fetchTiendas();
    await this.fetchUserData();
    this.isLoading = false;
  },

  methods: {
    async fetchTiendas() {
      try {
        const response = await axios.get('TU_ENDPOINT_TIENDAS');
        this.tiendas = response.data;
        this.cargarTiendas();
      } catch (error) {
        console.error("Error al obtener tiendas:", error);
        this.errorMessage = "Error al cargar las tiendas.";
      }
    },

    async fetchUserData() {
      try {
        const response = await axios.get('TU_ENDPOINT_API');
        this.user = response.data;
        this.originalNombre = response.data.nombre; 
        this.originalSap = response.data.sap;
        this.cargarTiendas();
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        this.errorMessage = "Error al cargar los datos del usuario.";
      } finally {
        this.isLoading = false;
      }
    },

    validateNombre(event) {
      const regex = /^[A-Za-z\s]+$/;
      if (!regex.test(event.target.value)) {
        this.errors.nombre = 'El nombre solo debe contener letras y espacios';
        event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, ''); // Remueve caracteres no válidos
      } else {
        this.errors.nombre = '';
      }
    },
    validateSap(event) {
      const regex = /^[0-9]+$/;
      if (!regex.test(event.target.value)) {
        this.errors.sap = 'El SAP solo debe contener números';
        event.target.value = event.target.value.replace(/[^0-9]/g, ''); // Remueve caracteres no válidos
      } else {
        this.errors.sap = '';
      }
    },
    validateCorreo(event) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regex.test(event.target.value)) {
        this.errors.correo = 'El correo electrónico no es válido';
      } else {
        this.errors.correo = '';
      }
    },

    cargarTiendas() {
      if (this.user.provincia) {
        this.tiendasFiltradas = this.tiendas.filter(
          tienda => tienda.provincia === this.user.provincia
        );
      } else {
        this.tiendasFiltradas = [];
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 50 * 1024 * 1024) {
          this.errors.foto = 'El archivo es demasiado grande';
          return;
        }

        if (!file.type.startsWith('image/')) {
          this.errors.foto = 'Solo se permiten imágenes';
          return;
        }

        this.user.foto = URL.createObjectURL(file);
      }
    },

    async submitForm() {
      this.validateNombre();
      this.validateSap();
      this.validateCorreo();

      if (Object.keys(this.errors).some(key => this.errors[key])) {
        this.errorMessage = 'Por favor, corrige los errores en el formulario.';
        return;
      }

      try {
        const response = await axios.post('TU_ENDPOINT_ACTUALIZAR', this.user);
        this.successMessage = 'Información actualizada correctamente';
      } catch (error) {
        console.error("Error al actualizar información:", error);
        this.errorMessage = 'Error al actualizar la información';
      }
    },

    confirmDelete() {
      // Lógica para eliminar el perfil
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
    }
  }
};
</script>

<style scoped>
.perfil {
  max-width: 600px;
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

h2 {
  text-align: center;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
