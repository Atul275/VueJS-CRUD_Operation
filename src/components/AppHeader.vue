<template>
  <div class="p=1" style="margin-top: -60px;">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="p-2" style="margin-left: 2%;" v-for="path in paths" v-bind:key="path.to" :to="path.to">{{path.title}}</router-link>
      </nav>
    <hr/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      paths: [
        { title: 'Login', to: '/'},
        { title: 'Home', to: '/home'},
        { title: 'View', to: '/view'},
        { title: 'Employees', to: '/employees'},
      ]
    };
  },
};
</script>
<style scoped>
</style>
