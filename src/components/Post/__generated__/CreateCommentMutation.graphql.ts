/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateCommentMutationVariables = {
    postId: string;
    text: string;
    connections: Array<string>;
};
export type CreateCommentMutationResponse = {
    readonly createComment: {
        readonly comment: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"Comment_comment">;
        };
    };
};
export type CreateCommentMutation = {
    readonly response: CreateCommentMutationResponse;
    readonly variables: CreateCommentMutationVariables;
};



/*
mutation CreateCommentMutation(
  $postId: ID!
  $text: String!
) {
  createComment(postId: $postId, text: $text) {
    comment {
      id
      ...Comment_comment
    }
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

fragment User_user on User {
  username
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "postId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "text"
},
v3 = [
  {
    "kind": "Variable",
    "name": "postId",
    "variableName": "postId"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateCommentResult",
        "kind": "LinkedField",
        "name": "createComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "comment",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Comment_comment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateCommentResult",
        "kind": "LinkedField",
        "name": "createComment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "comment",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
              {
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "comment",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "PostCommentsConnectionEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f5c308ed8c166bd4cf49ee8b54601a7",
    "id": null,
    "metadata": {},
    "name": "CreateCommentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateCommentMutation(\n  $postId: ID!\n  $text: String!\n) {\n  createComment(postId: $postId, text: $text) {\n    comment {\n      id\n      ...Comment_comment\n    }\n  }\n}\n\nfragment Comment_comment on Comment {\n  text\n  createdAt\n  user {\n    ...User_user\n    id\n  }\n}\n\nfragment User_user on User {\n  username\n  name\n}\n"
  }
};
})();
(node as any).hash = 'b5009fc393350cda2e435cc79fde0d0c';
export default node;
