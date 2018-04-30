const database = firebase.database();
export default {
    
    getAllShoes(){
        return firebase.database().ref('/shoes').once('value');
    },

    getFemales(type){
        if(type){
            return firebase.database().ref('shoes').orderByChild('filter').equalTo('Kadın-' + type).once('value');
        }else{
            return firebase.database().ref('shoes').orderByChild('cinsiyet').equalTo('Kadın').once('value');
        }
    },

    getMales(type){
        if(type){
            return firebase.database().ref('shoes').orderByChild('filter').equalTo('Erkek-' + type).once('value');
        }else{
            return firebase.database().ref('shoes').orderByChild('cinsiyet').equalTo('Erkek').once('value');
        }
    },
    getShoe(uid){
        return firebase.database().ref('/shoes/' + uid).once('value');
    },

    createOrder(order_number, user, cart){
        return database.ref('orders').push({
            order_number: order_number,
            name: user.name,
            email: user.email,
            adress: user.adress,
            status: 'Bekliyor',
            products: cart
        });
    },

    getOrders(){
        return firebase.database().ref('/orders').once('value'); 
    }

}