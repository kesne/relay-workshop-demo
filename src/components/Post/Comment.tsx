import React from "react";
import { Card, Text } from "@mantine/core";
import { graphql, useFragment } from "relay-hooks";
import { User } from "../User";

interface Props {
  comment: any;
}

/**
 * A simple `Comment` component, which displays a specific comment.
 * This is expected to be used in a larger list.
 *
 * This component also leverages the re-usable `User` component. This helps
 * demonstrate the benefits of being able to compose fragments within other fragments.
 */
export function Comment({ comment }: Props) {
  const data = useFragment(
    graphql`
      fragment Comment_comment on Comment {
        text
        createdAt
        # Previously, we've always loaded the user through the post, but here
        # we can see that our "User_user" fragment can be used anywhere that
        # there is a user type, making it super easy to use anywhere!
        user {
          ...User_user
        }
      }
    `,
    comment
  );

  return (
    <Card withBorder>
      <User user={data.user} small />
      <Text mt="md">{data.text}</Text>
      <Text mt="md" size="xs" color="gray">
        {new Date(data.createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </Text>
    </Card>
  );
}
