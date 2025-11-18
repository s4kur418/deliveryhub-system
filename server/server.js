import express from "express"
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.js'
import sessionRouter from './routes/session.js'
import ordersRouter from './routes/orders.js'
import dashboardRouter from './routes/dashboard.js'
import ridersRouter from './routes/riders.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5000", 
  credentials: true                
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use('/api', authRouter)
app.use('/api', sessionRouter)
app.use('/api', ordersRouter)
app.use('/api', dashboardRouter)
app.use('/api', ridersRouter)

app.get("/", (req, res) => {
    return res.json("From Server Side");
});

app.listen(8081, () =>  {
    console.log("listening..");
});