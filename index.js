import { createServer } from '@graphql-yoga/node'
import { makeExecutableSchema } from "@graphql-tools/schema";

const sleep = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));

const schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
      greetings: [String!]
      me: User!
    }

    type User {
      id: ID!
      name: String!
      friends: [User!]!
      bio: String!
    }

    type Subscription {
      clock: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "World",
      greetings: async function* () {
        for (const greeting of ["hi", "ho", "sup", "ola", "bonjour"]) {
          yield greeting;
          await sleep();
        }
      },
      me: () => ({ id: "1", name: "Vanja" }),
    },
    User: {
      bio: async () => {
        await sleep(1500);
        return "I like turtles";
      },
      friends: async function* () {
        for (const user of [
          { id: "2", name: "Angela" },
          { id: "3", name: "Christopher" },
          { id: "4", name: "Titiana" },
          { id: "5", name: "Leonard" },
          { id: "6", name: "Ernesto" },
        ]) {
          yield user;
          await sleep(1000);
        }
      },
    },
    Subscription: {
      clock: {
        subscribe: async function* () {
          while (true) {
            yield { clock: new Date().toString() };
            await sleep();
          }
        },
      },
    },
  },
});


const server = createServer({
    schema: schema
})

server.start()