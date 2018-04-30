<template>
  <v-container>
    
    <orders></orders>
    
    <products class="mt-5"></products>
  </v-container>

</template>

<script>
import Orders from './Orders'
import Products from './Products'
export default {
  components: {
    Orders,
    Products
  },

  data(){
      return {

      }
  },
  created (){
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/admin/Login')
      }
    });
  }
}
</script>
