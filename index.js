const express = require("express")
const path = require('path')
const { connectToMongoDB } = require('./config')
const urlRoute = require('./routes/url');
const staticRouter=require("./routes/staticRouter")
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log("mongoDB connected")
})

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/url", urlRoute);
app.use("/",staticRouter)
app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    // return res.end(`
    //     <html>
    //     <head></head>
    //     <body>
    //     <ol>
    //     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}`).join("")}
    //     </ol>
    //     </body>
    //     </html>
    //     `)
    return res.render('home',{
        urls:allUrls
    })
})


app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT ${PORT}`)
})