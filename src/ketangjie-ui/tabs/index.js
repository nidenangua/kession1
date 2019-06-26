import Tabs from './Tabs'
import TabPane from './TabPane'
const tabsComponent = {
    install(Vue){
        Vue.component('KtjTabs',Tabs)
        Vue.component('KtjTabPane',TabPane)
    }
}
export default tabsComponent