const {PubSub, makeExecutableSchema, gql, withFilter} = require("apollo-server-koa");
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const debug = require('debug')('strapi');
const faker = require('faker');

const SUBSCRIPTION_PORT = 4000;
const pubsub = new PubSub();
module.exports = {

  publish: async (topicName, payload) => {
    await pubsub.publish(topicName, payload);
  },
  initialize: async () => {
    const typeDefs = gql`
        type Query {
            ping: String
        }
        type Subscription {
            messageAdded: String
        }
    `;
    const resolvers = {
      Query: {
        ping: () => "pong",
      },
      Subscription: {
        messageAdded: {
          subscribe: () => pubsub.asyncIterator("messageAdded"),
        },
      },
    };

    // setInterval(() => {
    //   pubsub.publish("messageAdded", {
    //     messageAdded: `😘H1ello World!😁\n
    //             ${faker.lorem.sentence()}`,
    //   })
    // }, 1000);
    const WS_PORT = 3000; // need to move this declaration to a separate env setting file
    // Create WebSocket listener server
    const websocketServer = createServer((request, response) => {
      // debug(request);
      // debug(response);
      response.writeHead(404);
      response.end();
    });
    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () => console.log(
      `Websocket Server is now running on http://localhost:${WS_PORT}`
    ));
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
      },
      {
        server: websocketServer,
        path: "/graphql",
      }
    );
    console.log("=== Apollo Subscription Server ===");
    console.log(subscriptionServer);
  },
}
