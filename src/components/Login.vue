<template id="login">
  <div class="">
    <!-- <qrcode-vue :value="value" :size="size" level="H" /> -->
    <div class="align" id="body">
      <div class="grid" style="margin-top: 5%;">
        <div class="form login" autocomplete="off" id="Form">
          <div class="form__field">
            <label>
              <i class="fas fa-user"></i>
            </label>
            <input type="text" name="username" v-model="username" placeholder="username" class="form__input" autocomplete="false" required />
          </div>
          <div class="form__field">
            <label>
              <i class="fas fa-lock"></i>
            </label>
            <input type="password" name="password" v-model="password" placeholder="pssword" class="form__input" required />
          </div>
          <div class="form__field">
            <button @click="login()">
              Login&nbsp;<i class="fas fa-sign-in-alt"></i>
            </button>
          </div>
        </div>
        <p class="text--center">
          Not a member?
          <a href="#" @click="newRegister()">Sign up now&nbsp;&nbsp;</a>
          <i class="fas fa-arrow-right"></i>
        </p>
      </div>
    </div>

    <div id="overlay" class="col-lg-8" v-if="showForgotModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Password</h5>
            <button type="button" class="close" @click="showForgotModal = false">
              <span aria-hidden="true">
                <i class="fas fa-times-circle" style='font-size:30px; color: #ff4d4d;'></i>
              </span>
            </button>
          </div>
          <span v-show="validEmail" v-bind:class="{ is_valid: validEmail, is_not_valid: !validEmail }">
            Please enter valid email format
          </span>
          <div class="modal-body p-1">
            <form action="#" method="POST" name="forgotPassword">
              <div class="form-group">
                <input type="text" name="username" v-model="username" placeholder="Username"
                  class="form-control form-control-lg" required />
              </div>
              <div class="form-group">
                <input type="text" @input="checkEmail" name="email" v-model="email" placeholder="Valid email format"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <select name="sques" v-model="sques" id="sques" class="form-control form-control-lg">
                  <option value="What is your pet Name">Pet Name</option>
                  <option value="What is your last Name">Last Name</option>
                  <option value="What is your first school">First School</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" name="ans" v-model="ans" placeholder="Answer" class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <input type="password" name="newPassword" v-model="newPassword" placeholder="New Password"
                  class="form-control form-control-lg" required />
              </div>
              <div class="form-group mt-2">
                <button class="btn btn-success btn-block-lg" @click="showForgotModal = false; forgot();" :disabled="isDisabled">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import QrcodeVue from "qrcode.vue";
