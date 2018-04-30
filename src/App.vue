<template>
  <v-app>
  
    <v-dialog v-model="dialog" max-width="800" scrollable>
      <v-card style="min-height: 50%;">
        <v-card-title class="headline">Alışveriş Sepetiniz</v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="getShoppingCart.items" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                                <td @click="goDetail( props.item.id)" class="text-xs-left">{{ props.item.name }}</td>
                                <td class="text-xs-left" >{{ props.item.size }}</td>
                                <td class="text-xs-left">{{ props.item.quantity }}</td>
                                <td class="text-xs-left">{{ props.item.fiyat }}</td>
                                <td class="text-xs-left">
                                  <v-btn icon class="mx-0 center" @click="deleteItem(props.item)">
                                    <v-icon color="pink">delete</v-icon>
                                  </v-btn>
                                </td>
</template>

<template style="text-xs-center" slot="no-data">
  <p class="title mt-3 text-xs-center">
    Alışveriş sepetiniz boş.</p>
</template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="this.getShoppingCart.items.length">
            <span class="title mr-3">Toplam: {{this.getShoppingCart.total}}.00 ₺</span>
            <v-btn color="teal" dark @click.native="dialog = false; $router.push({name: 'Order'})">AlIŞVERİŞİ TAMAMLA</v-btn>
          </div>
          <v-btn v-else color="teal" dark @click.native="dialog = false; $router.push({name:'Home'})">Alışverişe Başla</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  
<v-navigation-drawer
      fixed
      v-model="drawer"
      app
      clipped
  >
    <v-list style="padding: 0">
      <v-list-tile @click="home()">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title >Ana Sayfa</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-group
        no-action
        value="true"
      >
      <v-list-tile slot="activator">
          <v-list-tile-title> Ayakkabılar</v-list-tile-title>
        </v-list-tile>
      <v-list-group
        no-action
        value="true"
        sub-group
      >
        <v-list-tile slot="activator">
          <v-list-tile-title> Kadın Ayakkabıları</v-list-tile-title>
        </v-list-tile>
          <v-list-tile  @click="category('kadın')">
            <v-list-tile-title class="">Tüm Kadın Ayakkabıları</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  @click="category('kadın', 'Spor')">
            <v-list-tile-title class="">Spor Ayakkabısı</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="category('kadın', 'Klasik')">
            <v-list-tile-title class="">Klasik Ayakkabı</v-list-tile-title>
          </v-list-tile>
      </v-list-group>
      <v-list-group
        no-action
        value="true"
        sub-group
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Erkek Ayakkabıları</v-list-tile-title>
        </v-list-tile>
          <v-list-tile  @click="category('erkek')">
            <v-list-tile-title class="pl-3">Tüm Erkek Ayakkabıları</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  @click="category('erkek', 'Spor')">
            <v-list-tile-title class="pl-3">Spor Ayakkabısı</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  @click="category('erkek', 'Klasik')">
            <v-list-tile-title class="pl-3">Klasik Ayakkabı</v-list-tile-title>
          </v-list-tile>
     
      </v-list-group>
      </v-list-group>
      <v-divider/>
            <v-list-tile class="hidden-md-and-up" @click="">

        <v-list-tile-title >Hakkımızda</v-list-tile-title>
      </v-list-tile>
      <v-list-tile class="hidden-md-and-up" @click="">

        <v-list-tile-title >İletişim</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <v-toolbar fixed clipped-left app >
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title left class="title" @click="home()" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="px-0" @click="dialog = !dialog">
            <v-badge overlap color="success">
              <span v-if="this.getShoppingCart.items.length" slot="badge">{{this.getShoppingCart.items.length}}</span>
              <v-icon large>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Hakkımızda</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn  flat>İLETİŞİM</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="isAdmin">
        <v-btn @click="logOut()" flat>Çıkış</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

        <router-view/>

    </v-content>
    <v-footer dark absolute app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import adminService from "./service/adminService";
  export default {
    data() {
      return {
        drawer: null,
        dialog: false,
        items: [{
            title: "Erkek Ayakkabıları",
            category: "erkek"
          },
          {
            title: "Kadın Ayakkabıları",
            category: "kadın"
          }
        ],
        types: ["Spor Ayakkabısı", "Klasik Ayakkabı"],
  
        title: "AyakkabıDükkanım",
        headers: [{
            text: "Ayakkabı Modeli",
            sortable: false
          },
          {
            text: "Numara",
            sortable: false
          },
          {
            text: "Adet",
            sortable: false
          },
          {
            text: "Fiyat",
            sortable: false
          },
          {
            text: "İşlem",
            sortable: false
          }
        ],
        isAdmin: false
      };
    },
    created() {
      console.log(this.getShoppingCart);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAdmin = true;
          console.log(this.isAdmin);
        } else {
          console.log("user yoq");
          this.isAdmin = false;
        }
      });
    },
    mounted() {},
    methods: {
      category(param, type) {
        if (type) {
          this.$router.push({
            name: "Category",
            params: {
              gender: param
            },
            query: {
              type: type
            }
          });
        } else {
          this.$router.push({
            name: "Category",
            params: {
              gender: param
            }
          });
        }
      },
      home() {
        this.$router.push({
          name: "Home"
        });
      },
      goDetail(id) {
        this.$router.push({
          name: "Detail",
          params: {
            id: id
          }
        });
        this.dialog = false;
      },
      deleteItem(item) {
        this.removeToShoppingCart(item);
      },
      logOut() {
        adminService.logOut();
        this.$router.push({name: 'Home'})
      },
      ...mapActions(["removeToShoppingCart"])
    },
    computed: {
      ...mapGetters(["getShoppingCart"])
    }
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Lato");
  body {
    font-family: "Lato", "sans-serif";
  }
  
  .title:hover {
    cursor: pointer;
  }
</style>
