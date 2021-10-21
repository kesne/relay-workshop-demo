import React from "react";
import { Avatar, Group, Text } from "@mantine/core";
import { useFragment, graphql } from "relay-hooks";
import { User_user$key } from "./__generated__/User_user.graphql";

interface Props {
  user: User_user$key;
  small?: boolean;
}

/**
 * This is a highly re-usable "User" component. It is leveraged in both the post
 * header, and also in comments. It just defines its data dependencies on the User,
 * and lets the parent components compose its data requirements.
 *
 * Because this component only depends on the `User` type, it can be composed into
 * anything that has provides a `User` type!
 */
export function User({ user, small }: Props) {
  const data = useFragment(
    graphql`
      fragment User_user on User {
        username
        name
      }
    `,
    user
  );

  return (
    <Group>
      <Avatar size={small ? "md" : "lg"} color="cyan" radius="xl">
        {data.username.slice(0, 2).toUpperCase()}
      </Avatar>
      <div>
        <Text size={small ? "sm" : "md"} weight={500}>
          {data.name}
        </Text>
        <Text size={small ? "xs" : "sm"} color="gray">
          @{data.username}
        </Text>
      </div>
    </Group>
  );
}
