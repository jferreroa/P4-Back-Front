import {Request, Response} from "express";
import {Db} from "mongodb"


export const add = async (req:Request, res:Response) => {
    console.log("add")
    const db: Db = req.app.get("db")
    let body = req.body/*.Headers*/
    if(body.Headers){
        body=body.Headers
    }
    console.log("body",body)
    
    
    if(!body.password){
        console.log("no pass")
        return res.status(409).json({
            Body: "No has introducido contraseña"
         })
    }
    
    const alredyInDB = await db.collection("practica4front").findOne({username: body.username})
    if(!alredyInDB) {
        console.log("not on db")
        await db.collection("practica4front").insertOne({
            username: body.username,
            password: body.password,
            registerDate: new Date().toLocaleDateString()
        })
        
        return res.status(200).json({
            username: body.username,
            password: body.password
        })
        
    }else{
        return res.status(409).json({
            Body: "Ya existe alguien con ese usuario"
         })
    }
}

export const list = async (req:Request, res:Response) => {
    const db: Db = req.app.get("db")
    const allUsers = await db.collection("practica4front").find().toArray()

    if(allUsers){
        const arrayUsernames:{username:string, registerDate: Date}[] = allUsers.map((user) => {
            return {username: user.username, password: user.password, registerDate: user.registerDate}
        })
        return res.status(200).json({
            usuarios: arrayUsernames
        })
    }else{
        return res.status(404).json({
            Body: "No hay usuarios registrados"
         })
    }
        

    

}

export const remove = async (req:Request, res:Response) => {
    const db: Db = req.app.get("db")
    const okay = await db.collection("practica4front").deleteMany({})
    if(okay){
        return res.status(200).json({
           Status:"Se ha eliminado la coleccion"
        })
    }else{
        return res.status(404).json({
            Body: "No hay usuarios registrados"
         })
    }
}

export const removeOne = async (req:Request,res:Response) => {
    const db: Db = req.app.get("db")
    let body = req.body/*.Headers*/
    if(body.Headers){
        body=body.Headers
    }
    console.log("body",body)
    const finded = await db.collection("practica4front").findOne({username: body.username})

    if(finded){
        await db.collection("practica4front").deleteOne({username:body.username}).then(() => {
            return res.status(200).json({
                Status:"Se ha eliminado de la lista"
             })
        })
    }else{
        return res.status(404).json({
            Body: "No existe el usuario"
         })
    }
    
}