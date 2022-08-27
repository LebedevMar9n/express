const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), 'enviroments', `${process.env.MODE}.env`) });

const { PORT, MONGO_URL } = require('./constants/config');
const { userRouter, authRouter } = require('./routes');

mongoose.connect(MONGO_URL);

const app = express();
const port = PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressFileUpload());
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json('page not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error'
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));