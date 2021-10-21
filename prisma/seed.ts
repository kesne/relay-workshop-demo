import { PrismaClient } from "@prisma/client";

async function main() {
  const db = new PrismaClient();

  await db.user.upsert({
    where: {
      username: "demo",
    },
    create: {
      name: "Demo User",
      username: "demo",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      username: "mike",
    },
    create: {
      name: "Mike",
      username: "mike",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      username: "valerie",
    },
    create: {
      name: "Valerie",
      username: "valerie",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      username: "jordan",
    },
    create: {
      name: "Jordan",
      username: "jordan",
      posts: {
        create: [
          {
            title: "First post!",
            body: "This is my first post, I really hope you enjoy it!",
          },
          {
            title: "Another post",
            body: "Wow, I went ahead and made another post.",
          },
        ],
      },
    },
    update: {},
  });
}

main().catch(console.error);
