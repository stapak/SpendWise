import express from 'express';

import 'dotenv/config';
import { connectDB } from './config/db.js';

import cors from 'cors';
import logger from './middleware/logger.js';

// routers.
import userRouter from './routes/userRoutes.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

const app = express();
const port= 4000;

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);

// DB
 
connectDB();

// Routes
app.use("/api/user",userRouter);
app.use("/api/income",incomeRouter);
app.use("/api/expense",expenseRouter);
app.use("/api/dashboard",dashboardRouter);

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})