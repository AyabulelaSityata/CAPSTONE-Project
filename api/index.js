const {express, routes} = require('./controller')
const path = require('path')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandling = require('./middleware/ErrorHandling')
const port = +process.env.PORT || 3000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Request-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Expose-Headers", "Authorization")
    next();
})

// static
app.use(
    express.static('./static'),
    express.urlencoded({
        extended: false
    }),
    cookieParser(),
    cors(),
    routes
)

// Handling errors using error middleware.
app.use(errorHandling)
    
routes.get('^/$|/CAPSTONE-Project/',
    (req, res) => {
        res.sendFile(path.resolve(__dirname, './static/html/index.html'))
})

app.listen(port, () => {
    console.log(`The server is running on port
    ${port}`);
})