
import {createStore} from 'vuex'
import mutations from './mutations'
import actions from './actions'

const state = {
    username: '',
    cartCount: 0
}
export default createStore({
    state,
    mutations,
    actions
})