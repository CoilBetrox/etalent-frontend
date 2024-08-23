<template>
    <div class="page-background">
  <main>
      <section class="hero">
        <div class="hero-content">
          <img src="@/assets/Recurso 5.png" alt="Imagen derecha" class="imagen1 izquierda">
          <p>
            Transforma tu experiencia en Etafashion y RM con feedbacks
            personalizados según los rangos de los empleados, mejorando
            continuamente el rendimiento y la satisfacción laboral.
          </p>
        </div>
        <div class="hero-image">
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
          <img src="@/assets/feedbacks.png" alt="Feedback Personalizado" class="feature-image" />
        <div class="titulos">
          <h3>Feedback Personalizado</h3>
        </div>
          <p>
            Proporcionamos feedbacks adaptados a los diferentes rangos de
            empleados, ayudando a identificar áreas de mejora y reconocer el
            buen desempeño.
          </p>
        </div>
        <div class="feature">
          <img src="@/assets/comunicacion.png" alt="Comunicación Efectiva" class="feature-image" />
          <div class="titulos">
          <h3>Comunicación Efectiva</h3>
          </div>
          <p>
            Facilitamos la retroalimentación constante entre empleados y
            supervisores, promoviendo un ambiente de transparencia y mejora
            continua.
          </p>
        </div>
        <div class="feature">
          <img src="@/assets/desarroollo_profesional.png" alt="Desarrollo Profesional" class="feature-image" />
          <div class="titulos">
          <h3>Desarrollo Profesional</h3>
          </div>
          <p>
            Ayudamos a los empleados a crecer profesionalmente mediante
            feedbacks constructivos y objetivos claros.
          </p>
        </div>
      </section>
    </main>
    </div>
</template>

<script>   
export default {
  name: 'HomeView',
  components: { 

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');


.page-background {
  font-family: 'Poppins', sans-serif; /* Aplica la nueva fuente a toda la vista */
  background-color: #fcfcff;
  min-height: 100vh;
  padding: -100%;
  animation: backgroundShift 10s ease-in-out infinite;
}

.feature-image {
  width: 100%; /* Se ajusta automáticamente al tamaño del contenedor */
  max-width: 150px; /* Tamaño máximo de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  margin-bottom: 10px;
  transition: transform 0.5s ease-in-out; /* Transición suave para el zoom */
}

.imagen1{
  width: 400px;
  position: relative;
  top: -120px; /* Ajusta este valor para subir la imagen */
  left: 25px; /* Ajusta este valor para mover la imagen a la derecha */

}

.titulos h3{
  font-weight: bold;
}

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

/* Estilos generales que se aplican a todas las resoluciones */
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

/* Estilos para dispositivos móviles */
@media only screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .hero-content {
    padding-right: 0;
    text-align: center;
  }

  .hero-image {
    width: 100%;
    height: 200px; /* Ajusta la altura según sea necesario */
  }

  .imagen1 {
    width: 100%;
    top: 0;
    left: 0;
    margin-bottom: 20px; /* Añade un margen inferior para separar la imagen del texto */

  }

  .features {
    flex-direction: column;
    align-items: center;
  }

  .feature {
    margin-bottom: 2rem;
  }

  .feature-image {
    max-width: 100px; /* Tamaño más pequeño para dispositivos móviles */
  }
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

.feature-image:hover {
  transform: scale(1.1); /* Efecto de zoom al pasar el cursor */
}

footer {
  background-color: #000;
  color: #f1f2f1  ;
  text-align: center;
  padding: 1rem;
}

</style>
