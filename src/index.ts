import express from "express";
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';




async function createserver(){
    const app = express();
const PORT = 3000;

app.use(express.json())
    const server = new ApolloServer({
        typeDefs:`
        type Query{
        hello:String
        }
        `,
        resolvers:{
            Query:{
                hello:()=> "this is a string"
            }
        },
      })
    
    await server.start()
app.use("/graphql",expressMiddleware(server))
    
app.listen(PORT,()=>{
    console.log("server started at port ",3000)
})


}

createserver()


