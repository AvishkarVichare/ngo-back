const express = require('express');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user')
const campaignRouter = require('./routes/campaign')

app.use(cors())
app.use(express.json());
app.use('/api/u', userRouter);
app.use('/api/c', campaignRouter);


module.exports = app;