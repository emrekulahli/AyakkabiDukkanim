<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="display-1">Şiparişler</span>     
                <v-spacer></v-spacer>
                <v-text-field
                    append-icon="search"
                    label="Ara"
                    single-line
                    hide-details
                    v-model="search"
                ></v-text-field>
            </v-card-title>
        </v-card>
        <v-data-table
                    :headers="headers"
                    :items="orders"
                    class="elevation-1"
                    :search="search"
                    item-key="order_number"
                    >

                    <tr class="table_row" slot="items" slot-scope="props" :keys="props.item.order_number" @click="props.expanded = !props.expanded; successMsg = null; errorMsg = null; status = props.item.status">                       
                        <td name="orderNo" class="text-xs-left">{{props.item.order_number}}</td>
                        <td  class="text-xs-left" >{{ props.item.name }}</td>
                        <td  class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.status }}</td>
                    </tr>
                
                <template slot="expand" slot-scope="props">

                    <v-card style="background-color: #EEEEEE" flat>

                        <v-card-text class="body-1">
                           <v-layout row wrap >
                              <v-spacer></v-spacer>
                              <v-btn flat icon @click="props.expanded = !props.expanded; successMsg = null; errorMsg = null; status = props.item.status">
                                 <v-icon  
                                 color="secondary">
                                    close
                                 </v-icon> 
                              </v-btn>                             
                           </v-layout>
                            <v-layout row wrap style="margin-top:-20px">
                            <v-flex xs12 sm12 md6 >
                             
                            <v-list  >
                                <v-list-tile class="mb-0 pb-0">                               
                                <v-list-tile-title >Ürünler</v-list-tile-title>                         
                                </v-list-tile>
                                <v-list-tile style="margin-top:-20px" v-for="(item,index) in props.item.products.items" :key="index">                                   
                                <v-list-tile-content class="py-0">
                                    <v-list-tile-sub-title>
                                        {{item.quantity}} Adet  {{item.name}} {{item.size}} numara
                                    </v-list-tile-sub-title>                                                                           
                                </v-list-tile-content>                                                                           
                                </v-list-tile>
                                <v-list-tile style="margin-top:-20px">                                   
                                <v-list-tile-content class="py-0">
                                    <v-list-tile-sub-title>
                                        Toplam: {{props.item.products.total}}.00 ₺
                                    </v-list-tile-sub-title>                                                                           
                                </v-list-tile-content>                                                                           
                                </v-list-tile>
                            </v-list>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                                <v-list>
                                     <v-list-tile>
                                
                                    <v-list-tile-title >Adres</v-list-tile-title>
                                                                           
                                                                                                      
                                </v-list-tile>
                                    <v-list-tile style="margin-top:-20px">
                                <v-list-tile-content >
                                    <v-list-tile-sub-title>{{props.item.adress}}</v-list-tile-sub-title>    
                                                                                                      
                                </v-list-tile-content>                                                                           
                                </v-list-tile>

                                <v-list-tile-content class="pl-3">
                                    
                                    <v-select v-model="status" label="Sişariş Durumu" :items="['Bekliyor', 'Onaylandı', 'İptal']">                                      
                                    </v-select>
                                    
                                      <div class="success--text body-1" v-if="successMsg">{{successMsg}}</div>
                                      <div class="error--text body-1" v-else-if="errorMsg">{{errorMsg}}</div>                                                                       
                                </v-list-tile-content> 
                                <v-btn @click="updateStatus(props.item)" small class="ml-3 elevation-5">Kaydet</v-btn>                                                                          
                                
                                </v-list>
                            </v-flex>
                            </v-layout>   
                        </v-card-text>
                    </v-card>
                </template>
                <template style="padding: 0" slot="no-data">
                    <v-layout align-center justify-center>
                        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                    </v-layout>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import service from '../../service/service'
import adminService from '../../service/adminService'
export default {
  data(){
      return {
          orders: [],
          expanded: {},
          orderNumbers: [],
          search: '',
          headers: [
            { text: 'Sipariş No', sortable: false, value: 'order_number'},
            { text: 'Ad Soyad',sortable: false, value: 'name' },
            { text: 'Email',sortable: false, value: 'email' },
            { text: 'Sipariş Durumu',sortable: false, value: 'status' },
          ],
          status: null,
          successMsg: null,
          errorMsg: null
      }
  },
  created(){
      service.getOrders().then(res => {
          this.orders = Object.keys( res.val()).map(k => { return  res.val()[k] });
          this.orderNumbers = Object.keys( res.val());
          console.log(this.orderNumbers);
      })
  },
  methods:{
   updateStatus(item){
      var editedStatus = this.status
      var index = this.orders.indexOf(item)
      var _id = this.orderNumbers[index]
      adminService.updateStatus(_id, this.status)
      .then(res => {
         this.orders[index].status = editedStatus;
         this.successMsg = 'İşlem başarıyla gerçekleşti'
      })
      .catch(err => {
         this.errorMsg = 'Durum güncelenirken bir sorun oluştu'
      })

   }
  }
}
</script>

<style>
.application .theme--light.list, .theme--light .list {
    background: inherit;
}

.table_row:hover{
   cursor: pointer;
}
</style>
