import { OAuth2Client } from "google-auth-library";
import { Context } from "hono";
const client = new OAuth2Client(Bun.env.GOOGLE_CLIENT_ID);

export async function verifyToken(c: Context, next) {
  // const authHeader = req.headers.authorization;

  const bearer = c.req.header("authorization");
  console.log("bearer");
  if (!bearer) {
    return c.text("Unauthorized", 401);
  }
  const token = bearer.split(" ")[1];
  console.log("bearer2");
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("bearer3");
    // dados do usuário autenticado
    console.log("ticket", ticket.getPayload());
    return next();
  } catch (error) {
    console.log("bearer error", error);
    return c.text("Token inválido", 401);
  }
}
