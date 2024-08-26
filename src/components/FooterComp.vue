<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="acerca">
        <h3>Acerca de nosotros</h3>
        <p>Somos una empresa dedicada a proporcionar soluciones innovadoras.</p>
      </div>
      </div>
      <div class="footer-section">
        <div class="enlaces">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/directorioAdmin">Directorio </a></li>
          <li><a href="/feedbacksAdmin">Feedback</a></li>
        </ul>
        </div>
      </div>
      <div class="footer-section">
        <div class="contacto">
        <h3>Contacto</h3>
        <h5>Equipo de Desarrollo:</h5>
        <p> roberthdanielt@gmail.com </p>
        <p> andychiquin01@gmail.com </p>
        </div>
      </div>
      
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Etafashion | RM. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComp',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.contacto {
  text-align: center;
}

.acerca {
  text-align: center;

}

.enlaces{
  text-align: center;
}

.footer {
  background-color: #333;
  color: white;
  padding: 10px 0;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  margin: 10px;
  min-width: 200px;
}

.footer-section h3 {
  margin-bottom: 10px;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section a {
  color: white;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #555;
}
</style>