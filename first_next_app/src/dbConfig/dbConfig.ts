import mongoose from 'mongoose'


export async function connect(){
    try { 
      mongoose.connect(process.env.MONGO_URL!)  //athere ! because we are in typescipt===that show there is always present mongo url  

      const connection=mongoose.connection
      connection.on('connected',()=>{
        console.log("MongoDB connected Succesfully");
      })
      connection.on('error',(err)=>{
        console.log('mongoDB Conection error,please sure MongoDb is runnig. '+err)
        process.exit()

      })
    } catch (error) {
        console.error("something went wrong",error)
    }


}