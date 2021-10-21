/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StarPost_post = {
    readonly id: string;
    readonly hasStarred: boolean;
    readonly " $refType": "StarPost_post";
};
export type StarPost_post$data = StarPost_post;
export type StarPost_post$key = {
    readonly " $data"?: StarPost_post$data;
    readonly " $fragmentRefs": FragmentRefs<"StarPost_post">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StarPost_post",
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
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '09350c8b0ef432db66f908d115b3f8a4';
export default node;
