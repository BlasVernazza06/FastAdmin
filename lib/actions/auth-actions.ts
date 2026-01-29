"use server"

import { redirect } from "next/navigation";
import { auth } from "../auth" // ensure this path is correct relative to file location
import { headers } from "next/headers"

export const signIn = async (data: { email: string; password: string; callbackURL?: string }) => {
    const result = await auth.api.signInEmail({
        body: {
            email: data.email,
            password: data.password,
            callbackURL: "/dashboard",
        },
        headers: await headers()
    })
    return result;
}

export const signUp = async (data: { email: string; password: string; name: string; callbackURL?: string }) => {
    const result = await auth.api.signUpEmail({
        body: {
            email: data.email,
            password: data.password,
            name: data.name,
            callbackURL: "/dashboard",
        },
        headers: await headers()
    })
    return result;
}

export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers()
    })
    redirect("/")
}