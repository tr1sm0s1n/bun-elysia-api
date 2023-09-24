import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { users } from "./users";

const findOne = (id: string) => {
  return users.find((user) => {
    return user.id === id;
  });
};

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Bun Elysia API Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .get("/read", () => users)
  .get("/read/:id", ({ params: { id }, set }) => {
    let user = findOne(id);
    if (user) {
      return user;
    } else {
      set.status = 404;
      return "Not found";
    }
  })
  .post(
    "/create",
    ({ body, set }) => {
      let existing = findOne(body.id);
      if (existing) {
        set.status = 400;
        return "User already exists";
      } else {
        users.push(body);
        set.status = 201;
        return body;
      }
    },
    {
      body: t.Object({
        id: t.String(),
        name: t.String(),
        age: t.Number(),
        origin: t.String(),
        admin: t.Boolean(),
      }),
    }
  )
  .put(
    "/update",
    ({ body, set }) => {
      let existing = findOne(body.id);
      if (existing) {
        let updated = Object.assign(existing, body);
        return updated;
      } else {
        users.push(body);
        set.status = 201;
        return body;
      }
    },
    {
      body: t.Object({
        id: t.String(),
        name: t.String(),
        age: t.Number(),
        origin: t.String(),
        admin: t.Boolean(),
      }),
    }
  )
  .delete("/delete/:id", ({ params: { id }, set }) => {
    let existing = findOne(id);
    if (existing) {
      let index = users.findIndex((user) => user.id === existing?.id);
      users.splice(index, 1);
      return existing;
    } else {
      set.status = 404;
      return "Not found";
    }
  })
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
