
export default {
    saveUserName(context, username){
        context.commit('saveUserName',username)
    },
    getCartCount(context, cartCount){
        context.commit('getCartCount',cartCount)
    }
}