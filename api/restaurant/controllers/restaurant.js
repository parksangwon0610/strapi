'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { RedisPubSub }  = require('graphql-redis-subscriptions');
const Redis = require('ioredis');

const REDIS_DOMAIN_NAME = '127.0.0.1';
const PORT_NUMBER = 6379;

const options = {
  host: REDIS_DOMAIN_NAME,
  port: PORT_NUMBER,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};
const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

const SUB_TOPIC = 'messageAdded';

module.exports = {
  attachToChef: async function (id, chefID) {
    await pubsub.publish(SUB_TOPIC, {messageAdded: 'test'})
    return 'attachToChef';
  },
};
