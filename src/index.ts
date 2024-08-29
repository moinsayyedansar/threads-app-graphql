import express from "express";
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4';
// import { PrismaClient } from "@prisma/client";
import { prismaClient } from "./lib/db";




async function createserver() {
    const app = express();
    const PORT = 3000;

    app.use(express.json())
    const server = new ApolloServer({
        typeDefs: `
        type Query{
        hello:String
        }
        type Query{
        bye:String
        }
        type Mutation{
        createUser(firstName:String!,lastName:String!,password:String!,email:String!):Boolean
        }
        `,
        resolvers: {
            Query: {
                hello: () => "this is a string",
                bye: () => "this is a bye"
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
                    await prismaClient.user.create({
                        data: {
                            firstName, lastName, email, password, salt: "random_salt"
                        },
                    });
                    return true;
                },
            },
        },
    })

    await server.start()
    app.use("/graphql", expressMiddleware(server))

    app.listen(PORT, () => {
        console.log("server started at port ", 3000)
    })


}

createserver()


