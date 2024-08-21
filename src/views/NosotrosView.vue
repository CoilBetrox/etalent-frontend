<template>
     <div class="page-background">
        <div class="titulo">
        <h2>ETALENT</h2>
        <div class="titulo1">
        <h3> Sistema para Etafashion | RM</h3>
        </div>
    </div>
        <div class="nosotros-container">
      <div class="content">
        <div class="text-box">
          <p class="subtitle">Sistema de feedback para Etalent Fashion | RM</p>
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed faucibus libero. Aliquam imperdiet odio congue faucibus consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc nec libero convallis dolor rutrum commodo volutpat et nisi. Phasellus non quam quam. Aenean eget urna vel velit fermentum tincidunt vitae et lacus. Duis at mattis augue. Praesent gravida ante non eros auctor, a pellentesque nibh posuere. Nullam convallis luctus ornare. Nunc rhoncus fermentum est, ut lacinia nisi convallis at. Etiam condimentum nibh mauris, id sagittis enim mattis id. Nulla ut lacus id lacus placerat iaculis. Suspendisse porttitor eros id nisi varius, et ornare tellus porttitor.
          </p>
          <br>
          <div class="image-box">
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
          </div>
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
  .titulo {
    display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 10vh; /* Usa toda la altura de la ventana */
  text-align: center; /* Alinea el texto en el centro */
  font-family: 'Arial', sans-serif; /* Fuente para el título */
  }
  .titulo h2 {
  font-size: 2rem; /* Tamaño del texto para el título */
  color: #000; /* Color del texto, puedes cambiarlo según tus necesidades */
}

  .page-background {
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  padding: -100%; /* Espaciado alrededor del contenido */
}

  /* Estilos para la vista Nosotros */
  .nosotros-container {
    padding: 0%;
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
  background-color: #3d4144; /* Nuevo color de fondo: gris oscuro */
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
  

  </style>
  