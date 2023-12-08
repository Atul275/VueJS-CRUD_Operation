<template id="home">
  <div class="">
    <div>Home Page</div>
    <p>Welcome to my page. This is CRUD Operation Web Application.</p>
    
    <qrcode-vue :value="value" :size="size" level="H" />
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
export default {
  data() {
    let name = "Atul Kumar";
    let salary = 43432;
    return { 
      value: `Name: ${name}, Salary: ${salary}`,
        size: 300,
    }
  },
  components: {
      QrcodeVue,
    },
};
</script>
<style scoped>

</style>