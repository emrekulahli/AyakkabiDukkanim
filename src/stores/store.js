import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
    shoppingCart:{total: 0, items:[]}
}

const getters = {
    getShoppingCart(state){
        return state.shoppingCart
    }
}

const mutations = {
    addToShoppingCart(state, payload){
        state.shoppingCart.items.push(payload);
        state.shoppingCart.total += payload.fiyat*payload.quantity;
    },
    removeToShoppingCart(state, item){
        let index = state.shoppingCart.items.indexOf(item);
        state.shoppingCart.total -= state.shoppingCart.items[index].fiyat*state.shoppingCart.items[index].quantity;
        state.shoppingCart.items.splice(index, 1);
        
    }
}

const actions = {
    addToShoppingCart({commit}, payload){
        commit('addToShoppingCart', payload);
    },
    removeToShoppingCart({commit}, index){
        commit('removeToShoppingCart', index)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins:[
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => { Cookies.set(key, state, { expires: 2 }) }
          })
    ]
})