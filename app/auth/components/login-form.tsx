"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginFormValues } from "@/lib/schemas/auth-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/schemas/auth-schema"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn } from "@/lib/actions/auth-actions"
import { useRouter } from "next/navigation"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",    
      password: "", 
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      await signIn(data)
      router.push("/dashboard")
    } catch (error) {
      const errorTranslations: Record<string, string> = {
        "Invalid email or password": "Correo o contraseña incorrectos.",
        "Email already in use": "Este correo ya está registrado.",
        "User not found": "El usuario no existe.",
        "Password is too short": "La contraseña es muy corta.",
        "Network Error": "Error de conexión. Revisa tu internet.",
        "Internal Server Error": "Error en el servidor. Inténtalo más tarde."
      }
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-4xl font-extrabold">Inicie Sesion</h1>
          <p className="text-muted-foreground text-sm ">
            Ingrese sus credenciales para ingresar al Dashboard
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input 
              id="email"
              {...form.register("email")} 
              type="email" 
            disabled={isLoading}
            placeholder="m@example.com" 
            required 
          />
        </Field>
        {form.formState.errors.email && (
          <p className="text-xs text-destructive mt-1 font-medium">
            {form.formState.errors.email.message as string}
          </p>
        )}
        <Field>
            <div className="flex items-center">
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <a
                  href={"./forgotPassword"}
                  className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                ¿Olvido su contraseña?
              </a>
            </div>
            <div className="relative">
              <Input 
                id="password"
                {...form.register("password")} 
                type={showPassword ? "text" : "password"} 
                required
                disabled={isLoading}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
        </Field>
        {form.formState.errors.password && (
          <p className="text-xs text-destructive mt-1 font-medium">
            {form.formState.errors.password.message as string}
          </p>
        )}
        <Field>
          <Button type="submit" className="cursor-pointer">
            {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : "Iniciar Sesion"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
