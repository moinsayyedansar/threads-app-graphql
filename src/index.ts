import express from "express";
import { expressMiddleware } from '@apollo/server/express4';

import createGraphqlServer from "./graphql/index"


async function init(){

    const app = express();
    const PORT = 3000;

    app.use(express.json())
    let server = await createGraphqlServer()
    app.use("/graphql", expressMiddleware(server))

    app.listen(PORT, () => {
        console.log("server started at port ", 3000)
    })


}

init()