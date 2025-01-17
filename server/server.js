import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from './utils/connect.js'
//import { userRouter } from './routes/userRouter.js'
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors())
//app.use('/users', userRouter)
app.get('/',(req,res)=>res.send('API Working'))
  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Hello from test!' });
  });

app.use((err, req,res,next)=>{
    console.log(err);
    return res.sendStatus(500)
})
const PORT=process.env.PORT ||5000

connect().then(()=>{
    app.listen (PORT, ()=> console.log(`Server läuft auf http://localhost:${PORT}`))
})
//export default app;