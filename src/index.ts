import "reflect-metadata";
import Express from "express";
import {buildSchema, Resolver, Query} from "type-graphql";
import {ApolloServer} from "apollo-server-express";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello world, Alexey"
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({schema})

  const app = Express();
  await apolloServer.start()
  apolloServer.applyMiddleware({app})

  app.listen(3000, () => console.log('started'))
}

main();
