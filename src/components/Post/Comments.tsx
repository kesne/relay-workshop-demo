import React from "react";
import { Alert, Button, Group } from "@mantine/core";
import { graphql, usePagination } from "relay-hooks";
import { Comment } from "./Comment";
import { Comments_post$key } from "./__generated__/Comments_post.graphql";

interface Props {
  post: Comments_post$key;
}

/**
 * This component loads a list of comments, and renders them. The comments are loaded
 * incrementally, initially with 2 comments, then in batches of 5. The user can also
 * post new comments through the "CreateComment" component, which should update this list.
 */
export function Comments({ post }: Props) {
  /**
   * Pagination is done with a special `usePagination` hook, which manages loading
   * additional data automatically. This hook is fairly similar to the `useFragment` hook.
   * It accepts a fragment definition as an argument, and a cache key, just like
   * the `useFragment` hook. The only difference is the return type (which includes
   * extra information and state), and the fragment itself (which has special annotations).
   */
  const { data, isLoadingNext, hasNext, loadNext } = usePagination(
    graphql`
      # This fragment is a lot to unpack, but we'll do it step-by-step!
      # First, we just define a fragment on Post, just like we have before.
      # Note that for pagination we need to create our fragment on the containing
      # type (in this case Post), not the type of the paginated item (which in
      # this case would be the Comment).
      fragment Comments_post on Post
      # This fragment also uses a special Relay directive, which allows the fragment
      # to take arguments. Normally only queries and mutations can have arguments,
      # but allowing fragments to also define arguments allows Relay to generate
      # an efficient pagination query. Additionally, this makes this component more
      # re-usable, as normally arguments used in a fragment _must_ be defined in the
      # containing query or mutation. With the "@argumentDefinitions" directive,
      # Relay can automatically generate the arugments for you.
      @argumentDefinitions(
        # This is the number of records that will fetched.
        count: { type: "Int", defaultValue: 2 }
        # The cursor is used to perform incremental pagination. It points
        # to the last record that you want to fetch records after.
        # We do not provide a default value, and Relay will actually
        # manage updating this argument for us.
        # If you do not understand cursors, then I recommend reading the
        # Relay cursor pagination specification first.
        cursor: { type: "String" }
      )
      # We annotate that this fragment itself is refetchable. This allows Relay
      # to construct a query just based on the fragment itself, without requiring
      # the entire parent query to be re-executed.
      @refetchable(queryName: "PostCommentsQuery") {
        # Now that we're actually in the fragment body, we can fetch the comments field.
        comments(
          # These are pagination variables, which are also defined in the annotations above.
          first: $count
          after: $cursor
        )
          # This annotates that this field is a Relay connection. This allows it to be paginated
          # over, and also allows you to interact with the cached data better.
          @connection(key: "PostComments_comments") {
          # Data within a paginated field adheres to the Relay connection spec, which has
          # edges, which then contain the actual node, which is the data itself.
          edges {
            node {
              id
              ...Comment_comment
            }
          }
        }
      }
    `,
    post
  );

  // This just extracts the individual nodes into a list to make them easier to work with:
  const comments = data.comments.edges
    .map((comment) => comment?.node!)
    .filter(Boolean);

  // If there are no comments, don't bother rendering the list.
  if (!comments.length) {
    return (
      <Alert title="No comments yet" color="gray">
        There are no comments yet. Comment now to be the first!
      </Alert>
    );
  }

  return (
    <Group direction="column" grow>
      {/**
         * We can now just map over the comments, and provide the required data
         * through the `comment` prop, which will get fully resolved from relay
         * via the `useFragment` hook inside of the `Comment` component itself.
         */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
        </div>
      ))}

      {/**
        * The state from the `usePagination` hook can be used to drive incremental
        * data loads. Here we display a button that lets the user load the next 5 comments.
        * We could also incrementally load comments as the user scrolls the page
        * using the same mechanisms.
        */}
      {hasNext && (
        <Button
          variant="light"
          loading={isLoadingNext}
          onClick={() => loadNext(5)}
        >
          Load More
        </Button>
      )}
    </Group>
  );
}
