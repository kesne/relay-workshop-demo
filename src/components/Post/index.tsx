import { Divider, Container, Group, Card, Title, Text } from "@mantine/core";
import { useFragment, graphql } from "relay-hooks";
import { CreateComment } from "./CreateComment";
import { User } from "../User";
import { Post_post$key } from "./__generated__/Post_post.graphql";
import { Comments } from "./Comments";
import { StarPost } from "./StarPost";

interface Props {
  post: Post_post$key;
}

/**
 * This is the posts page, which displays a single post.
 * This page has far more nested and direct data dependencies, but thanks to
 * fragments, we can keep them all fairly managable, and clearly defined!
 */

export function Post({ post }: Props) {
  const data = useFragment(
    graphql`
      fragment Post_post on Post {
        id
        title
        body

        # Here we have several components that have data dependencies:
        ...Comments_post
        ...StarPost_post

        # The user component is a fragment on the user, not the post, so it
        # can not be used directly here. However, we can load the user field
        # from the post ourselves, and then use the fragment within the
        # nested field selection.
        user {
          ...User_user
        }
      }
    `,
    post
  );

  return (
    <Container size="sm" my="xl">
      <Card shadow="md" radius="md">
        <Group direction="column" spacing="lg" grow>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title order={1}>{data.title}</Title>
            <StarPost post={data} />
          </div>

          <div>
            <User user={data.user} />
          </div>
          <Text size="xl">{data.body}</Text>
        </Group>

        <Card.Section>
          <Divider my="lg" />
        </Card.Section>

        <Group direction="column" spacing="lg" grow>
          <Title order={3}>Comments</Title>

          <div>
            <CreateComment postId={data.id} />
          </div>

          <div>
            <Comments post={data} />
          </div>
        </Group>
      </Card>
    </Container>
  );
}
