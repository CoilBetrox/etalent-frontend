<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Criterio para cambiar la categoría</h2>
      <form @submit.prevent="addNewEmployee">
        <div class="form-group">
          <img src="../assets/categorias.png" alt="Criterio categoria" />
        </div>
        <button type="button" @click="$emit('close')">Cerrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoCategoriaComp',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  animation: fadeIn 0.3s ease-in-out;
}

.form-group {
  margin-bottom: 10px;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
  max-width: 100%; /* Limita la imagen al 100% del contenedor */
  max-height: 60vh; /* Limita la altura de la imagen al 60% de la altura de la ventana */
  object-fit: contain; /* Asegura que la imagen se ajuste sin distorsión */
  border-radius: 4px;
}

button {
  background-color: #333;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #555;
  transform: scale(1.05);
}

h2 {
  font-size: 1.6rem;
}

/* Estilos para pantallas mayores a 768px */
@media (min-width: 768px) {
  .modal-content {
    width: auto;
    max-width: 510px;
    align-items: center;
  }

  button {
    width: auto;
    padding: 10px 20px;
  }
}

/* Estilos para pantallas menores a 768px */
@media (max-width: 767px) {
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    z-index: 1000;
  }

  .modal-content {
    max-width: 100%; /* Aumenta el ancho del modal en pantallas pequeñas */
  }

  img {
    max-height: 50vh; /* Reduce la altura máxima de la imagen para pantallas pequeñas */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
