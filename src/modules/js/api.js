let url = {
    swipe: '/index/swipe',
    hotLists: '/index/hotLists',
    topLists: '/category/top',
    subLists: '/category/sub',
    rankLists: '/category/rank',
    searchLists: './search/lists',
    details: './goods/details',
    deal: './goods/dealLists',
    addCart: './cart/add'
}

let host = 'http://rap2api.taobao.org/app/mock/14795/'

for (const key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]        
    }
}

export default url