import { prismaClient } from "../lib/db";
import { ApolloServer } from '@apollo/server'
import { user } from "./users";
import { mutations } from "./users/mutations";
async function createGraphqlServer(){
    const server = new ApolloServer({
        typeDefs: `
        type Query{
        hello:String
        }
        type Mutation{
        ${user.mutations}
        }
        `,
        resolvers: {
            Query: {
                ...user.resolvers.queries
            },
            Mutation:{
                ...user.resolvers.mutations
            }
            },
        },
    );

    await server.start()
    return server
}
export default createGraphqlServer