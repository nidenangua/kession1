import Title from './Title'
import Carousel from './Carousel'
import Nav from './Nav'
import News from './News'
import Course from './Course'
import Richtext from './Richtext'
import Banner from './Banner'
import VipCard from './VipCard'
import StoreInfo from './StoreInfo'
import Search from './Search'
import Group from './Group'
import Teacher from './Teacher'
const dragComponents = {
    install(Vue){
        Vue.component('KdTitle',Title)
        Vue.component('KdCarousel',Carousel)
        Vue.component('KdNav',Nav)
        Vue.component('KdNews',News)
        Vue.component('KdCourse',Course)
        Vue.component('KdRichtext',Richtext)
        Vue.component('KdBanner',Banner)
        Vue.component('KdVipCard',VipCard)
        Vue.component('KdStoreInfo',StoreInfo)
        Vue.component('KdSearch',Search)
        Vue.component('KdGroup',Group)
		Vue.component('kdTeacher',Teacher)
    }
}
export default dragComponents
