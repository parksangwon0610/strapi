module.exports = {
  definition: `
  `,
  query: ``,
  mutation: `
    attachRestaurantToChef(id: ID, chefID: ID): String!
  `,
  type: {
  },
  resolver: {
    Query: {},
    Mutation: {
      // attachRestaurantToChef: {
      //   description: 'Attach a restaurant to an chef',
      //   resolver: 'application::restaurant.restaurant.attachToChef',
      // }
    }
  },
};
