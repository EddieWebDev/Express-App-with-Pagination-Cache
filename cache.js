const fs = require("fs")


module.exports.setCache = function(response, cacheFileName) {
        const time = Date.now()

        const cacheResponse = {
            responseData: response.data,
            responseHeaders: response.headers
        }

        const data = JSON.stringify({time: time, content: cacheResponse})
        fs.writeFileSync(cacheFileName, data)
        return cacheResponse
    
}

module.exports.getCache = function(cacheFileName) {
     if(fs.existsSync(cacheFileName)) {
        const fileContent = fs.readFileSync(cacheFileName)
        const fileData = JSON.parse(fileContent)

        const oneHrAgo = Date.now() - (60*60*1000)

        if(oneHrAgo < fileData.time) {
            content = fileData.content
            return content
        } 
        else {
            return undefined
        }
    }
}