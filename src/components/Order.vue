<template>
    <v-container>
    
        <v-dialog persistent v-model="dialog" max-width="800">
    
            <v-card style="min-height: 50%;">
    
                <v-card-text>
    
                    <p xs12 class="display-1 teal--text">Sipariş İşleminiz Başarıyla Gerçekleşti</p>
    
                    <label class="headline">Sipariş Numarası: {{orderNumber}}</label>
    
                </v-card-text>
    
                <v-card-actions>
    
                    <v-spacer></v-spacer>
    
                    <v-btn small outline color="teal" @click.native="goHome()">Kapat</v-btn>
    
                </v-card-actions>
    
            </v-card>
    
        </v-dialog>
    
        <v-card>
    
            <v-form v-model="valid" ref="form" lazy-validation>
    
                <v-container fluid>
    
                    <v-text-field label="Ad Soyad" v-model="name" :rules="nameRules" :counter="30" required></v-text-field>
    
                    <v-text-field label="Adres" v-model="adress" :rules="adressRules" :counter="160" required></v-text-field>
    
                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
    
                    <v-text-field label="Kredi Kartı Numarası" mask="credit-card" v-model="creditCart" :counter="16" :rules="cardRules" required></v-text-field>
    
                    <v-container>
    
                        <h3 class="mb-1">Sipariş Özeti</h3>
    
                        <span class="teal--text" v-for="item in getShoppingCart.items" :key="item.model">
    
                                    {{item.quantity}}X {{item.name}} {{item.size}} Numara | {{item.fiyat}}.00₺<br>
    
                                </span>
                        <span class="body-2">Toplam: {{getShoppingCart.total}}.00 ₺</span>
                    </v-container>
    
                    <v-checkbox label="Siparişi Onaylıyormusunuz?" v-model="checkbox" :rules="[v => !!v || 'Devam etmek için siparişi onaylayınız.']" required></v-checkbox>
       
                    <v-btn color="success" @click="submit" :disabled="!valid">
    
                        Satın Al
    
                    </v-btn>
    
                </v-container>
    
            </v-form>
    
    
    
        </v-card>
    
    
    
    </v-container>
</template>

<script>
    import service from '../service/service'
    
    import {
    
        mapGetters
    
    } from 'vuex'
    
    import * as Cookies from 'js-cookie'
    
    export default {
    
        data() {
    
            return {
    
                dialog: false,
    
                valid: true,
    
                orderNumber: null,
    
                name: '',
    
                nameRules: [
    
                    v => !!v || 'İsim alanı zorunludur',
    
                    v => (v && v.length <= 30) || 'İsim 30 karakterden küçük olmalıdır',    
    
                ],
    
                email: '',
    
                emailRules: [
    
                    v => !!v || 'E-mail adresi gereklidir',
    
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Lütfen geçerli bir mail adresi giriniz.'
    
                ],
    
                adress: '',
    
                adressRules: [
    
                    v => !!v || 'Adres alanı zorunludur',
    
                    v => (v && v.length <= 160) || 'Adres 160 karakterden küçük olmalıdır',
    
                ],
    
                creditCart: '',
                cardRules: [
                    v => !!v || 'Bu alan gereklidir',
                    v => (v && v.length === 16) || 'Kart numarası 16 karakterden oluşmalıdır',

                ],
    
                select: null,
    
                checkbox: false
    
            }
    
        },
    
        methods: {
    
            submit() {
    
                if (this.$refs.form.validate()) {
    
                    this.orderNumber = this.generateOrderNumber();
    
                    let user = {
    
                        name: this.name,
    
                        adress: this.adress,
    
                        email: this.email
    
                    }
    
                    service.createOrder(this.orderNumber, user, this.getShoppingCart).then(res => {
    
                        Cookies.remove('vuex');
    
                        this.dialog = true;
    
                        console.log(res);
    
                    })
    
                } else {
    
                    this.valid = false
    
                }
    
            },
    
            goHome() {
    
                this.$router.go()   
                this.$router.push({name:'Home'})    
    
            },
    
            generateOrderNumber() {
    
                return Math.floor(Math.random() * 99999999999) + 10000000000
    
            },      
        },
       
        computed: {
    
            ...mapGetters([
    
                'getShoppingCart'
    
            ])
    
        },

        created(){
            if(this.getShoppingCart.items.length === 0){
                this.$router.push('/')
            }
        }
    
    }
</script>
