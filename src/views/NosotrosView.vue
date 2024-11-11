<template>
     <div class="page-background">
        <div class="titulo">
        <h2>ETALENT</h2>
        <div class="titulo1">
        <h6> Sistema para Etafashion | RM</h6>
        </div>
    </div>
        <div class="nosotros-container">
      <div class="content">
        <img src="@/assets/imagen2 vmv.png" alt="Imagen derecha" class="imagen1 izquierda">
        <div class="text-box">
          <h3 class="text-box-title">MISIÓN</h3>
          <p class="">
            Satisfacer las necesidades de nuestros clientes de retail de moda ofreciendo productos de calidad con una excelente relación costo beneficio y una experiencia inmcopatible. </p>
             <br>
          <div class="image-box">
          </div>
        </div>
      </div>
  
      <div class="content"> 
        <img src="@/assets/imagen3 vmv.png" alt="Imagen derecha" class="imagen2 derecha">
        <div class="text-box">
          <h3 class="text-box-title">VISIÓN</h3>
          <p class="">
            Construir la mejor cadena de retail de moda, siendo un medio de expresión de nuestros clientes inspirándolos a vivir y sentirse bien.</p>
          <br>
          <div class="image-box">
          </div>
        </div>
      </div>

      <div class="content">
        <img src="@/assets/imagen4 vmv.png" alt="Imagen derecha" class="imagen1 izquierda">
        <div class="text-box0">
          <h3 class="text-box-title">VALORES</h3>
          <p class="">
            Compromiso- Hacerlo Sencillo - Etica - Responsabilidad - Trabajo en Equipo - Actitud Emprendedora. </p>
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&display=swap');


  .titulo {
    display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 10vh; /* Usa toda la altura de la ventana */
  text-align: center; /* Alinea el texto en el centro */
  font-family: 'Arial', sans-serif; /* Fuente para el título */
  margin-left: 60px; /* Ajusta este valor para mover el título 1 más a la derecha */
  margin-top: 0px;
  }
  .titulo h2 {
  font-size: 2rem; /* Tamaño del texto para el título */
  color: #000; /* Color del texto, puedes cambiarlo según tus necesidades */
  font-weight: bold; /* Hace que el texto esté en negrilla */

}

.titulo1{
  margin-right: 20px; /* Ajusta este valor para mover el título 1 más a la derecha */
  margin-left: 10px;
  padding-top: 5px;
}

.titulo1 h6{
  font-size: 1rem; /* Tamaño del texto para el subtítulo */
  color: #000; /* Color del texto */

}

.imagen1{
margin-left: 10px;
margin-top: 50px;
align-self: center; /* Alinea la imagen verticalmente con el texto */
padding: 10px;
width: 200px; /* Ajusta el tamaño según tus necesidades */
height: auto; /* Mantiene la proporción original de la imagen */
}

.imagen2{
  margin-left: 10px;
  margin-top: 0px;
  align-self: center; /* Alinea la imagen verticalmente con el texto */
  padding: 60px;
  order: 2; /* Asegura que la imagen se coloque después del texto */
  width: 300px; /* Ajusta el tamaño según tus necesidades */
  height: auto; /* Mantiene la proporción original de la imagen */
}

  .page-background {
  background-color: #F1F1F2; /* Color de fondo claro para toda la página */
  min-height: 100vh; /* Asegura que el contenedor abarque toda la altura de la ventana */
  padding: 0px; /* Espaciado alrededor del contenido */
}

  /* Estilos para la vista Nosotros */
  .nosotros-container {
    padding-top: -100px;
  }
  
  .content {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Alinea verticalmente */
    margin-top: 1.2rem; /* Espacio superior */
  }
  
  .text-box {
  width: 50%;
  text-align: justify;
  padding: 3rem;
  background-color: #3d4144; /* Nuevo color de fondo: gris oscuro */
  color: white; /* Cambiamos el color del texto a blanco para que sea legible */
  border-radius: 8px;
  position: relative; /* Necesario para posicionar el título absoluto */
  margin-top: 3rem; /* Espacio para que el título no se superponga con otros elementos */
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Sombra */
}

