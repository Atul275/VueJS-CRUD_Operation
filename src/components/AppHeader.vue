<template>
  <div class="p=1">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="p-4" v-for="path in paths" v-bind:key="path.to" :to="path.to">{{path.title}}</router-link>
      </nav>
    <hr/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      paths: [
        { title: 'Home', to: '/'},
        { title: 'View', to: '/view'},
        { title: 'Employees', to: '/employees'},
      ]
    };
  },
};
</script>