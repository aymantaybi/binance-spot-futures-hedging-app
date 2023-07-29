import { join } from 'path';
import { readFileSync } from 'fs';

export const typeDefs = readFileSync(
  join(process.cwd(), 'pages', 'api', 'graphql', 'schema', 'typeDefs', 'schema.graphql'),
  {
    encoding: 'utf-8',
  }
);
