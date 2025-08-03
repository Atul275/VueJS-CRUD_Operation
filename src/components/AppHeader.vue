<template>
  <div class="p=1" style="margin-top: -60px">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link
        class="p-2"
        style="margin-left: 2%"
        v-for="path in paths"
        v-bind:key="path.to"
        :to="path.to"
        >{{ path.title }}</router-link
      >
      <button class="btn btn-link logout-button"><router-link to="/logout">Logout</router-link></button>
    </nav>
    <!-- <router-link to="/logout">Logout</router-link> -->
    <!-- <hr/> -->
  </div>
</template>

<script>
export default {
  props: {
    logout: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      paths: [
        { title: "Login", to: "/" },
        { title: "Home", to: "/home" },
        { title: "View", to: "/view" },
        { title: "Employees", to: "/employees" },
        { to: "/logout" },
      ],
    };
  },
};
</script>
<style scoped>
  .logout-button {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    border: none;
    background: none;
    cursor: pointer;
    transition: color 0.3s;
    margin-left: 60%;
  }

  .logout-button:hover {
    color: #0056b3;
  }
</style>
