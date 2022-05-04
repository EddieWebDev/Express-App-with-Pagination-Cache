const axios = require("axios").default

const cache = require("./cache")

function api() {
    return axios.create({
        baseURL:process.env.BASE_URL
    })
}


module.exports.getPosts = async function(pageNumber) {
    const cacheFileName = "cache/postspage" + pageNumber
    let content = undefined

    content = cache.getCache(cacheFileName)

    if(!content) {
        const response = await api().get("/posts", {
            params: {per_page: 6, page: pageNumber}
        })
        content = cache.setCache(response, cacheFileName)
    }
    return content
}

module.exports.getPages = async function(pageNumber) {
    const cacheFileName = "cache/page" + pageNumber
    let content = undefined

    content = cache.getCache(cacheFileName)

    if(!content) {
        const response = await api().get("/pages", {
            params: {per_page: 1, page: pageNumber}
        })
        content = cache.setCache(response, cacheFileName)
    }
    return content
}