.text-box0 {
  width: 50%;
  text-align: center;
  padding: 3rem;
  background-color: #3d4144; /* Nuevo color de fondo: gris oscuro */
  color: white; /* Cambiamos el color del texto a blanco para que sea legible */
  border-radius: 8px;
  position: relative; /* Necesario para posicionar el título absolutamente */
  margin-top: 3rem; /* Espacio para que el título no se superponga con otros elementos */
}

  .text-box h2 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  @keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
  .text-box-title {
    font-family: 'Roboto', sans-serif; /* Fuente más elegante para los párrafos */
    font-size: 2.5rem; /* Tamaño del texto para el título */
  color: #a72525; /* Color del texto del título */
  text-align: center; /* Centra el título horizontalmente */
  position: absolute; /* Posiciona el título absolutamente en relación con el contenedor */
  top: -4rem; /* Ajusta la distancia del título desde el borde superior del contenedor */
  left: 50%; /* Centra horizontalmente en relación con el contenedor */
  transform: translateX(-50%); /* Ajusta la posición para centrar el título */
  font-weight: bold; /* Hace que el título esté en negrilla */
  font-family: 'Montserrat', sans-serif; /* Fuente para el título */
  animation: slideInFromLeft 1s ease-out;
  text-transform: uppercase; /* Hace que el texto esté en mayúsculas */
  letter-spacing: 0.05em; /* Añade espacio entre letras */


}


  .subtitle {
    font-size: 1rem;
    color: gray;
    text-align: center;
    font-weight: bold; /* Hace que el subtítulo esté en negrilla */
  }
  
  .paragraph {
  font-family: 'Playfair Display', serif; /* Cambia la fuente del texto a una más elegante */
  display: inline-block; /* Asegura que el contenedor ajuste al texto */
  overflow: hidden; /* Oculta el texto que aún no ha sido animado */
  white-space: normal; /* Permite el salto de línea en el texto */
  animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite; /* Añade animación de parpadeo */
  font-size: 1.1rem; /* Tamaño del texto del párrafo */
  line-height: 1.6; /* Espaciado entre líneas */
  text-align: justify;

  }
  
/* Estilos de animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.text-box, .imagen1, .imagen2 {
  animation: fadeIn 2s ease-in;
}

.text-box, .text-box0 {
  box-shadow: 0 55px 50px rgba(0, 0, 0, 0.3); /* Sombra más fuerte */
}


.imagen1, .imagen2 {
  transition: transform 0.5s ease-in-out;
}

.imagen1:hover, .imagen2:hover {
  transform: scale(1.2); /* Aumenta un poco más el zoom */
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.paragraph {
  display: inline-block; /* Asegura que el contenedor ajuste al texto */
  overflow: hidden; /* Oculta el texto que aún no ha sido animado */
  white-space: normal; /* Evita el salto de línea en el texto */
  animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite; /* Añade animación de parpadeo */
}

.imagen1, .imagen2 {
  transition: transform 0.5s ease-in-out; /* Añade una transición suave */
}

.imagen1:hover, .imagen2:hover {
  transform: scale(1.2); /* Aplica un zoom cuando se pasa el cursor */
}

/* Media query para pantallas pequeñas */
@media (max-width: 768px) {
  .titulo h2 {
    font-size: 1.5rem; /* Reduce el tamaño del título en pantallas pequeñas */
  }

  .titulo1 h6 {
    font-size: 0.9rem; /* Reduce el tamaño del subtítulo en pantallas pequeñas */
  }

  .content {
    flex-direction: column; /* Coloca la imagen y el texto en una columna en lugar de una fila */
    margin-top: 1rem;
  }

  .text-box, .text-box0 {
    width: 90%; /* Ocupa casi todo el ancho disponible en pantallas pequeñas */
    padding: 1.5rem; /* Reduce el padding para ahorrar espacio */
    margin-top: 2rem; /* Ajusta el margen superior */
    margin-bottom: 3rem; /* Añade margen inferior para separar del pie de página */
  }

  .imagen1 {
    width: 60%; /* Reduce el tamaño de las imágenes en pantallas pequeñas */
    margin: 0 auto; /* Centra las imágenes */
    margin-top: 1rem; /* Añade margen superior para separarlas del texto */
  }

  .imagen2 {
    width: 80%; /* Reduce el tamaño de las imágenes en pantallas pequeñas */
    margin: 0 auto; /* Centra las imágenes */
    margin-top: 1rem; /* Añade margen superior para separarlas del texto */
  }

  /* Ajusta el orden de los elementos en dispositivos móviles */
  .imagen1 {
    order: 1; /* Coloca la imagen primero en dispositivos móviles */
  }

  .text-box {
    order: 2; /* Coloca el texto después de la imagen */
  }

  .imagen2 {
    order: 1; /* Coloca la imagen primero en dispositivos móviles */
  }

  .text-box0 {
    order: 2; /* Coloca el texto después de la imagen */
  }

  .text-box-title {
    font-size: 1.8rem; /* Reduce el tamaño del título dentro de las cajas */
    top: -3rem; /* Ajusta la posición del título */
  }

  .paragraph {
    font-size: 1rem; /* Ajusta el tamaño del texto del párrafo */
    line-height: 1.4; /* Reduce el espaciado entre líneas para mejorar la legibilidad */
  }
}

  </style>
  