import "reflect-metadata";
import app from './app';
import { AppDataSource } from './infrastructure/db';
import {Request, Response} from "express";

// dotenv.config();
// const PORT = process.env.PORT || 500;

const PORT = 1000;

AppDataSource.initialize().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Application running at http://localhost:${PORT}`)
      console.log("Database connected");
    })
}).catch(error => {
    console.log(`Database:${error.message}`)
})
