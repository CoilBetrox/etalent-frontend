<template>
    <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container">
    <router-link to="/" class="navbar-brand" > Etalent </router-link>

          <router-link to="/" class="nav-link active" aria-current="page" >Inicio</router-link>
       
          <router-link to="/feedbacks" class="nav-link" >Feedbacks</router-link>
        
          <router-link to="/directorio" class="nav-link" >Directorio</router-link>
        
          <router-link to="/perfil" class="nav-link" >Mi perfil</router-link>
        
          <router-link to="/nosotros" class="nav-link" >Nosotros</router-link>
        
  </div>
</nav>
</template>

<script>
export default {
  name:"NavComp"
}
</script>

<style scoped>
.nav-link{
  color:white;
}
.navbar-brand{
  color:white;
}

</style>