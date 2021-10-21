import React, { useState } from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { graphql, useMutation } from "relay-hooks";
import { CreateCommentMutation } from "./__generated__/CreateCommentMutation.graphql";
import { ConnectionHandler } from "relay-runtime";

interface Props {
  postId: string;
}

/**
 * Creating comments is probably the most complicated component in this project.
 * I'd recommend reading through the `StarPost` mutation first, to get a solid grasp
 * on how mutations generally work.
 */
export function CreateComment({ postId }: Props) {
  // This is just tracking the current value of the text input
  const [comment, setComment] = useState("");

  const [createComment, { loading }] =
    useMutation<CreateCommentMutation>(graphql`
      mutation CreateCommentMutation(
        $postId: ID!
        $text: String!
        # The connections defined here are used to allow relay to automatically
        # update the list of comments as we add new comments.
        # We need these values to be dynamically defined, as they are
        # computed by relay during runtime.
        $connections: [ID!]!
      ) {
        createComment(postId: $postId, text: $text) {
          comment
            # This directive tells Relay that it can prepend this node within
            # a connection that already exists. In this case, we prepend this
            # node inside of the list of comments. This allows the user
            # to be able to see their comment in the UI, without needing
            # to reload any data from the server.
            @prependNode(
              # The connections that this node will be prepended to, which just
              # comes from args.
              connections: $connections
              # This is the type of the containing "edge" type in the connection.
              # Generally this is just found by inspecting the GraphQL Schema.
              edgeTypeName: "PostCommentsConnectionEdge"
            ) {
            id
            # Because this comment is rendered in the "Comment" component, we
            # can just use that fragment here to automatically load whatever data
            # it requires whenever we create a new comment.
            ...Comment_comment
          }
        }
      }
    `);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    /**
     * Relay automatically loads a unique identifier for all connections, which is
     * needed to update the connection through the `prependNode` API. The first argument
     * is just the ID of the object that we have the connection on. The second
     * argument is the name of the connection, which should match the name found in
     * the `@connection` directive.
     */
    const connectionId = ConnectionHandler.getConnectionID(
      postId,
      "PostComments_comments"
    );

    createComment({
      variables: {
        postId,
        text: comment,
        connections: [connectionId],
      },
      // Once the request completes, reset the UI back to its initial state.
      onCompleted(data) {
        setComment("");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group align="end">
        <div style={{ flex: 1 }}>
          <TextInput
            placeholder="Your comment..."
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button loading={loading} type="submit">
          Post Comment
        </Button>
      </Group>
    </form>
  );
}
