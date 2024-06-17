import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


console.log("keyyyyyy",process.env.GOOGLE_CLIENT_ID)
console.log("keyyyy",process.env.GOOGLE_CLIENT_SECRET)
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
            // clientId:145538071302-qvsdq0v1cskb02o04u841ig5m0r5kfp2.apps.googleusercontent.com,
            // clientSecret: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,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
          }),
          AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET
          })

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