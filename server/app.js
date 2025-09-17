import express from 'express';
import { config } from 'dotenv'
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import router from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousroutes from './routes/miscellaneous.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //used to decode the token which is passed in the url

app.use(cors({
    origin: "https://lms-mern-aql1.onrender.com",
    credentials: true
}))


app.use(cookieParser()) ;

//we will use a library morgan to see in the console that the user is trying to access which path
app.use(morgan('dev')); 

app.get('/ping', (req, res) => {
    res.send('/pong');
});

app.use('/api/v1/user', router);  //possible error/bug - this might be userRoutes
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscellaneousroutes)


app.use(errorMiddleware);

export default app;
