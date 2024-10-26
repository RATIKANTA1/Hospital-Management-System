import express from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";


const app = express();
config({path: "./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URI, process.env.DASHBORD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://eloquent-tiramisu-731c90.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


dbConnection();


app.use(errorMiddleware);
export default app;