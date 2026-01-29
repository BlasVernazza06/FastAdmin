import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend"
import ForgotPasswordEmail from "@/app/auth/(resetPasswordFolder)/components/reset-password-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            console.log("Intentando enviar correo a:", user.email);
            try {
                const result = await resend.emails.send({
                    from: "FastAdmin <onboarding@resend.dev>",
                    to: user.email,
                    subject: "Restablecer contraseña",
                    react: ForgotPasswordEmail({username: user.name, userEmail: user.email, resetUrl: url})
                })
                console.log("Resultado Resend:", result);
            } catch (error) {
                console.error("Error enviando correo Resend:", error);
            }
        }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [
      nextCookies()   
    ],
});