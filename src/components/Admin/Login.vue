<template>
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar color="white">
                <v-toolbar-title>Yönetici Paneli</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onSubmit">
                  <v-text-field prepend-icon="person" v-model="email" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="password" name="password" label="Şifre" type="password"></v-text-field>

                 <p v-if="error" class="error--text"><v-icon color="error" left>error</v-icon>{{error}}</p>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="loading" :loading="loading" type="submit" color="secondary">Giriş</v-btn>
                </v-card-actions>
                </v-form>
              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>
        </v-container>
</template>

<script>
import adminService from '../../service/adminService'
export default {

  data(){
      return {
          email: null,
          password: null,
          error: null,
          login:false,
          loading: false        
      }
  },
  created (){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$router.push('/admin/dashboard')
      }
    });
  },
  methods:{
      onSubmit(){
        this.loading = true;
        adminService.login(this.email, this.password).then(user => {
          this.$router.push({name: 'Dashboard'})
          this.loading = false;    
        }).catch(err => {
            this.error = err.message
            this.loading = false;
        });         
      }
  }
}
</script>
