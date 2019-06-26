import List from './List'
import ListItem from './ListItem'
const list = {
    install(Vue){
        Vue.component('KtjList',List)
        Vue.component('KtjListItem',ListItem)
    }
}
export default list