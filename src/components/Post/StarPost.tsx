import React from "react";
import { ActionIcon } from "@mantine/core";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useFragment, graphql, useMutation } from "relay-hooks";
import { StarPost_post$key } from "./__generated__/StarPost_post.graphql";
import { StarPostMutation } from "./__generated__/StarPostMutation.graphql";

interface Props {
  post: StarPost_post$key;
}

/**
 * This component is intended to demonstrate the normalized cache in Relay.
 * This component uses a fragment to get the current starred state for the
 * post, and allows the user to star the post using the button as well.
 * Once the user stars the post, the data referenced by the fragment updates,
 * and Relay delivers the cache update automatically.
 *
 * As a fun excercise, turn on the "Highlight updates when components render."
 * setting in the React Dev Tools, and click the star button. You'll notice that
 * _only_ the `StarPost` component is re-rendered, despite the actual post reference
 * being passed by the parent. This is because the parent doesn't directly require
 * the `hasStarred` field, and so it is not subsribed to when it changes.
 * Relay is the _only_ GraphQL framework that can do this!
 */
export function StarPost({ post }: Props) {
  const data = useFragment(
    graphql`
      fragment StarPost_post on Post {
        id
        # This field will actually be updated dynamically after the mutation
        # below is triggered!
        hasStarred
      }
    `,
    post
  );

  /**
   * While queries are just used to _read_ data from the API, Mutations are used
   * to _write_ data to the API (similar to POST in REST).
   *
   * The `useMutation` hook hands us back a function that we can call later to
   * actually execute the mutation, and a bag of props, which contain the current
   * state of the mututation.
   */
  const [starPost, { loading }] = useMutation<StarPostMutation>(graphql`
    mutation StarPostMutation($postId: ID!) {
      starPost(postId: $postId) {
        # We can leverage fragments in our mutation responses as well, so in this
        # case we don't need to duplicate the fields here, we can just say that
        # we need whatever is defined in the fragment above.
        ...StarPost_post
      }
    }
  `);

  return (
    <ActionIcon
      onClick={() => {
        /**
         * We call the mutate function that was provided to us, which will send
         * this request over the network. The resulting data will get normalized
         * into the Relay cache.
         */
        starPost({
          variables: {
            postId: data.id,
          },
        });
      }}
      disabled={loading}
      color="yellow"
      size="xl"
    >
      {data.hasStarred ? (
        <StarFilledIcon width={22} height={22} />
      ) : (
        <StarIcon width={22} height={22} />
      )}
    </ActionIcon>
  );
}
