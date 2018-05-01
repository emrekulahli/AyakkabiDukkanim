<template>
    <v-container grid-list-md>
    
        <v-layout class="display-1 my-3 pl-2">
    
            {{capitalize(gender)}} Kategorisine Ait Ayakkabılar
    
        </v-layout>
    
        <v-layout style="margin: 22%" v-if="loading" align-center justify-center fill-height="">
    
    
    
            <v-progress-circular indeterminate color="secondary"></v-progress-circular>
    
    
    
        </v-layout>
    
        <v-layout v-else row wrap>
    
            <v-flex xs12 sm6 md4 v-for="(shoe, index) in shoes.slice((page-1)*6, (page-1)*6+6)" :key="index">
    
                <v-card class="mb-3 elevation-9">
    
                    <v-card-media v-if="shoe.imageUrl" :src="shoe.imageUrl" height="250px">
    
                        <v-container fill-height fluid>
    
                            <v-layout fill-height>
    
                                <v-flex xs12 align-end flexbox>
    
                                    <span class="headline" v-text="shoe.model"></span>
    
                                </v-flex>
    
                            </v-layout>
    
                        </v-container>
    
                    </v-card-media>
    
                    <v-container>
    
                        <span class="grey--text">{{shoe.aciklama}}</span><br>
    
                        <span>Fiyat: {{shoe.fiyat}}.00 ₺</span><br>
    
                        <span>Cinsiyet: {{shoe.cinsiyet}}</span><br>
    
                        <span>Tip: {{shoe.tip}}</span>
    
                    </v-container>
    
                    <v-card-actions>
    
                        <v-spacer></v-spacer>
    
                        <v-btn @click="goDetails(shoeIds[index])" outline color="teal" small>
    
                            Ürün Detayı
    
                        </v-btn>
    
                    </v-card-actions>
    
                </v-card>
    
            </v-flex>
    
    
    
        </v-layout>
    
        <v-layout align-center justify-center>
    
    
    
            <v-pagination color="secondary" :length="paginationLength" v-model="page"></v-pagination>
    
    
    
        </v-layout>
    
    </v-container>
</template>


<script>
    import service from "../service/service";
    
    export default {
    
        data() {
    
            return {
    
                shoes: [],
    
                shoeIds: [],
    
                loading: true,
    
                page: 1
    
            };
    
        },
    
        props: ["gender"],
    
        watch: {
    
            $route: "getShoes"
    
        },
    
        created() {
    
            this.getShoes();
    
        },
    
        methods: {
    
            capitalize(string) {
    
                return string.charAt(0).toUpperCase() + string.slice(1);
    
            },
    
            getShoes() {
    
                if (this.$route.query.type) {
    
                    if (this.gender === "erkek") {
    
                        service.getMales(this.$route.query.type).then(res => {
    
                            this.shoes = Object.keys(res.val()).map(k => {
    
                                return res.val()[k];
    
                            });
    
                            this.shoeIds = Object.keys(res.val());
    
                            this.loading = false;
    
                        });
    
                    } else {
    
                        service.getFemales(this.$route.query.type).then(res => {
    
                            this.shoes = Object.keys(res.val()).map(k => {
    
                                return res.val()[k];
    
                            });
    
                            this.shoeIds = Object.keys(res.val());
    
                            this.loading = false;
    
                        });
    
                    }
    
                } else {
    
                    if (this.gender === "erkek") {
    
                        service.getMales().then(res => {
    
                            this.shoes = Object.keys(res.val()).map(k => {
    
                                return res.val()[k];
    
                            });
    
                            this.shoeIds = Object.keys(res.val());
    
                            this.loading = false;
    
                        });
    
                    } else {
    
                        service.getFemales().then(res => {
    
                            this.shoes = Object.keys(res.val()).map(k => {
    
                                return res.val()[k];
    
                            });
    
                            this.shoeIds = Object.keys(res.val());
    
                            this.loading = false;
    
                        });
    
                    }
    
                }
    
            },
    
            goDetails(index) {
    
                this.$router.push({
    
                    name: "Detail",
    
                    params: {
    
                        id: index
    
                    }
    
                });
    
            }
    
        },
    
        computed: {
    
            paginationLength() {
    
                return Math.ceil(this.shoes.length / 6);
    
            }
    
        }
    
    };
</script>
