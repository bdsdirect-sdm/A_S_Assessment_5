import express from 'express';
import cors from 'cors'
import router from './router/userRouter';
import sequelize from './config/db';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT|| 4000;

app.use('/resume', express.static('resume'));
app.use(express.json());
app.use(cors());
app.use('/', router);

sequelize.sync({force:false}).then(()=> {
    // sequelize.sync({force:true}).then(()=> {
    console.log("Database is Connected........");

    app.listen(PORT, ()=>{
        console.log(`Server is connected with port ${PORT}`)
    })
}).catch((err)=>{
    console.log("Connection Failed: ", err);
})