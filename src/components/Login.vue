<template id="login">
  <div class="">
    <qrcode-vue :value="value" :size="size" level="H" />
    <h2 style="font-style: oblique">Login</h2>
    <div align="center">
      <table style="background-color: skyblue; width: 50%">
        <tr>
          <label style="margin-right: 10px">Username</label>
          <input type="text" name="username" v-model="username" placeholder="username" />
          <label style="margin-left: 50px; margin-right: 10px">Password</label>
          <input type="password" name="password" v-model="password" placeholder="pssword" />
        </tr>
        <tr style="width: 50%" align="center">
          <button align="left" style="margin-right: 10px" @click="login()">Login</button>
          <button align="center" style="margin-right: 10px" @click="showRegisterModal = true">Register</button>
          <button align="right" style="margin-right: 10px" @click="showForgotModal = true">Forgot</button>
        </tr>
      </table>
    </div>
    <div id="overlay" class="col-lg-8" v-if="showRegisterModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register New User</h5>
            <button type="button" class="close" @click="showRegisterModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <span v-show="validEmail" v-bind:class="{ is_valid: validEmail, is_not_valid: !validEmail }">
            Please enter valid email format
          </span>
          <div class="modal-body p-1">
            <form action="#" method="POST" name="registerUser">
              <div class="form-group">
                <input type="text" name="username" v-model="username" placeholder="Username"
                  class="form-control form-control-lg" required />
              </div>
              <div class="form-group">
                <input type="password" name="password" v-model="password" placeholder="Password"
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
              <div class="form-group mt-2">
                <button class="btn btn-success btn-block-lg" @click="showRegisterModal = false; register();" :disabled="isDisabled">
                  Register User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="overlay" class="col-lg-8" v-if="showForgotModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Password</h5>
            <button type="button" class="close" @click="showForgotModal = false">
              <span aria-hidden="true">&times;</span>
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
              <div class="form-group mt-2">
                <button class="btn btn-success btn-block-lg" @click="showForgotModal = false; sendResetToken();" :disabled="isDisabled">
                  Send Reset Token
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
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    let name = "Atul Kumar";
    let salary = 40000;
    return {
      value: `Name: ${name}, Salary: ${salary}`,
      size: 50,
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
      showRegisterModal: false,
      showForgotModal: false,
      isDisabled: true,
      regEmail:
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regName: /^[A-z]*$|^[A-z]+\s[A-z]*$/,
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    checkEmail() {
      if (this.regEmail.test(this.email) || this.email.length === 0) {
        this.validEmail = false;
        this.isDisabled = false;
      } else {
        this.validEmail = true;
        this.isDisabled = true;
      }
      console.log("validEmail", this.validEmail);
    },

    login() {
      var formData = {
        username: this.username,
        password: this.password,
        // email: this.email,
      };
      axios.post("http://localhost:9999/api/login", formData).then((req) => {
        if (req.data.error) {
          this.errorMsg = req.data.message;
          console.log("error", this.errorMsg);
        } else {
          this.successMsg = req.data.message;
          console.log("Thank you for login: ", this.username);
          this.username = "";
          this.password = "";
          this.$router.push("/home");
        }
      });
    },
    register() {
      var formData = {
        username: this.username,
        password: this.password,
        email: this.email,
        sques: this.sques,
        ans: this.ans,
      };
      axios.post("http://localhost:9999/api/signup", formData).then((req) => {
        if (req.data.error) {
          this.errorMsg = req.data.message;
        } else {
          this.successMsg = req.data.message;
          console.log("Data submited: ", this.username);
          this.username = "";
          this.password = "";
          this.email = "";
          this.sques = "";
          this.ans = "";
        }
      });
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
  height: 70%;
  align-content: center;
  position: fixed;
  bottom: 0;
  top: 5%;
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
</style>