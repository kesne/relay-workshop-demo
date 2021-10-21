/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsListPreview_post = {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly starsCount: number;
    readonly commentsCount: number;
    readonly " $refType": "PostsListPreview_post";
};
export type PostsListPreview_post$data = PostsListPreview_post;
export type PostsListPreview_post$key = {
    readonly " $data"?: PostsListPreview_post$data;
    readonly " $fragmentRefs": FragmentRefs<"PostsListPreview_post">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsListPreview_post",
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
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '65500e959ba371da974e68f004544675';
export default node;
