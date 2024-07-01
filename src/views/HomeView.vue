<template>
  
  <main>
      <section class="hero">
        <div class="hero-content">
          <h1>ETAFASHION|RM</h1>
          <p>
            Transforma tu experiencia en Etafashion y RM con feedbacks
            personalizados según los rangos de los empleados, mejorando
            continuamente el rendimiento y la satisfacción laboral.
          </p>
        </div>
        <div class="hero-image">
          <!-- Aquí iría la imagen de la mujer con sombrero rojo -->
           
        </div>
      </section>

      <section class="about">
        <p>
          Etalent es una plataforma creada para Etafashion y RM, enfocada en
          mejorar la gestión del talento a través de capacitaciones
          personalizadas y feedbacks continuos. Nuestro objetivo es potenciar
          las habilidades de los empleados y contribuir a su crecimiento
          profesional.
        </p>
      </section>

      <section class="features">
        <div class="feature">
          <img src="path-to-cloud-icon.png" alt="Feedback Personalizado" />
          <h3>Feedback Personalizado</h3>
          <p>
            Proporcionamos feedbacks adaptados a los diferentes rangos de
            empleados, ayudando a identificar áreas de mejora y reconocer el
            buen desempeño.
          </p>
        </div>
        <div class="feature">
          <img src="path-to-communication-icon.png" alt="Comunicación Efectiva" />
          <h3>Comunicación Efectiva</h3>
          <p>
            Facilitamos la retroalimentación constante entre empleados y
            supervisores, promoviendo un ambiente de transparencia y mejora
            continua.
          </p>
        </div>
        <div class="feature">
          <img src="path-to-growth-icon.png" alt="Desarrollo Profesional" />
          <h3>Desarrollo Profesional</h3>
          <p>
            Ayudamos a los empleados a crecer profesionalmente mediante
            feedbacks constructivos y objetivos claros.
          </p>
        </div>
      </section>
    </main>
</template>

<script>   
export default {
  name: 'HomeView',
  components: { 

  }
}
</script>

<style scoped>
.etalent-page {
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #000;
  color: #fff;
}

.btn {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
}

.hero {
  display: flex;
  background-color: #000;
  color: #fff;
  padding: 2rem;
  height: 500px;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
}

.hero-image {
  flex: 1;
  background-image: url('../assets/imgMain.png'); /* Reemplaza con la ruta de tu imagen */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.about {
  background-color: #000;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 2rem;
}

.feature {
  text-align: center;
  max-width: 300px;
}

footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

</style>
