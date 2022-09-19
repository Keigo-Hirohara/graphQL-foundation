import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';
import { resolve } from 'path';
const _ = require('lodash');

const users = [
  { id: '23', firstName: 'Mickey', age: 93 },
  { id: '47', firstName: 'Donuld', age: 88 },
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
