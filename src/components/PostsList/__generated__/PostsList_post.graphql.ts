/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsList_post = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"PostsListPreview_post">;
    readonly " $refType": "PostsList_post";
}>;
export type PostsList_post$data = PostsList_post;
export type PostsList_post$key = ReadonlyArray<{
    readonly " $data"?: PostsList_post$data;
    readonly " $fragmentRefs": FragmentRefs<"PostsList_post">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PostsList_post",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostsListPreview_post"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'a91db8445fd96ad3775cbc92da7cc579';
export default node;
