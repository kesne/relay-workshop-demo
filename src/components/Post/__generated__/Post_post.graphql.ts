/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Post_post = {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly user: {
        readonly " $fragmentRefs": FragmentRefs<"User_user">;
    };
    readonly " $fragmentRefs": FragmentRefs<"Comments_post" | "StarPost_post">;
    readonly " $refType": "Post_post";
};
export type Post_post$data = Post_post;
export type Post_post$key = {
    readonly " $data"?: Post_post$data;
    readonly " $fragmentRefs": FragmentRefs<"Post_post">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Post_post",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "User_user"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Comments_post"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StarPost_post"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '0c6591984ff6921da5bd940f7b733652';
export default node;
