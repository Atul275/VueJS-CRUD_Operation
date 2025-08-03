<template id="logout">
    <div class="logout-page">
      <div class="logout-card">
        <h1>Logout</h1>
        <p>You have successfully logged out.</p>
        <p>
          <router-link to="/">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  
  export default{
    setup() {
      // Clear user session or authentication token
      localStorage.removeItem('authToken'); // Example: Remove token from localStorage
      sessionStorage.removeItem('authToken'); // Example: Remove token from sessionStorage
  
      // Redirect to login page
      this.$router.push('/login');
  
      return {
        username: this.$route.params.username,
        isRegistered: this.$route.params.isRegistered || false,
      };
    },
  };
  </script>
  
  <style scoped>
  .logout-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f8ff;
    color: #333;
  }
  
  .logout-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .logout-card h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .logout-card p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .logout-card a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin: 0.5rem 0;
    padding: 0.75rem 1.25rem;
    border: 1px solid #007bff;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .logout-card a:hover {
    background-color: #007bff;
    color: #fff;
  }
  </style>