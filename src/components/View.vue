<template>
  <div class="">
    <div>View Page</div>
  </div>
</template>
<script>
import axios from "axios";
// import Employees from "./Employees.vue";

export default {
  components: {
    // Employees,
  },
  data() {
    return {
      id: null,
      name: null,
      email: null,
      mobile: null,
      address: null,
      employees: [],
      emplDetails: [],
      currentEmployees: {id: null, name: null, salary: null, age: null, mobile: null, email: null, address: null},
    };
  },
  created: function () {
    this.getDetails();
    this.getAllEmployees()
  },
  methods: {
    getAllEmployees() {
      axios.get("http://localhost:9999/api/employees/fetch").then((resp) => {
        if (resp.data.error) {
          this.errorMsg = resp.data.message;
        } else {
          this.employees = resp.data;
        }
      });
    },
    getDetails() {
      var details= this.currentEmployees
      var form= {
        id: details.id
      }
      console.log("details", form)
      var url= "http://localhost:9999/api/employees/" + form.id
      console.log("url: ", url)
      axios.get(url).then((resp) => {
        if (resp.data.error) {
          this.errorMsg = resp.data.message;
        } else {
          this.emplDetails = resp.data;
          console.log("emplyees", this.emplDetails);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>