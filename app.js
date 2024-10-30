
// const cors = require('cors')


const express = require('express')
const app = express()
const port = 3000

// app.post('/user/register', (req, res) => {
//   res.send('Hello World!')
// })




const Adminrouter = require('./routers/adminRouter')
const HistoryRouter = require('./routers/HistoryRouter')
const UserBookListRouter = require('./routers/UserBookListRouter')
const UserRouter = require('./routers/userRouter')

// // const Authentication = require('./middlewares/Authentication')
// // const GuardAdmin = require('./middlewares/GuardAdmin')
// // const NotBanned = require('./middlewares/NotBanned')
const ErrorHandler = require('./middlewares/ErrorHandler')

// const UserController = require('./controller/UserController')



// // app.use(cors())
app.use(express.urlencoded( { extended: true}))
app.use(express.json())

// app.post("/user/register", UserController.register);

app.use(UserRouter)

app.use(HistoryRouter)

// // // app.use(NotBanned)
app.use(UserBookListRouter)


// // // app.use(GuardAdmin)
app.use(Adminrouter)

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;