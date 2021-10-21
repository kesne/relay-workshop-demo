import { GetServerSideProps } from "next";
import { graphql, useQuery } from "relay-hooks";
import { Center, Loader } from "@mantine/core";
import { Post } from "../../components/Post";
import { IdPostQuery } from "./__generated__/IdPostQuery.graphql";

interface Props {
  id: string;
}

/**
 * This page is used to display a single post, at the route `/posts/:postId`.
 * This works very similar to the posts list in the `pages/posts/index.tsx`
 * file. The key difference here is that we also use information from the
 * router to issue the query.
 */
export default function PostPageID({ id }: Props) {
  const { data, isLoading } = useQuery<IdPostQuery>(
    graphql`
      query IdPostQuery($id: ID!) {
        post(id: $id) {
          ...Post_post
        }
      }
    `,
    {
      /**
       * Because this query defines that there is an "id" variable, and that the
       * variable is required (it is followed by a "!"), we must provide an object
       * here, which is the variables for the query.
       *
       * Because we've used the generic on this hook, we have full type safety,
       * including on variables. Try to comment out the line below, and you'll
       * see that TypeScript warns you, because `id` is required in the variables
       * object.
       */
      id,
    }
  );

  if (isLoading || !data) {
    return (
      <Center>
        <Loader mt="xl" />
      </Center>
    );
  }

  return <Post post={data.post} />;
}

// This is just used to get the `id` from the URL into the props, you can ignore it.
export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: { id: ctx.query.id },
});
