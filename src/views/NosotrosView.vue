NOSOTROS
<template>
    <div class="nosotros-container">
      <div class="content">
        <div class="text-box">
          <h2>ETALENT</h2>
          <p class="subtitle">Sistema de feedback para Etalent Fashion | RM</p>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero. Aliquam imperdiet odio congue faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc nec libero convallis dolor rutrum commodo volutpat et nisi. Phasellus non quam quam. Aenean eget urna vel velit fermentum tincidunt vitae et lacus. Duis at mattis augue. Praesent gravida ante non eros auctor, a pellentesque nibh posuere. Nullam convallis luctus ornare. Nunc rhoncus fermentum est, ut lacinia nisi convallis at. Etiam condimentum nibh mauris, id sagittis enim mattis id. Nulla ut lacus id lacus placerat iaculis. Suspendisse porttitor eros id nisi varius, et ornare tellus porttitor.
          </p>
          <br>
          <div class="image-box">
            <img src="ruta/a/imagen1.jpg" alt="Imagen 1">
          </div>
        </div>
      </div>
  
      <div class="content"> 
        <div class="text-box">
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero. Aliquam imperdiet odio congue faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc nec libero convallis dolor rutrum commodo volutpat et nisi. Phasellus non quam quam. Aenean eget urna vel velit fermentum tincidunt vitae et lacus. Duis at mattis augue. Praesent gravida ante non eros auctor, a pellentesque nibh posuere. Nullam convallis luctus ornare. Nunc rhoncus fermentum est, ut lacinia nisi convallis at. Etiam condimentum nibh mauris, id sagittis enim mattis id. Nulla ut lacus id lacus placerat iaculis. Suspendisse porttitor eros id nisi varius, et ornare tellus porttitor.
          </p>
          <br>
          <div class="image-box">
            <img src="ruta/a/imagen2.jpg" alt="Imagen 2">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NosotrosView'
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista Nosotros */
  .nosotros-container {
    padding: 2rem;
  }
  
  .content {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    margin-top: 5rem; /* Espacio superior */
  }
  
  .text-box {
  width: 60%;
  text-align: justify;
  padding: 2rem;
  background-color: #343a40; /* Nuevo color de fondo: gris oscuro */
  color: white; /* Cambiamos el color del texto a blanco para que sea legible */
  border-radius: 8px;
}

  
  .text-box h2 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    color: gray;
    text-align: center;
  }
  
  .paragraph {
    margin-top: 1rem;
  }
  
  .image-box {
    width: 200px; /* Ancho fijo para la imagen */
    height: 100px; /* Alto fijo para la imagen */
    background-color: #f0f0f0;
    margin-left: 2rem; /* Espacio entre el texto y la imagen */
    display: flex; /* Para centrar la imagen verticalmente */
    align-items: center;
    justify-content: center;
  }
  
  .image-box img {
    max-width: 100%; /* La imagen se ajusta al ancho del contenedor */
    height: auto;
  }
  </style>
  