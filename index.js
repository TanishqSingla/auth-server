const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('userRouter');

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(4000, () => console.log('server running at http://localhost:4000'));
