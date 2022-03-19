import express, {Response, Request} from "express";
import {getDB} from "./mongo";
import { Db } from "mongodb";
import { add, list, remove, removeOne } from "./resolvers";
var cors = require('cors')

const run = async () => {

    const app = express()
    const db:Db = await getDB()

    app.use(cors())

    app.use(express.urlencoded({extended: true}));
    app.use(express.json())
    app.set("db", db);


    app.get("/", (req:Request, res:Response) =>{
        res.status(200).json("Funcionando")
    })
    app.get("/status", (req:Request, res:Response) => {
        const today = new Date().toLocaleDateString()
        res.status(200).json(`${today}`)
    });


    app.get("/list",list)
    app.post("/add", add)
    app.post("/remove",remove)
    app.post("/removeOne",removeOne)


    app.listen(4000);
    console.log("app listening on port 4000")
}


try {

    run()
    
} catch (error) {
    console.log(error)
}