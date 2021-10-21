/**
 * This is just a little welcome page, and can safely be ignored.
 * The important pages start here: `/pages/posts/index.tsx`
 */

import React from "react";
import Link from "next/link";
import { Title, Text, Anchor, Container, Card, Center } from "@mantine/core";

function Home() {
  return (
    <Container size="xs">
      <Card shadow="md" mt="xl">
        <Title>Relay Workshop Demo</Title>
        <Text mt="lg">
          Welcome to the Relay Workshop demo. This is designed to demonstrate
          some of the fundamental features of Relay, and how it interacts with
          React.
        </Text>
        <Center>
          <Link href="/posts" passHref>
            <Anchor mt="lg" size="xl">
              View Posts
            </Anchor>
          </Link>
        </Center>
      </Card>
    </Container>
  );
}

export default Home;
