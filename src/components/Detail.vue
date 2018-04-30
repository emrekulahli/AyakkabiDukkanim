<template>
    <v-container grid-list>
        <v-layout row wrap>
            <v-flex xs12 sm6 md6>
                <img :src="shoe.imageUrl" style=" width: 100%;">
            </v-flex>
            <v-flex class="pl-4" xs12 sm6 md6>
                <h2>{{shoe.model}}</h2>
                <p class=".body-1 mt-3"> {{shoe.aciklama}} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae voluptatum ipsum pariatur, ratione unde nihil porro fuga non autem, iusto necessitatibus asperiores nulla! Quisquam ducimus animi repellat magnam soluta! </p>
                <span class="title">Fiyat: {{shoe.fiyat}}.00 ₺</span>
                <p class="grey--text mt-1 mb-0">{{shoe.cinsiyet}}</p>
                <p class="grey--text mb-0">{{shoe.tip}}</p>
                <v-container grid-list-xs>
                    <v-layout row wap>
                        <v-flex xs4 >                       
                            <v-select v-if="shoe.cinsiyet === 'Erkek'" label="Numara Seçimi"  v-model="size" :items="shoeSizes.male"/>
                            <v-select v-else label="Numara Seçimi"  v-model="size" :items="shoeSizes.female"/>
                        </v-flex>
                        <v-flex xs4 class="ml-3">
                        
                            <v-select label="Adet" auto v-model="quantity" :items="quantitySelect"/>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn  @click="addToCart()" color="success" dark class="mt-4 ml-0 elevation-12">
                    <v-icon left>add_shopping_cart</v-icon>
                    Sepete Ekle
                </v-btn>
                <p class="mt-1 error--text" v-if="errorMsg">{{errorMsg}}</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import service from '../service/service'
import {mapActions} from 'vuex'

export default {
  data(){
      return {
          shoe: null,
          shoeSizes: {male: ['39', '40', '41', '42', '43', '44'],
                      female: ['36', '37', '38', '39'],
                     },
          size: null,
          quantity: null,
          quantitySelect:['1', '2', '3'] ,
          errorMsg: null
      }
  },
  
  props: [
      'id'
  ],

    watch:{
        '$route': 'getData'
    },

  created(){
      this.getData();
  },
  methods:{
      getData(){
          console.log("....")
          service.getShoe(this.id).then( res =>{
          this.shoe = res.val()
        })
      },
      addToCart(){
          if(this.size && this.quantity){
              this.errorMsg = null
              console.log('Başarılı');
              let item = {id: this.id, name: this.shoe.model, size:this.size, quantity:this.quantity, fiyat: this.shoe.fiyat};
              this.addToShoppingCart(item)
          }
          else{
              this.errorMsg = 'Lütfen numara ve adet seçimi yapınız.'
          }
      },
      ...mapActions([
            'addToShoppingCart',
          ])
  }
}
</script>
