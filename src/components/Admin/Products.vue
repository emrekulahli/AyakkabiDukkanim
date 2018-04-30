<template>
    <div>
        
        <v-dialog v-model="dialog" max-width="800px" persistent>
      
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap >
                <v-flex xs12 sm6 md4>
                <v-text-field label="Marka" v-model="editedItem.marka"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Model" v-model="editedItem.model"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                
                <v-text-field type="number" label="Fiyat"  v-model="editedItem.fiyat"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                  <v-select label="Cinsiyet" :items="['Erkek', 'Kadın']" v-model="editedItem.cinsiyet"/>
                  </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select label="Tip" :items="['Spor', 'Klasik']" v-model="editedItem.tip"/>
              </v-flex>
                <v-flex xs12 sm6 md4>
                <v-text-field type="number"  label="Stok" v-model="editedItem.stok"></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field textarea row-height=15 label="Açıklama" v-model="editedItem.aciklama"></v-text-field>

              </v-flex>
               
              <v-flex xs12>
                <v-text-field readonly label="Resim" v-model="editedItem.imageUrl"></v-text-field>

                
              </v-flex>
                <v-flex xs12 sm6>
                    <input style="display: none;" @change="onFileSelected" ref="fileinput" type="file"  accept="image/*">
                    <v-btn @click="onFileSelect">Resim Seçiniz</v-btn>
                    <v-btn :loading="uploading" :disabled="uploading" @click="onUpload">Yükle</v-btn>
                    <p class="subheading pl-2" v-if="selectedFile.name">{{selectedFile.name}}</p>
                </v-flex>
              <v-flex class="" xs12 sm6>
                  <span class="title">Önizleme</span>
                <v-card class="mb-3 elevation-9">
                    <v-card-media
                    :src="imageUrl"
                    height="250px"
                    >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline" v-text="editedItem.model"></span>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-media>
                    <v-container>
                        <span class="grey--text">{{editedItem.aciklama}}</span><br>
                        <span >Fiyat: {{editedItem.fiyat}} </span><br>
                        <span>Cinsiyet: {{editedItem.cinsiyet}}</span><br>
                        <span>Tip: {{editedItem.tip}}</span>
                    </v-container>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn elevation-12 small>
                        Ürün Detayı
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="toggleDialog()">Kapat</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-card>
            <v-card-title> 
                <span class="display-1">Ürünler</span> 
                <v-btn round outline class="mt-2" color="secondary" dark @click="toggleDialog()">Yeni Ürün</v-btn>         
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
                    :items="shoes"
                    class="elevation-1"
                    :search="search"
                    item-key="order_number"
                    >

                    <template slot="items" slot-scope="props">                       
                        <td name="orderNo" class="text-xs-left">{{props.item.model}}</td>
                        <td  class="text-xs-left" >{{ props.item.cinsiyet }}</td>
                        <td  class="text-xs-left">{{ props.item.tip }}</td>
                        <td class="text-xs-left">{{ props.item.fiyat }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="editItem(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                
                <template style="padding: 0" slot="no-data" >
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
          dialog: false,
          shoes: [],
          shoeId: [],
          editedIndex: -1,
          editedItem: {

            },
          search: '',
          headers: [
            { text: 'Model', sortable: false, value: 'model'},
            { text: 'Cinsiyet',sortable: false, value: 'cinsiyet' },
            { text: 'Tip',sortable: false, value: 'tip' },
            { text: 'Fiyat',sortable: false, value: 'fiyat' },
          ],
          status: null,
          successMsg: null,
          errorMsg: null,
          selectedFile: {},
          imageUrl: '',
          uploading:false
      }
  },
      computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Yeni Ürün Ekle' : 'Düzenle'
      }
    },

  created(){
      service.getAllShoes().then(res => {
          this.shoes = Object.keys( res.val()).map(k => { return  res.val()[k] });
          this.shoeId = Object.keys( res.val());
          console.log(this.shoeId);
      })
  },
  methods:{
      getShoes(){
          
      },
    toggleDialog(){
          
          this.imageUrl = null
          this.selectedFile = {}
          this.editedItem = Object.assign({}, {})
          this.dialog = !this.dialog
          this.editedIndex = -1
      },
   editItem (item) {
       this.toggleDialog()
       this.imageUrl = item.imageUrl
        this.editedIndex = this.shoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        
      },

      deleteItem (item) {
        const index = this.shoes.indexOf(item)
        const _id = this.shoeId[index]
        confirm('Bu Ürünü Silmek İstediğinize eminmisiniz') && (
            adminService.deleteShoe(_id).then(res => {
                this.shoes.splice(index, 1)
            })
            
            )
      },

      save () {
        if (this.editedIndex > -1) {
          const id = this.shoeId[this.editedIndex]
          this.editedItem.imageUrl = this.imageUrl
          adminService.updateShoe(id, this.editedItem).then(res => {
            Object.assign(this.shoes[this.editedIndex], this.editedItem)
            this.dialog = false
            this.editedItem = {}
            this.editedIndex = -1
          })
         
        } else {
          this.editedItem.imageUrl = this.imageUrl
          const payload = this.editedItem
          console.log(payload)
          adminService.createShoe(payload).then(res => {
              
                this.shoes.push(payload)
                this.dialog = false
                this.editedItem = {}
                this.editedIndex = -1
          })
        }
        
      },
      onFileSelected(event){            
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile);
      },
      onFileSelect(){
          this.$refs.fileinput.click()
      },
      onUpload(){
          this.uploading = true
          const i = this.selectedFile.type.indexOf('/')
          const type = this.selectedFile.type.substring(0, i)
          console.log(type)
       if(type === 'image'){
          firebase.storage().ref('/images/' + this.selectedFile.name).put(this.selectedFile).then(res => {

              this.imageUrl = res.downloadURL
              this.editedItem.imageUrl = this.imageUrl
              this.uploading = false
              console.log(res)
          }).catch(err => {
              console.log(err.message)
          })
       }
       else{
           window.alert('Seçtiniz Dosya Resim Olmalıdır')
       }

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
