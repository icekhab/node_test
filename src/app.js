const express = require('express');
const bodyParser = require('body-parser');
const {errorHandler} = require('./utils/express/errorHandler');
const bearerToken = require('express-bearer-token');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./userManagement/routes/authRoutes');
const usersRouter = require('./userManagement/routes/userRoutes');

const {AuthService} = require('./userManagement/services/authServices');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bearerToken());
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/auth', authRouter);
app.use('/api/users', AuthService.verify, usersRouter);

app.use(errorHandler);

module.exports = {app};
