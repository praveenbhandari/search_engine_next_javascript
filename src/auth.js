import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ], 
    // callbacks: {
    //     async session({ session, token }) {
    //       // Add custom properties to the session object
    //       session.user = {
    //         ...session.user,
    //         // Add any additional user details you want to include
    //         // For example:
    //         fullName: `${token.name} ${token.family_name}`,
    //         email: token.email,
    //         picture: token.picture,
    //       };
    //       return session;
    //     },
    //   },
    //   session: {
    //     jwt: true, // Enable JSON Web Token (JWT) sessions
    //     strategy: "jwt",
    //     maxAge: 30 * 24 * 60 * 60, // 30 days
    //   },
    });