/**
 * This is the demo GraphQL API.
 * This API serves a simple GraphQL API for the blog.
 * You can _probably_ ignore the contents of this file
 * entirely, as it just is used to power the API,
 * and not demonstrate the core relay mechanics.
 */

import fs from "fs";
import { PrismaClient, User } from "@prisma/client";
import SchemaBuilder from "@giraphql/core";
import SimpleObjectsPlugin from "@giraphql/plugin-simple-objects";
import RelayPlugin from "@giraphql/plugin-relay";
import PrismaPlugin from "@giraphql/plugin-prisma";
import PrismaTypes from "@giraphql/plugin-prisma/generated";
import { NextApiHandler } from "next";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { printSchema } from "graphql";

interface Context {
  user: User;
}

const db = new PrismaClient();

const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    ID: { Input: string; Output: string | number };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin, SimpleObjectsPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
  },
  prisma: {
    client: db,
  },
});

builder.scalarType("DateTime", {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => {
    return new Date(date);
  },
});

builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    name: t.exposeString("name"),
  }),
});

const CommentRef = builder.prismaObject("Comment", {
  findUnique: (comment) => ({ id: comment.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    text: t.exposeString("text"),
    user: t.relation("user"),
  }),
});

builder.prismaNode("Post", {
  findUnique: (id) => ({ id }),
  id: { resolve: (user) => user.id },
  fields: (t) => ({
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    user: t.relation("user"),
    comments: t.relatedConnection("comments", {
      cursor: "id",
      query: () => ({
        orderBy: {
          createdAt: "desc",
        },
      }),
    }),
    commentsCount: t.relationCount("comments"),
    starsCount: t.relationCount("stars"),
    hasStarred: t.boolean({
      resolve: async (parent, _args, { user }) => {
        const count = await db.star.count({
          where: { postId: parent.id, userId: user.id },
        });

        return count > 0;
      },
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    post: t.prismaField({
      type: "Post",
      args: {
        id: t.arg.globalID({ required: true }),
      },
      resolve: (query, _parent, { id }) => {
        return db.post.findFirst({
          ...query,
          where: {
            id: id.id,
          },
          rejectOnNotFound: true,
        });
      },
    }),

    posts: t.prismaField({
      type: ["Post"],
      resolve: (query) => {
        return db.post.findMany({
          ...query,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    }),
  }),
});

const CreateCommentResult = builder.simpleObject("CreateCommentResult", {
  fields: (t) => ({
    comment: t.field({ type: CommentRef }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    starPost: t.prismaField({
      type: "Post",
      args: {
        postId: t.arg.globalID({ required: true }),
      },
      resolve: async (query, _parent, { postId }, { user }) => {
        const post = await db.post.findFirst({
          where: {
            id: postId.id,
          },
          rejectOnNotFound: true,
        });

        const existingStar = await db.star.findUnique({
          where: {
            userId_postId: {
              userId: user.id,
              postId: post.id,
            },
          },
        });

        if (existingStar) {
          await db.star.delete({
            where: {
              id: existingStar.id,
            },
          });
        } else {
          await db.star.create({
            data: {
              userId: user.id,
              postId: post.id,
            },
          });
        }

        return db.post.findFirst({
          ...query,
          where: { id: post.id },
          rejectOnNotFound: true,
        });
      },
    }),
    createComment: t.field({
      type: CreateCommentResult,
      args: {
        postId: t.arg.globalID({ required: true }),
        text: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { postId, text }, { user }) => {
        const post = await db.post.findFirst({
          where: {
            id: postId.id,
          },
          rejectOnNotFound: true,
        });

        return {
          comment: await db.comment.create({
            data: {
              postId: post.id,
              userId: user.id,
              text: text,
            },
          }),
        };
      },
    }),
  }),
});

const schema = builder.toSchema({});

fs.writeFileSync("./schema.graphql", printSchema(schema));

const handler: NextApiHandler = async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method!,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL({ endpoint: "/api/graphql" }));
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const user = await db.user.findFirst({
      where: { username: (req.query.username as string) ?? "demo" },
      rejectOnNotFound: true,
    });

    const context: Context = {
      user,
    };

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => context,
    });

    sendResult(result, res);
  }
};

export default handler;
