'use client'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ResetPasswordFormValues, resetPasswordSchema } from "@/lib/schemas/auth-schema";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })
    
    const onSubmit = async (values: ResetPasswordFormValues) => {
        if (!token) {
            setError("Token de recuperación no encontrado")
            return
        }

        setError(null)
        try {
            const result = await authClient.resetPassword({
                newPassword: values.password,
                token: token,
            })

            if (!result.data) {
                setError("Error al restablecer la contraseña")
            } else {
                setIsSubmitted(true)
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
        }
    }

    // Success state
    if (isSubmitted) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Contraseña restablecida!</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
                <Link href="/auth?authForm=login">
                    <Button className="mt-4 w-full h-11 rounded-xl">
                        Iniciar sesión
                    </Button>
                </Link>
            </div>
        )
    }

    // No token state
    if (!token) {
        return (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Enlace inválido</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    El enlace de recuperación no es válido o ha expirado. Por favor, solicita uno nuevo.
                </p>
                <Link href="/auth/forgot-password">
                    <Button variant="outline" className="mt-4 w-full h-11 rounded-xl">
                        Solicitar nuevo enlace
                    </Button>
                </Link>
            </div>
        )
    }
    
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <header className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-4xl font-extrabold">Restablecer contraseña</h1>
                    <p className="text-muted-foreground text-sm">Ingresa tu nueva contraseña para restablecerla.</p>
                </header>
                <Field>
                    <FieldLabel htmlFor="password">Nueva Contraseña</FieldLabel>
                    <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Ingresa una nueva contraseña" 
                        disabled={form.formState.isSubmitting}
                        required 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
                    <Input 
                        id="confirmPassword" 
                        type="password"
                        {...form.register("confirmPassword")} 
                        placeholder="Confirma tu nueva contraseña" 
                        disabled={form.formState.isSubmitting}
                        required 
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive mt-1 font-medium">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </Field>
                <Button type="submit" className="cursor-pointer mt-5 w-full">
                    Restablecer contraseña
                </Button>
            </FieldGroup>
        </form>
    );
}