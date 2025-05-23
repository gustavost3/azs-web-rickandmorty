import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const timestampLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-timestamp': Date.now(),
    }
  };
});

const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

const cache = new InMemoryCache({
  typePolicies: {
    Episode: {
      fields: {
        characters: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: from([timestampLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    },
  },
});

export default client;