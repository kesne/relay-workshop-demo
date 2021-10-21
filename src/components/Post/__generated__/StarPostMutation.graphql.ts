/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StarPostMutationVariables = {
    postId: string;
};
export type StarPostMutationResponse = {
    readonly starPost: {
        readonly " $fragmentRefs": FragmentRefs<"StarPost_post">;
    };
};
export type StarPostMutation = {
    readonly response: StarPostMutationResponse;
    readonly variables: StarPostMutationVariables;
};



/*
mutation StarPostMutation(
  $postId: ID!
) {
  starPost(postId: $postId) {
    ...StarPost_post
    id
  }
}

fragment StarPost_post on Post {
  id
  hasStarred
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "postId",
    "variableName": "postId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StarPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "starPost",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StarPost_post"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StarPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "starPost",
        "plural": false,
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
            "name": "hasStarred",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "561084c29d7ae3adf2a7d04fe58b47ea",
    "id": null,
    "metadata": {},
    "name": "StarPostMutation",
    "operationKind": "mutation",
    "text": "mutation StarPostMutation(\n  $postId: ID!\n) {\n  starPost(postId: $postId) {\n    ...StarPost_post\n    id\n  }\n}\n\nfragment StarPost_post on Post {\n  id\n  hasStarred\n}\n"
  }
};
})();
(node as any).hash = '190210b02cc775c79db78b6c8541e2f4';
export default node;
