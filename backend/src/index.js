import express from 'express'
import cors from 'cors'
import prisma from './db.js';
import PasteRouter from "./routes/pasteRoutes.js"

const app = express();
app.use(cors({
    origin:"*",
    methods:['POST','GET','PUT','DELETE'],
    allowedHeaders:['Content-type','accept','Authorization']
}));
app.use(express.json());

app.get("/api/healthz", async(_, res) => {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ok:"true"});
})
app.use('/api',PasteRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is listening ${PORT}`))