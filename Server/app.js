const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3001;


app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());







const Adminrouter = require('./routers/adminRouter')
const HistoryRouter = require('./routers/HistoryRouter')
const UserBookListRouter = require('./routers/UserBookListRouter')
const UserRouter = require('./routers/userRouter')

const Authentication = require('./middlewares/Authentication')
const ErrorHandler = require('./middlewares/ErrorHandler')


app.use('/user', UserRouter)

app.use(Authentication)
app.use('/user', HistoryRouter)
app.use('/user', UserBookListRouter)
app.use('/admin',Adminrouter)

app.use(ErrorHandler)


app.use(express.static(path.join(__dirname, "../Kafebuku/dist")));
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../Kafebuku/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



module.exports = app;

//HRKU-f1be4a08-e8b1-437f-8f3d-39d2f9ed7972
//heroku config:set HEROKU_API_KEY=<your_api_key>

//heroku login -i
//heroku config:set HEROKU_API_KEY=HRKU-f1be4a08-e8b1-437f-8f3d-39d2f9ed7972 --app kafebuku

//export HEROKU_API_KEY=HRKU-f1be4a08-e8b1-437f-8f3d-39d2f9ed7972