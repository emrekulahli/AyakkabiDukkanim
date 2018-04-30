const database = firebase.database();

export default {

    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logOut(){
        
        firebase.auth().signOut().then(function() {
            
          }).catch(function(error) {
            var errorMessage = error.message;
            
          });
    },
    isAuth(){
        var isAdmin = false; 
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            return  true;
            
        } else {
            return false;
            
        }
        });         
    },
    updateStatus(_id, payload){
        return database.ref('orders/' + _id).update({
            status: payload,           
        });
    },
    updateShoe(_id, payload){
        return database.ref('shoes/' + _id).update(payload);
    },

    deleteShoe(_id){
        return database.ref('shoes/' + _id).remove();
    },

    createShoe(payload){
        console.log(payload);
        return database.ref('shoes').push({
            marka: payload.marka,
            model: payload.model,
            tip: payload.tip,
            fiyat: payload.fiyat,
            cinsiyet: payload.cinsiyet,
            stok: payload.stok,
            aciklama: payload.aciklama,
            imageUrl : payload.imageUrl,
            filter: payload.cinsiyet + '-' + payload.tip 
        });
    },

}