import React from "react";
import Link from "next/link";
import { StarIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Card, Title, Text, Group } from "@mantine/core";
import { graphql, useFragment } from "relay-hooks";
import { PostsListPreview_post$key } from "./__generated__/PostsListPreview_post.graphql";

interface Props {
  post: PostsListPreview_post$key;
}

/**
 * This is a fairly minimal use of the `useFragment` hook. We directly define the
 * data that we need from the Post, and then create a simple UI that previews the post.
 *
 * This renders a link to the post page, which you can see in the following:
 * - `src/pages/posts/[id].tsx`
 * - `src/components/Post/index.tsx`
 */
export function PostsListPreview({ post }: Props) {
  // Just like the `PostsList`, we can simply define the data dependencies of this component:
  const data = useFragment(
    graphql`
      fragment PostsListPreview_post on Post {
        id
        title
        body
        starsCount
        commentsCount
      }
    `,
    post
  );

  /**
   * Once again, we can see the fully typed nature of this, when we try to access
   * the count values (which are typed as numbers), vs the body value (which are
   * typed as strings).
   */

  return (
    <Link href={`/posts/${data.id}`} passHref>
      <Card component="a" shadow="md" radius="md">
        <div style={{ display: "flex", alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Title order={3}>{data.title}</Title>
            <Text>{data.body.slice(0, 20)}...</Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Group spacing="xs">
              <Text color="gray" size="sm" weight={600}>{data.commentsCount}</Text>
              <ChatBubbleIcon />
            </Group>
            <Group spacing="xs">
              <Text color="gray" size="sm" weight={600}>{data.starsCount}</Text>
              <StarIcon />
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
}