export default {
  data() {
    let name = "Atul Kumar";
    let salary = 40000;
    return {
      value: `Name: ${name}, Salary: ${salary}`,
      size: 100,
      username: null,
      password: null,
      newPassword: null,
      email: null,
      sques: "What is your pet Name",
      ans: null,
      errorMsg: "",
      successMsg: "",
      validUsername: false,
      validPassword: false,
      validEmail: false,
      showForgotModal: false,
      isDisabled: true,
      regEmail:
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regName: /^[A-z]*$|^[A-z]+\s[A-z]*$/,
    };
  },
  components: {
    // QrcodeVue,
  },
  methods: {
    nameValidation() {
      if ((this.regName.test(this.username)) && this.username.length> 3) {
        this.validName= false
        this.isDisabled= false
      }  else {
        this.validName= true
        this.isDisabled= true
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
      // console.log("validEmail", this.validEmail);
    },

    login() {
      var formData = {
        username: this.username,
        password: this.password,
        // email: this.email,
      };
      axios.post("http://localhost:9999/api/login", formData).then((req) => {
        if (req.data.error) {
          this.$router.push({ name: 'Error', params: { errorMsg: this.errorMsg } });
          this.errorMsg = req.data.message;
          console.log("error", this.errorMsg);
        } else {
          this.successMsg = req.data.message;
          this.username = "";
          this.password = "";
          this.$router.push({ name: 'Success', params: { username: this.username } });
        }
      }).catch((error) => {
        this.errorMsg = "Username and password mismatch!";
        console.error("Incorrect credentials!", error);
        this.$router.push({ name: 'Error', params: { errorMsg: this.errorMsg } });
      });
    },
    newRegister() {      
      this.$router.push({ name: 'Register' });
    },
    forgot() {
    var formData = {
      username: this.username,
      sques: this.sques,
      ans: this.ans,
      newPassword: this.newPassword,
    };
    axios
      .post("http://localhost:9999/api/verify-security", formData)
      .then((req) => {
        if (req.data.error) {
          this.errorMsg = req.data.message;
        } else {
          this.successMsg = req.data.message;
          console.log("Security question verified for:", this.username);
          this.updatePassword();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },
  updatePassword() {
    var formData = {
      username: this.username,
      newPassword: this.newPassword,
    };
    axios
      .post("http://localhost:9999/api/update-password", formData)
      .then((req) => {
        if (req.data.error) {
          this.errorMsg = req.data.message;
        } else {
          this.successMsg = req.data.message;
          console.log("Password updated for:", this.username);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },
    sendResetToken() {
      var formData = {
        email: this.email,
      };
      axios
        .post("http://localhost:9999/api/forgot", formData)
        .then((req) => {
          if (req.data.error) {
            this.errorMsg = req.data.message;
          } else {
            this.successMsg = req.data.message;
            console.log("Password reset token sent to email:", this.email);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    save() {
      console.log("save");
    },
  },
};
</script>
<style scoped>
#overlay {
  width: 30%;
  height: 45%;
  align-content: center;
  position: fixed;
  bottom: 0;
  top: 20%;
  left: 30%;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.is_valid {
  color: red;
}

.is_not_valid {
  color: green;
}

.asc:after {
  content: "\25B2";
}

.desc:after {
  content: "\25BC";
}

*{
    margin:0;
    padding:0;
  }
.align {
  display: grid;
  /* place-items: center; */
}

.grid {
  inline-size: 90%;
  margin-inline: auto;
  max-inline-size: 20rem;
}

/* layout/base.css */

* {
  box-sizing: inherit;
}

#body {
  background: linear-gradient(to right, #04619f, #000000);
  color: #979797;
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  min-block-size: 100vh;
}

a {
  color: #eee;
  outline: 0;
  text-decoration: none;
}

a:focus,
a:hover {
  text-decoration: underline;
}

/* modules/form.css */

input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: 0.3s;
}
button {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: 0.3s;
  border-radius: 0.25rem;
  padding: 1rem;
  cursor: pointer;
}
.form {
  display: grid;
  gap: 0.875rem;
}

.form button {
  inline-size: 100%;
}

.form input[type="password"],
.form input[type="text"]{
  inline-size: 100%;
}

.form__field {
  display: flex;
}
.form__input {
  flex: 1;
}

.login {
  color: #eee;
}

.login label,
.login input[type="text"],
.login input[type="password"],
.login input[type="submit"] {
  border-radius: 0.25rem;
  padding: 1rem;
}

.login button {
  border-radius: 0.25rem;
  padding: 1rem;
}

.login label {
  background-color: #a5a5a5;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-inline: 1.25rem;
}

.login input[type="password"],
.login input[type="text"] {
  background-color: #b4b4b4;
  color: black;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.login input[type="password"]:focus,
.login input[type="password"]:hover,
.login input[type="text"]:focus,
.login input[type="text"]:hover {
  background-color: #ffffff;
}

.login button {
  background-color: #48578a;
  color: rgb(255, 255, 255);
  font-weight: 700;
  text-transform: uppercase;
}

.login button:focus,
.login button:hover {
  background-color: #40458f;
}

p {
  margin-block: 1.5rem;
}

.text--center {
  text-align: center;
}

::placeholder {
  color: rgb(114, 114, 114);
}

.valid-feedback {
  color: rgb(0, 255, 0);
}

.invalid-feedback {
  color: red;
}
</style>