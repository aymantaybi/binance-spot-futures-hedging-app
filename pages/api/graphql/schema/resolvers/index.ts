import { Resolvers } from '../../../../../graphql/generated';

export const resolvers: Resolvers = {
  Query: {
    greetings: (_, args) => `Hello ${args.name}`,
  },
};
