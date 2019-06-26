import {$post} from './main.entrance'

/**
 * 新闻列表
 */
export function getNews(params){
    return new Promise((resolve)=>{
        params.act = 'appNews'
        params.callKeyName = 'news'
        $post(`Microportal.Common.import`,[params]).then(res=>{
            resolve(res.news)
        })
    })
}

/**
 * 新闻内容页
 */

export function newsDetail(params){
    return new Promise((resolve)=>{
        $post(`Microportal.Common.newsDetail`,params).then(res=>{
            resolve(res)
        })
    })
}

