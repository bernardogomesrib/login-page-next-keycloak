import db from "@/lib/db";
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Keycloak({
            clientId: process.env.AUTH_KEYCLOAK_ID,
            clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
            issuer: process.env.AUTH_KEYCLOAK_ISSUER,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "keycloak") {
                token.token = account.access_token;
                token.refreshToken = account.refresh_token;
                token.userId= account.providerAccountId;
            }
            if (token.picture === undefined) {

                const user_atribute = await db.user_attribute.findFirst({
                    where: {
                        user_id: token.userId as string,
                        name: "imagem"
                    }
                });
                token.picture = user_atribute?.value;
            }
            return token;
        },
     
        session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.image = token.picture;
                session.refreshToken = token.refreshToken as string;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    image: token.picture,
                },
   
            };
        },
    },
});