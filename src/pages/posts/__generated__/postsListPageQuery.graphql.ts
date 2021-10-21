/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type postsListPageQueryVariables = {};
export type postsListPageQueryResponse = {
    readonly posts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"PostsList_post">;
    }>;
};
export type postsListPageQuery = {
    readonly response: postsListPageQueryResponse;
    readonly variables: postsListPageQueryVariables;
};



/*
query postsListPageQuery {
  posts {
    ...PostsList_post
    id
  }
}

fragment PostsListPreview_post on Post {
  id
  title
  body
  starsCount
  commentsCount
}

fragment PostsList_post on Post {
  id
  ...PostsListPreview_post
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "postsListPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "posts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostsList_post"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "postsListPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "posts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "body",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "starsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "commentsCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a0c47a2e6d5491337b0a1a7e6cd6e055",
    "id": null,
    "metadata": {},
    "name": "postsListPageQuery",
    "operationKind": "query",
    "text": "query postsListPageQuery {\n  posts {\n    ...PostsList_post\n    id\n  }\n}\n\nfragment PostsListPreview_post on Post {\n  id\n  title\n  body\n  starsCount\n  commentsCount\n}\n\nfragment PostsList_post on Post {\n  id\n  ...PostsListPreview_post\n}\n"
  }
};
(node as any).hash = '5a09887c6ca3ce4ed1ff20e3a6f4b75e';
export default node;
