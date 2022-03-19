import {Db, MongoClient} from "mongodb";



export const getDB = async (): Promise<Db> => {
    
    const dbName:string = "Jaime"
    const user:string = "user"
    const passw:string = "root"
    const uri:string =  `mongodb+srv://${user}:${passw}@cluster0.cg7qb.mongodb.net/${dbName}?retryWrites=true&w=majority`
    
    const client = new MongoClient(uri)
    await client.connect()
    return client.db(dbName)
    

}