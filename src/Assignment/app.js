const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const adminRouter = require('./routers/admin');
const connection = require('./connection/connection');
connection.con();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(userRouter);
app.use(postRouter);
app.use(adminRouter);

app.listen(3000);