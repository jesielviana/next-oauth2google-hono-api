import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface AppSession extends Session {
  accessToken?: string;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/dashbaord",
    signOut: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("signIn profile", profile);
        const response = await fetch("http://localhost:4000/api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: profile?.email }),
        });
        const data = await response.json();
        if (data.exists) {
          return true;
        } else {
          const data = {
            name: profile?.name,
            email: profile?.email,
            picture: profile?.picture,
          };
          const response = await fetch("http://localhost:4000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          return true;
        }
      } catch (error) {
        console.error("error", error);
        throw error;
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      const appSession: AppSession = session;
      appSession.accessToken = token.accessToken as string;
      return appSession;
    },
  },
});
