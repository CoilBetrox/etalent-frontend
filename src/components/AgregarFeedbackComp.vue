<template>
  <div class="agregar-feedback-modal">
    <div class="modal-content">
      <h2>Agregar Feedback</h2>
      <div class="user-info">
        <div class="user-details">
          <h3>{{ miembro.nombreUsuario }}</h3>
          <p>{{ miembro.sapUsuario }} | {{ miembro.cargoUsuario }} | {{ miembro.zonaUsuario }} | {{ miembro.empresaUsuario }} | {{ miembro.tiendaUsuario }} | {{ miembro.jornadaUsuario }} | {{ miembro.nombreRolUsuario }} | {{ miembro.estadoUsuario }}</p>
        </div>
      </div>
      <div class="feedback-input">
        <label>Feedback</label>
        <div class="feedback-type">
          <select v-model="feedbackType">
            <option value="" disabled selected hidden>Seleccione un tipo</option>
            <option value="Ticket Promedio">Ticket Promedio</option>
            <option value="Venta de Adicionales">Venta de Adicionales</option>
            <option value="Venta Cruzada">Venta Cruzada</option>
            <option value="Ventas por Hora">Ventas por Hora</option>
            <option value="Feedback Positivo">Feedback Positivo</option>
            <option value="One to One">One to One</option>
            <option value="Mentoring">Mentoring</option>
            <option value="Compromiso de Conducta">Compromiso de Conducta</option>
            <option value="Asignación Capacitación">Asignación Capacitación</option>
          </select>
          <textarea v-model="feedbackText" placeholder="Ingrese el feedback aquí"></textarea>
        </div>
      </div>
      <button @click="registrarFeedback" class="registrar-btn">Registrar Feedback</button>
      <button @click="cerrarModal" class="cerrar-btn">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgregarFeedbackComp',
  props: {
    miembro: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fechaFeedback: new Date().toISOString().substr(0, 10),
      feedbackText: '',
      feedbackType: '',
    }
  },
  methods: {
    registrarFeedback() {
      // Aquí iría la lógica para enviar el feedback
      console.log('***************')
      console.log('Feedback registrado:', this.feedbackText, this.feedbackType);
      console.log('FeedbackType:', this.feedbackType);
      this.$emit('feedback-registrado', {
        miembroId: this.miembro.idUsuario,
        fecha: this.fechaFeedback,
        texto: this.feedbackText,
        tipo: this.feedbackType
      });
      this.cerrarModal();
    },
    cerrarModal() {
      this.showFeedbackModal = false;
      this.miembroSeleccionado = null;
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
.agregar-feedback-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 600px;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.user-details h3 {
  margin: 0;
}

.feedback-input {
  display: flex;
  flex-direction: column;
}

.feedback-type {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}

textarea {
  height: 100px;
  flex: 1;
}

select {
  height: 35px;
  padding: 5px;
}

.registrar-btn {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}

.cerrar-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

</style>