<template id="success">
  <div class="success-page">
    <div class="success-card">
      <h1>Welcome, {{ username }}!</h1>
      <p v-if="isRegistered">You have successfully registered.<br>
        <router-link to="/login">Go to Login</router-link>
      </p>
      <p v-else>You have successfully logged in.<br>
        <router-link to="/view">View Users List</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      isRegistered: this.$route.params.isRegistered || false,
    };
  },
};
</script>

<style scoped>
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  color: #333;
}

.success-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.success-card h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4caf50;
}

.success-card p {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.success-card a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.success-card a:hover {
  text-decoration: underline;
}
</style>