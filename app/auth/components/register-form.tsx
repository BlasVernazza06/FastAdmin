"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RegisterFormValues } from "@/lib/schemas/auth-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/schemas/auth-schema"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signUp } from "@/lib/actions/auth-actions"

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",    
      password: "", 
      confirmPassword: ""
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      await signUp(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-4xl font-extrabold">Crear Cuenta</h1>
          <p className="text-muted-foreground text-sm ">
            Ingresa tus datos para registrarte
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
          <Input 
            id="name"
            {...form.register("name")} 
            type="text" 
            disabled={isLoading}
            placeholder="John Doe" 
            required 
          />
        </Field>
        {form.formState.errors.name && (
          <p className="text-xs text-destructive mt-1 font-medium">
            {form.formState.errors.name.message as string}
          </p>
        )}

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
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
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
            <FieldLabel htmlFor="confirmPassword">Confirmar Contraseña</FieldLabel>
            <div className="relative">
                <Input 
                id="confirmPassword"
                {...form.register("confirmPassword")} 
                type={showConfirmPassword ? "text" : "password"} 
                required
                disabled={isLoading}
                placeholder="********"
                />
                <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </Field>
        {form.formState.errors.confirmPassword && (
          <p className="text-xs text-destructive mt-1 font-medium">
            {form.formState.errors.confirmPassword.message as string}
          </p>
        )}

        <Field>
          <Button type="submit" className="w-full">
            {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : "Registrarse"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
