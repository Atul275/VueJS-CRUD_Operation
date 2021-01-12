<template>
  <div class="Employees">
      <div class="container-fluid">
          <div class="row bg-dark">
              <div class="col-lg-12">
                  <h2 class="text-center text-light display-4 pt-2" style="font-size:35px">CRUD Operation Using VueJs</h2>
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
              <div class="col-lg-6">
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
          
          <!-- Dispay Record -->
          <div class="row">
              <div class="col-lg-12">
                  <table class="table table-bordered table-hover">
                      <thead>
                          <tr class="bg-info text-light">
                              <th>Id</th>
                              <th>Name</th>
                              <th>Salary</th>
                              <th>Age</th>
                              <th colspan="2">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(emp, idx) in resultQuery " v-bind:key="idx">
                              <td>{{emp.id}}</td>
                              <td class="text-left">{{emp.name}}</td>
                              <td>{{emp.salary}}</td>
                              <td>{{emp.age}}</td>
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
                  <div class="modal-body p-4">
                      <form action="#" method="post">
                          <div class="form-group">
                              <input type="text" name="id" v-model="newEmployees.id" placeholder="Id" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group">
                              <input type="text" name="name" v-model="newEmployees.name" placeholder="Name" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group">
                              <input type="text" name="salary" v-model="newEmployees.salary" placeholder="Salary" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group">
                              <input type="text" name="age" v-model="newEmployees.age" placeholder="Age" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group mt-2">
                            <button class="btn btn-success btn-block-lg" @click="showAddModal=false; addEmployee();">
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
                      <h4 class="modal-title">Edit User</h4>
                      <button type="button" class="close"  @click="showEditModal=false">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body p-4">
                      <form action="#" method="POST">
                          <div class="form-group">
                              <input type="text" name="name" v-model="currentEmployees.name" placeholder="Name" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group">
                              <input type="text" name="salary" v-model="currentEmployees.salary" placeholder="Salary" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group">
                              <input type="text" name="age" v-model="currentEmployees.age" placeholder="Age" 
                              class="form-control form-control-lg" />
                          </div>
                          <div class="form-group mt-2">
                            <button class="btn btn-success btn-block-lg" @click="showEditModal=false; updateEmployee(currentEmployees.id);">
                                Update User
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

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Employees',
  data () {
    return {
        errorMsg: "",
        successMsg: "",
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        employees: [],
        newEmployees: {id: null, name: null, salary: null, age: null},
        currentEmployees: {id: null, name: null, salary: null, age: null},
        search: '',
    }
  },
  computed: {
    resultQuery(){
        if(this.search){
            return this.employees.filter((sEmp)=>{
                return this.search.toLowerCase().split(' ').every(v => sEmp.name.toLowerCase().includes(v)).orderBy(this.sEmp, 'id')
            })
        }else{
            return this.employees;
        }
    }
  },
  mounted: function() {
      this.getAllEmployees();
  },
  methods: {
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
            id: this.newEmployees.id,
            name: this.newEmployees.name,
            salary: this.newEmployees.salary, 
            age: this.newEmployees.age
          };
          axios.post("http://localhost:9999/api/employees/add", formData).then(req =>{
            if(req.data.error) {
                this.errorMsg =req.data.message;
            }  else {  
                this.successMsg =req.data.message;
                console.log("Data submited: ", this.newEmployees.name);
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
            age: updateEmp.age
          };
          axios.put("http://localhost:9999/api/employees/update/" +formData.id, formData).then(req =>{
            if(req.data.error) {
                this.errorMsg =req.data.message;
            }  else {  
                this.successMsg =req.data.message;
                console.log("Data updated: ", updateEmp.id, updateEmp.name, updateEmp.salary, updateEmp.age);
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
            age: delEmp.age
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
    selectEmployee(employees) {
        this.currentEmployees = employees
        console.log("cutrrr", this.currentEmployees)
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
    top: 20%;
    left: 15%;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}
</style>