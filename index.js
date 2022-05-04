require("dotenv").config()
const express = require("express")
const app = express()
const port = 8000

const handlebars = require("express-handlebars")
const api = require("./api-calls.js")

app.engine('hbs', handlebars.engine({
    defaultLayout: "main",
    extname: "hbs"
}));

app.set("view engine", "hbs")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/posts", async (req, res) => {
    let page = parseInt(req.query.page)
    
    if (isNaN(page)) {
        page = 1
    }
    
    const postsResponse = await api.getPosts(page)
    const posts = postsResponse.responseData
    
    const numberOfPages = (parseInt(postsResponse.responseHeaders['x-wp-totalpages']))
    const nextPageNumber = page + 1
    const prevPageNumber = page - 1
    const showPrevLink = page > 1
    const showNextLink = page < numberOfPages
    
    res.render("posts", {posts, nextPageNumber, prevPageNumber, page, showPrevLink, showNextLink})
})

app.get("/pages", async (req, res) => {

    let page = parseInt(req.query.page)
    
    if (isNaN(page)) {
        page = 1
    }
    
    const pagesResponse = await api.getPages(page)
    const pages = pagesResponse.responseData
    
    const numberOfPages = (parseInt(pagesResponse.responseHeaders['x-wp-totalpages']))
    const nextPageNumber = page + 1
    const prevPageNumber = page - 1
    const showPrevLink = page > 1
    const showNextLink = page < numberOfPages
    
    res.render("pages", {pages, nextPageNumber, prevPageNumber, page, showPrevLink, showNextLink})
})

app.listen(port, () => console.log(`http://localhost:${port}`))