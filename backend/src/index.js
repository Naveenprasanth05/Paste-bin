import express from 'express'
import cors from 'cors'
import connectDB from "./db.js"
import PasteRouter from "./routes/pasteRoutes.js"
import dotenv from "dotenv";



const app = express();
app.use(cors({
    origin:"https://frontend-paste-bin.onrender.com",
    methods:['POST','GET','PUT','DELETE'],
    allowedHeaders:['Content-type','accept','Authorization']
}));
app.use(express.json());

dotenv.config();
connectDB();

app.get("/api/healthz", async(_, res) => {
    return res.status(200).json({ok:"true"});
})
app.use('/api',PasteRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is listening ${PORT}`))
