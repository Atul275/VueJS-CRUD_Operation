<template id="error">
  <div class="error-page">
    <div class="error-card">
      <h1>Invalid Credentials</h1>
      <h3>{{ errorMsg }}</h3>
      <router-link to="/" class="btn">Go back to Login</router-link>
      <h3>Or</h3>
      <router-link to="/register" class="btn">Register for New User</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMsg: this.$route.params.errorMsg,
    };
  },
};
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8d7da;
  color: #721c24;
}

.error-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  max-width: 430px;
  width: 100%;
}

.error-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #721c24;
}

.error-page p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.error-page h3 {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.error-page a {
  color: #721c24;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin: 0.5rem 0;
  padding: 0.75rem 1.25rem;
  border: 1px solid #721c24;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.error-page a:hover {
  background-color: #721c24;
  color: #fff;
}
</style>