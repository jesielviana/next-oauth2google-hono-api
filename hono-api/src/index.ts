import { Hono } from "hono";
import { cors } from "hono/cors";
import { verifyToken } from "./verifyToken";

type User = {
  email: string;
  name: string;
  picture: string;
};

const users: User[] = [];

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/userExists", async (c) => {
  const body = await c.req.json();
  const { email } = body;
  const user = users.find((u) => u.email === email);
  if (user) {
    return c.json({ exists: true });
  } else {
    return c.json({ exists: false });
  }
});

app.post("/api/signup", async (c) => {
  const body = await c.req.json();
  const { email, name, picture } = body;
  users.push({ email, name, picture });
  return c.json({});
});

app.get("/api/users", (c) => {
  return c.json(users);
});

app.get("/api/movies", verifyToken, (c) => {
  const movies = [
    { id: 1, title: "Filme 1" },
    { id: 2, title: "Filme 2" },
    { id: 3, title: "Filme 3" },
  ];
  return c.json(movies);
});

export default {
  port: 4000,
  fetch: app.fetch,
};
