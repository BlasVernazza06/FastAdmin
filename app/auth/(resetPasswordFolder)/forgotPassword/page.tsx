'use client'

import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/lib/schemas/auth-schema";


export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    })
    
    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setIsLoading(true)
        try {
            const {error} = await authClient.requestPasswordReset({
                email: values.email,
                redirectTo: "/auth/resetPassword"
            })
            if (error) {
                toast.error(error.message)
            } else {
                setIsSubmitted(true)
            }

        } catch (err) {
            toast.error("Ocurrio un error inesperado")
        } finally {
            setIsLoading(false)
            toast.success("Se envio un correo con un enlace para restablecer tu contraseña")
        }
    }

    if (isSubmitted) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Correo enviado!</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Hemos enviado las instrucciones para restablecer tu contraseña a <span className="font-medium text-foreground">{form.getValues("email")}</span>
                </p>
                <Link href="/auth/login">
                    <Button variant="outline" className="mt-4 w-full h-11 rounded-xl">
                        Volver al inicio de sesión
                    </Button>
                </Link>
            </div>
        )
    }

    return (    
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <header className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-4xl font-extrabold">Olvidaste tu contraseña?</h1>
                    <p className="text-muted-foreground text-sm">Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.</p>
                </header>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input 
                        id="email" 
                        type="email"
                        {...form.register("email")} 
                        placeholder="Ingresa un correo electronico" 
                        required 
                    />
                </Field>
                <Button type="submit" className="cursor-pointer mt-5 w-full">
                    {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : "Enviar"}
                </Button>
            </FieldGroup>
        </form>
    );
}