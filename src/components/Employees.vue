<template>
  <div class="Employees">
    
    <div class="container-fluid">
      <div class="row bg-dark">
        <div class="col-lg-12">
          <h2 class="text-center text-light display-4 pt-2" style="font-size:35px">Crud Operation Springboot With VueJs</h2>
        </div>
      </div>
    </div>

    <div class="container mt-2">
      <div class="row">
        <div class="col-lg-12">
          <input type="text" v-model="search" placeholder="Search..."  />
        </div>
      </div>
    </div>
      
    <div class="container">
      <div class="row mt-3">
        <div class="col-lg-6">
          <h4 class="text-info"><i class="fa fa-list aln-t"></i>&nbsp;&nbsp;User List</h4>
        </div>
        <div class="col-lg-2">
          <button class="btn btn-primary float-center" title="Dowload Data" @click="downloadAllData">
            <i class="fas fa-download" aria-hidden="true"></i>
          </button>
        </div>
        <div class="col-lg-4">
          <button class="btn btn-success float-right" title="Add" @click="showAddModal=true">
            <i class="fa fa-user-plus"></i>&nbsp;&nbsp;Add
          </button>
        </div>
      </div>
      <hr class="bg-info">
      <div class="alert alert-danger" v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div class="alert alert-success" v-if="successMsg">
        {{ successMsg }}
      </div>
          
      <!-- Dispay All Users Record -->
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-bordered table-hover">
            <thead>
              <tr class="bg-info text-light">
                <th  v-for="(theadData, idx) in theadData" v-bind:key="idx">{{theadData}}</th>
                <th colspan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(emp, idx) in resultQuery" v-bind:key="idx">
                <td class="text-right">{{emp.id}}</td>
                <td class="text-left">{{emp.name}}</td>
                <td class="text-right">{{emp.salary}}</td>
                <td class="text-right">{{emp.age}}</td>
                <td>{{emp.mobile}}</td>
                <td class="text-left">{{emp.email}}</td>
                <td>
                  <button href="#" class="text-primary" title="edit" @click="showEditModal=true; selectEmployee(emp);">
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button class="text-danger" title="delete" @click="showDeleteModal=true; selectEmployee(emp)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button class="text-success" title="view scanner" @click="showQModal=true; viewQRCode(emp)">
                    <i class="fa fa-info-square" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Add new user Model -->
    <div id="overlay" class="col-lg-8" v-if="showAddModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add New User</h4>
            <button type="button" class="close"  @click="showAddModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <span v-show="validAge" v-bind:class="{ is_valid: validAge, is_not_valid: !validAge }">Age must be between 11 to 89</span>
          <span v-show="validEmail" v-bind:class="{ is_valid: validEmail, is_not_valid: !validEmail }">Please enter valid email format</span>
          <span v-show="validMobile" v-bind:class="{ is_valid: validMobile, is_not_valid: !validMobile }">Mobile must be 10 digits</span>
          
          <div class="modal-body p-4">
            <form action="#" method="post">
              <div class="form-group">
                <input type="text" @keypress="onlyNumbers" name="id" v-model="maxId1" placeholder="Id(only numeric)" 
                  class="form-control form-control-lg" required/>
              </div>
              <div class="form-group">
                <input type="text" @input="nameValidation" name="name" v-model="name" placeholder="Name" 
                  class="form-control form-control-lg" required/>
              </div>
              <div class="form-group">
                <input type="text" @keypress="onlyNumbers" name="salary" v-model="salary" placeholder="Salary(only numeric)" 
                  class="form-control form-control-lg" required/>
              </div>
              <div class="form-group">
                <input type="text" @input="ageValidation" @keypress="onlyNumbers" name="age" v-model="age" placeholder="Age(only numeric)" 
                  class="form-control form-control-lg" required/>
              </div>
              <div class="form-group">
                <select name="gender" v-model="gender" id="gender" class="form-control form-control-lg">
                  <option value="Male" selected>Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" @input="mobileValidation" @keypress="onlyNumbers" name="mobile" v-model="mobile" placeholder="Mobile(only numeric)" minlength="10" maxlength="10"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <input type="text" @input="checkEmail" name="email" v-model="email" placeholder="Valid email format"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <textarea rows="2" cols="50"  @input="address" name="address" v-model="address" placeholder="Address" 
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group mt-2">
                <button class="btn btn-success btn-block-lg" @click="showAddModal=false; addEmployee()" :disabled="isDisabled">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit user Model -->
    <div id="overlay" class="col-lg-8" v-if="showEditModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit User Details</h4>
            <button type="button" class="close"  @click="showEditModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <span v-show="validAge" v-bind:class="{ is_valid: validAge, is_not_valid: !validAge }">Age must be between 11 to 89</span>
          <span v-show="validEmail" v-bind:class="{ is_valid: validEmail, is_not_valid: !validEmail }">Valid email format</span>
          
          <div class="modal-body p-4">
            <form action="#" method="POST" name="AddUser">
              <div class="form-group">
                <input type="text" name="name" v-model="currentEmployees.name" placeholder="Name" 
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <input type="text" @keypress="onlyNumbers" name="salary" v-model="currentEmployees.salary" placeholder="Salary(only numeric)" 
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <input type="text" @input="ageValidation" @keypress="onlyNumbers" name="age" v-model="currentEmployees.age" placeholder="Age(only numeric)" 
                  class="form-control form-control-lg" />
              </div>
              <div>
                <select name="gender" v-model="currentEmployees.gender" id="gender" class="form-control form-control-lg">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="form-group">
                <input type="text" @keypress="onlyNumbers" name="mobile" v-model="currentEmployees.mobile" placeholder="Mobile(only numeric)" minlength="10" maxlength="10"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <input type="text" @input="checkEmail" name="email" v-model="currentEmployees.email" placeholder="Valid email format"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group">
                <textarea rows="2" cols="50" @input="address" name="address" v-model="currentEmployees.address" placeholder="Update Address"
                  class="form-control form-control-lg" />
              </div>
              <div class="form-group mt-2">
                <button class="btn btn-success btn-block-lg" @click="showEditModal=false; updateEmployee(currentEmployees.id);">
                  Update Detail
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete User -->
    <div id="overlay" class="col-lg-8" v-if="showDeleteModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Delete User</h4>
            <button type="button" class="close"  @click="showDeleteModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h4 class="text-danger">Are you sure want to delete this user ?</h4>
            <h5 class="text-danger">You are deleting : {{currentEmployees.name}} </h5>
            <hr>
            <button class="btn btn-danger btn-lg" @click="showDeleteModal=false; deleteEmpmployee(currentEmployees.id);">Yes</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-success btn-lg" @click="showDeleteModal=false">No</button>
          </div>
        </div>
      </div>
    </div>
    
    <!--Current User Scanner-->
    <div id="overlay" class="col-lg-8" v-if="showQModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Scan User Details</h4>
            <button type="button" class="close"  @click="showQModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-2">
            <h5 class="bg-info text-light">{{currentEmployees.name}}, Please Scan QR Code to See your Details</h5>
            <qrcode-vue :value="qrValue" :size="qrSize" level="H" />
            <button class="text-info btn-lg" title="user info" @click="showViewModal=true; getEmployeesById()">
              <i class="fa fa-info-square" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Display Current User Details -->
    <div id="overlay" class="col-lg-8" v-if="showViewModal">
      <div class="modal-dailog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">User Details</h4>
            <button type="button" class="close"  @click="showViewModal=false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-5">
            <h5 class="bg-info text-light">Hey, {{currentEmployees.name}} your details are bellow: </h5>
            <hr>
            <div class="row">
              <div >
                <tr class="text-left"><th>Name</th>: {{currentEmployees.name}}</tr>
                <tr class="text-left"><th>Age</th>: {{currentEmployees.age}}</tr>
                <tr class="text-left"><th>Gender</th>: {{currentEmployees.gender}}</tr>
                <tr class="text-left"><th>Salary</th>: {{currentEmployees.salary}}</tr>
                <tr class="text-left"><th>Mobile</th>: {{currentEmployees.mobile}}</tr>
                <tr class="text-left"><th>Email</th>: {{currentEmployees.email}}</tr>
                <tr class="text-left"><th>Address</th>: {{currentEmployees.address}}</tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'Employees',
  data () {
    return {
        theadData: ["Id", "Name", "Salary", "Age", "Mobile", "Email"],
        id: null,
        name: null,
        salary: null,
        age: null,
        mobile: null,
        email: null,
        address: null,
        gender:null,
        errorMsg: "",
        successMsg: "",
        validName: false,
        validAge: false,
        validMobile: false,
        validEmail: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        showViewModal: false,
        showQModal: false,
        isDisabled: true,
        employees: [],
        maxId:[],
        maxId1:"",
        search: '',
        currentEmployees: {id: null, name: null, salary: null, age: null, mobile: null, email: null, address: null, gender: null},
        qrValue: null,
        excelData: null,
        qrSize: 200,
        regEmail: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ ,
        regName: /^[A-z]*$|^[A-z]+\s[A-z]*$/ ,
    }
  },
  components: {
      QrcodeVue,
    },
  computed: {
    resultQuery(){
        if(this.search){
            return this.employees.filter((sEmp)=>{
                return this.search.toLowerCase()
                .split(' ').every(v => sEmp.name.toLowerCase().includes(v))
            })
        }else{
            return this.employees;
        }
    }
  },
  mounted: function() {
      this.getAllEmployees();
      this.getMaxId();
  },
  methods: {
        onlyNumbers(event) {
               let keyCode = event.keyCode ? event.keyCode : event.which;
               if (keyCode < 48 || keyCode > 57) {
                 event.preventDefault();
               }
        },
        nameValidation() {
            if ((this.regName.test(this.name)) && this.name.length> 3) {
                this.validName= false
                this.isDisabled= false
            }  else {
                this.validName= true
                this.isDisabled= true
            }
        },
        ageValidation() {
            if ((this.age> 10 && this.age< 90) || (this.currentEmployees.age> 10 && this.currentEmployees.age< 90)) {
                this.validAge= false
            }  else {
                this.validAge= true
            }
        },
        mobileValidation() {
            if (this.mobile.length === 10 || this.mobile.length === 0) {
                this.validMobile= false
            }  else {
                this.validMobile= true
            }
            console.log("validMobile", this.validMobile)
        },
        checkEmail() {
            if (this.regEmail.test(this.email) || this.email.length === 0 || this.regEmail.test(this.currentEmployees.email)) {
                this.validEmail = false
            }
            else {
                this.validEmail = true
            }
            console.log("validEmail", this.validEmail)
        },

        getEmployeesById() {
            let getEmp = this.currentEmployees;
            this.showQModal=false;
            var formData = {
                id: getEmp.id,
                name: getEmp.name,
                salary: getEmp.salary, 
                age: getEmp.age,
                mobile: getEmp.mobile,
                email: getEmp.email,
                address: getEmp.address,
                gender: getEmp.gender,
            };
            axios.get("http://localhost:9999/api/employees/" +formData.id).then(resp =>{
                if(resp.data.error) {
                    this.errorMsg =resp.data.message;
                }  else {    
                    this.employees = resp.data
                    console.log("emp:", this.employees)
                    this.getAllEmployees();
                }
            })
        },
        getMaxId() {
            axios.get("http://localhost:9999/api/employees/maxid").then(resp =>{
                if(resp.data.error) {
                    this.errorMsg =resp.data.message;
                }  else {    
                    this.maxId = resp.data;
                    this.maxId1= this.maxId.id+1;
                }
            })
        },
        getAllEmployees() {
            axios.get("http://localhost:9999/api/employees/fetch").then(resp =>{
                if(resp.data.error) {
                    this.errorMsg =resp.data.message;
                }  else {    
                    this.employees = resp.data
                }
            })
        },
        addEmployee() {
            var formData = {
                id: this.maxId1,
                name: this.name,
                salary: this.salary, 
                age: this.age,
                mobile: this.mobile,
                email: this.email,
                address: this.address,
                gender: this.gender
            };
            axios.post("http://localhost:9999/api/employees/add", formData).then(req =>{
                if(req.data.error) {
                    this.errorMsg =req.data.message;
                }  else {  
                    this.successMsg =req.data.message;
                    this.id= this.id+1;
                    this.name='';
                    this.salary='';
                    this.age='';
                    this.mobile='';
                    this.email='';
                    this.address='';
                    this.isDisabled= true
                    console.log("Data submited: ", this.name);
                    this.getAllEmployees();
                }
            })
        },
        updateEmployee() {
            console.log("update", this.currentEmployees)
            let updateEmp = this.currentEmployees;
            var formData = {
                id: updateEmp.id,
                name: updateEmp.name,
                salary: updateEmp.salary, 
                age: updateEmp.age,
                mobile: updateEmp.mobile,
                email: updateEmp.email,
                address: updateEmp.address,
                gender: updateEmp.gender
            };
            axios.put("http://localhost:9999/api/employees/update/" +formData.id, formData).then(req =>{
                if(req.data.error) {
                    this.errorMsg =req.data.message;
                }  else {  
                    this.successMsg =req.data.message;
                    console.log("Data updated: ", updateEmp.id, updateEmp.name, updateEmp.salary, updateEmp.age, updateEmp.mobile, updateEmp.email, updateEmp.address);
                    this.getAllEmployees();
                }
            })
        },
        deleteEmpmployee() {
            console.log("delete", this.currentEmployees)
            let delEmp = this.currentEmployees;
            var formData = {
                id: delEmp.id,
                name: delEmp.name,
                salary: delEmp.salary, 
                age: delEmp.age,
                mobile: delEmp.mobile,
                email: delEmp.email,
                address: delEmp.address,
                gender: delEmp.gender,
            };
            axios.delete("http://localhost:9999/api/employees/delete/" + formData.id).then((del) => {
                if(del.data.error) {
                    this.errorMsg = del.data.message;
                }  else {  
                    this.successMsg = del.data.message;
                    console.log("Data deleted: ", delEmp.id);
                    this.getAllEmployees();
                }
            });
        },
        viewQRCode(employees) {
            this.currentEmployees = employees
            let qrGen= employees;
            this.qrValue=JSON.stringify({Name:qrGen.name, Salary:qrGen.salary, Age: qrGen.age, Mobile: qrGen.mobile, Email: qrGen.email});
            console.log("QR Values:", this.qrValue)
        },
        selectEmployee(employees) {
            this.currentEmployees = employees
            let qrGen= this.currentEmployees;
            this.qrValue=JSON.stringify({Name:qrGen.name, Salary:qrGen.salary, Age: qrGen.age, Mobile: qrGen.mobile, Email: qrGen.email});
            console.log("cutrrr", this.currentEmployees)
        },
        downloadAllData() {
            const url= "http://localhost:6060/api/employees/download"
            window.location.href = url;
            
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #overlay {
        width: 50%;
        height: 50%;
        align-content: center;
        position: fixed;
        bottom: 0;
        top: 5%;
        left: 20%;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .is_valid { color: red }
    .is_not_valid { color: green }

    .asc:after{ content: "\25B2" }
    .desc:after{ content: "\25BC" }
</style>