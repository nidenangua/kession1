import Form from './Form'
import FormItem from './FormItem'
const from = {
    install(Vue){
        Vue.component('KtjForm',Form)
        Vue.component('KtjFormItem',FormItem)
    }
}
export default from