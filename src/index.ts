import { Elysia } from "elysia";

const app = new Elysia()
  .get("/read", () => "Fetched all users")
  .get("/read/:id", ({ params: { id } }) => `Fetched user ${id}`)
  .post("/create", () => "Created a user")
  .put("/update", () => "Updated a user")
  .delete("/delete", () => "Deleted a user")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
