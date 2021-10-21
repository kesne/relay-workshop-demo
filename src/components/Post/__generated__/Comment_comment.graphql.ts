/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Comment_comment = {
    readonly text: string;
    readonly createdAt: unknown;
    readonly user: {
        readonly " $fragmentRefs": FragmentRefs<"User_user">;
    };
    readonly " $refType": "Comment_comment";
};
export type Comment_comment$data = Comment_comment;
export type Comment_comment$key = {
    readonly " $data"?: Comment_comment$data;
    readonly " $fragmentRefs": FragmentRefs<"Comment_comment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Comment_comment",
  "selections": [
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "User_user"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Comment",
  "abstractKey": null
};
(node as any).hash = '3a03edfd9b8102eddc640ac579ccbd5b';
export default node;
