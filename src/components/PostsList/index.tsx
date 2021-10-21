import React from "react";
import { Container, Group } from "@mantine/core";
import { useFragment, graphql } from "relay-hooks";
import { PostsListPreview } from "./PostsListPreview";
import { PostsList_post$key } from "./__generated__/PostsList_post.graphql";

interface Props {
  // We take in a cache key for the `Posts`. This type comes from the compiled Relay artifacts.
  // Note that this is not actually the data itself, it _must_ be resolved
  // through `useFragment` to actually get the data.
  posts: PostsList_post$key;
}

/**
 * This PostsList component does _not_ fetch data itself, instead it uses a fragment.
 * Fragments never fetch data on their own. Instead, they _must_ be used by a parent
 * component which fetches the data for it.
 *
 * In this case, the page that renders this PostList component is what actually constructs
 * and executes the query. It then provides the fully loaded data through the `posts` prop.
 */
export function PostsList({ posts }: Props) {
  /**
   * As we mention above, the posts prop is just a cache identifier in this case,
   * and does not actually contain the data that we need. We can visualize this by
   * logging one of the posts, and inspecting value in the browser.
   * Uncomment the next line to see what the actual post value looks like before it is resolved.
   */
  // console.log(posts[0]);

  const data = useFragment(
    graphql`
      # Define a new fragment, which is on the "Post" type.
      # The name of the fragment is always in the form ModuleName_camelCasedTypeName.
      fragment PostsList_post on Post
      # We use the @relay annotation to tell the Relay compiler that we expect
      # this fragment to actually be an array of records, instead of a single record.
      @relay(plural: true) {
        # We fetch the ID each post, which we'll use later as the "key" prop.
        id
        # We don't directly need any other data, but we do render the "PostsListPreview"
        # component, which has data requirements, so we'll compose that here.
        # Fragments can include any number of other fragments, which lets them be
        # composed as much as you need. This allows you to create large sections of
        # your application that define their actual data dependencies, without requiring
        # any of them to actually fetch their data.
        ...PostsListPreview_post
      }
    `,
    /**
     * The second argument to the `useFragment` hook is the identifier we get from
     * props. Because we have typed it with the generated Relay types, just passing
     * this here is enough to fully type the resulting `data`.
     */
    posts
  );

  /**
   * Because we're fully using the compiled Relay types, we have full type safety
   * on all of the properties that we've fetched. We can safely access properties
   * that we've defined in our fragment above.
   */

  // Does not cause a type error when uncommented ("id" is part of fragment)
  // data[0].id
  // Causes a type error when uncommented ("user" is not a part of fragment)
  // data[0].user

  return (
    <Container size="sm" mt="xl">
      <Group direction="column" grow>
        {data.map((post) => (
          <div key={post.id}>
            {/**
               * This component requires the `post` prop. We can directly pass
               * the post object here, because we spread its data requirements
               * into the fragment in this component.
               * TypeScript also will error if the data requirements are not met.
               *
               * Try it out!
               *   - Comment out `...PostsListPreview_post` in the fragment above.
               *   - Run `yarn relay` to run the Relay Compiler.
               *   - Come back here, and the `post` prop below should be an error.
               * (there may be a slight delay while the TypeScript language server catches up)
               */}
            <PostsListPreview post={post} />

            {/**
               * EXTRA CREDIT:
               * If this is your first time looking through the codebase, you
               * probably can just keep going and ignore this.
               *
               * What is super neat about fragments, and the easy composition of
               * components that have data dependencies, is that we can
               * super easily restructure our application, and so long as we keep
               * the data dependencies all met, then components will "just work".
               *
               * To demonstrate this, we can actually render the entire post page
               * within this list! All that we need to do is add `...Post_post`
               * the the fragment above, in order to fetch the data required for
               * the post page. After that, we can add the following below this comment:
               *
               * <Post post={post} />
               *
               * (you will need to import the Post component as well)
               */}
          </div>
        ))}
      </Group>
    </Container>
  );
}
