import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Link para adicionar timestamp nas requisições
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
        // Cache individual por episódio
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