/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdPostQueryVariables = {
    id: string;
};
export type IdPostQueryResponse = {
    readonly post: {
        readonly " $fragmentRefs": FragmentRefs<"Post_post">;
    };
};
export type IdPostQuery = {
    readonly response: IdPostQueryResponse;
    readonly variables: IdPostQueryVariables;
};



/*
query IdPostQuery(
  $id: ID!
) {
  post(id: $id) {
    ...Post_post
    id
  }
}

fragment Comment_comment on Comment {
  text
  createdAt
  user {
    ...User_user
    id
  }
}

fragment Comments_post on Post {
  comments(first: 2) {
    edges {
      node {
        id
        ...Comment_comment
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}

fragment Post_post on Post {
  id
  title
  body
  ...Comments_post
  ...StarPost_post
  user {
    ...User_user
    id
  }
}

fragment StarPost_post on Post {
  id
  hasStarred
}

fragment User_user on User {
  username
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Post_post"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "args": (v3/*: any*/),
            "concreteType": "PostCommentsConnection",
            "kind": "LinkedField",
            "name": "comments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PostCommentsConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Comment",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "comments(first:2)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "PostComments_comments",
            "kind": "LinkedHandle",
            "name": "comments"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasStarred",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "582d66d3f523e88f0ed2cb0923478430",
    "id": null,
    "metadata": {},
    "name": "IdPostQuery",
    "operationKind": "query",
    "text": "query IdPostQuery(\n  $id: ID!\n) {\n  post(id: $id) {\n    ...Post_post\n    id\n  }\n}\n\nfragment Comment_comment on Comment {\n  text\n  createdAt\n  user {\n    ...User_user\n    id\n  }\n}\n\nfragment Comments_post on Post {\n  comments(first: 2) {\n    edges {\n      node {\n        id\n        ...Comment_comment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment Post_post on Post {\n  id\n  title\n  body\n  ...Comments_post\n  ...StarPost_post\n  user {\n    ...User_user\n    id\n  }\n}\n\nfragment StarPost_post on Post {\n  id\n  hasStarred\n}\n\nfragment User_user on User {\n  username\n  name\n}\n"
  }
};
})();
(node as any).hash = 'abdb66fb19c0f52c718953beee393117';
export default node;
