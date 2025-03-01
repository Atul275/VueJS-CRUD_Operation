<template id="register">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h2>Register New User</h2>
        </div>
        <span v-show="validEmail" v-bind:class="{ is_valid: validEmail, is_not_valid: !validEmail }">
          Please enter a valid email format
        </span>
        <div class="register-body">
          <form action="#" method="POST" name="registerUser">
            <div class="form-group">
              <input type="text" name="username" v-model="username" placeholder="Username" class="form-control" required />
            </div>
            <div class="form-group">
              <input type="password" name="password" v-model="password" placeholder="Password" class="form-control" required />
            </div>
            <div class="form-group">
              <input type="text" @input="checkEmail" name="email" v-model="email" placeholder="Valid email format" class="form-control" />
            </div>
            <div class="form-group">
              <select name="sques" v-model="sques" id="sques" class="form-control">
                <option value="What is your pet Name">Pet Name</option>
                <option value="What is your last Name">Last Name</option>
                <option value="What is your first school">First School</option>
              </select>
            </div>
            <div class="form-group">
              <input type="text" name="ans" v-model="ans" placeholder="Answer" class="form-control" />
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" @click.prevent="register()" :disabled="isDisabled" :class="{ 'btn-disabled': isDisabled }">
                Register <i class="fas fa-user-plus"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        username: null,
        password: null,
        email: null,
        sques: "What is your pet Name",
        ans: null,
        errorMsg: "",
        successMsg: "",
        validUsername: false,
        validPassword: false,
        validEmail: false,
        isDisabled: true,
        regEmail:
          /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        regName: /^[A-z]*$|^[A-z]+\s[A-z]*$/,
      };
    },
    methods: {
      nameValidation() {
        if ((this.regName.test(this.username)) && this.username.length > 3) {
          this.validUsername = false;
          this.isDisabled = false;
        } else {
          this.validUsername = true;
          this.validateForm();
          this.isDisabled = true;
        }
      },
      checkEmail() {
        if (this.regEmail.test(this.email) && this.email.length != 0) {
          this.validEmail = false;
          this.isDisabled = false;
          console.log("if validEmail", this.validEmail);
        } else {
          this.validEmail = true;
          this.isDisabled = true;
          console.log("else validEmail", this.validEmail);
        }
      },
      register() {
        var formData = {
          username: this.username,
          password: this.password,
          // email: this.email,
          sques: this.sques,
          ans: this.ans,
        };
        axios.post("http://localhost:9999/api/signup", formData).then((req) => {
          if (req.data.error) {
            this.errorMsg = req.data.message;
            this.$router.push({ name: 'Register', params: { errorMsg: this.errorMsg } });
          } else {
            this.successMsg = req.data.message;
            console.log("Data submitted: ", this.username);
            this.username = "";
            this.password = "";
            this.email = "";
            this.sques = "";
            this.ans = "";
            this.$router.push({ name: 'Success', params: { username: this.username } });
          }
        }).catch((error) => {
          this.errorMsg = "New user registration failed.";
          console.error("There was an error!", error);
          this.$router.push({ name: 'Register', params: { errorMsg: this.errorMsg } });
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #3f7ab5;
  }
  
  .register-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    padding: 20px;
  }
  
  .register-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .register-header h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
  
  .register-body {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-control:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  .btn {
    display: inline-block;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: #007bff;
    border: 1px solid #007bff;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  
  .btn-block {
    display: block;
    width: 100%;
  }
  .btn-disabled {
    cursor: not-allowed;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  .btn-disabled:hover {
    cursor: not-allowed;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  .is_valid {
    color: red;
  }
  
  .is_not_valid {
    color: green;
  }
  </style>