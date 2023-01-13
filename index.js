const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const cors = require('cors');

const userRouter = require('./routes/userRoutes.js');

mongoose.connect("mongodb://127.0.0.1:27017/users").then(() => console.log(chalk.blue('db connected')));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

app.listen(4000, () => console.log(chalk.blue('server running at http://localhost:4000')));
