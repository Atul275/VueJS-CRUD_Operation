<template>
  <div id="app">
    <AppHead class="text-success ml-5"/>
    <router-view />
  </div>
</template>

<script>
  import AppHead from "./components/AppHeader";

  export default {
    name: 'App',
    components: {
      AppHead,
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
