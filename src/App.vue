<template>
  <NavComp />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/posts">Post</router-link>
  </nav>
  <router-view/>
</template>

<script>
import NavComp from '@/components/NavComp.vue'
export default{
  name: "App",
  components: {
    NavComp
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}

</style>
