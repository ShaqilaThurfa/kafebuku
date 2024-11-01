const cors = require('cors')



const express = require("express")
const app = express()
const port = 3001

// app.post('/user/register', (req, res) => {
//   res.send('Hello World!')
// })

app.use(cors())


const Adminrouter = require('./routers/adminRouter')
const HistoryRouter = require('./routers/HistoryRouter')
const UserBookListRouter = require('./routers/UserBookListRouter')
const UserRouter = require('./routers/userRouter')

const Authentication = require('./middlewares/Authentication')
const GuardAdmin = require('./middlewares/GuardAdmin')
const NotBanned = require('./middlewares/NotBanned')
const ErrorHandler = require('./middlewares/ErrorHandler')
const UserController = require('./controller/UserController')

// const UserController = require('./controller/UserController')

app.use(express.urlencoded( { extended: true}))
app.use(express.json())






app.use('/user', UserRouter)

app.use(Authentication)
app.use('/user', HistoryRouter)
app.use('/user', UserBookListRouter)



app.use('/admin',Adminrouter)

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;