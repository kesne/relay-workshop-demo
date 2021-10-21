import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

/**
 * This is the function that actually executes the GraphQL request, and returns
 * the corresponding JSON response. This is provided to the Relay environment.
 * The Relay environment itself does not care about how this function is implemented.
 */
const fetchRelay: FetchFunction = async (operation, variables) => {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  });

  const json = await res.json();

  console.log(json);

  return json;
};

/**
 * Construct the actual Relay environment. Here, it is defined as a global singleton.
 * This environment is provided to React components via context.
 * The environment has additional configuration options here as well, such as
 * defining logging functions, and the task scheduler to use.
 */
export const relayEnvironment = new Environment({
  // The network is responsible for executing GraphQL queries over the network.
  network: Network.create(fetchRelay),
  // The store is where response data is stored.
  store: new Store(
    // The record source is the actual cache in which data is stored and retrieved from:
    new RecordSource(),

    // These options configure how the store manages the records that are stored.
    {
      // This defines the number of queries to keep in the LRU cache once they are
      // no longer being retained by any UIs. If this number is 0, then as soon
      // as a record is no longer being actively used by the UI, it will be garbage
      // collected. Higher numbers result in higher memory usage, but also higher
      // cache hit rates, and fewer network requests.
      gcReleaseBufferSize: 10,
      // Additional configuration:
      // gcScheduler?: Scheduler;
      // queryCacheExpirationTime?: number;
    }
  ),
});
