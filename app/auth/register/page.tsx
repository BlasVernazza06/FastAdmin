import RegisterForm from "@/app/auth/components/register-form"

export default function RegisterPage() {
  return (
    <>
        <RegisterForm />
        <div className="flex items-center justify-center gap-2 pt-3">
            <p className="text-sm">¿Ya tiene una cuenta?</p>
            <a href="/auth/login" className="text-primary font-medium hover:underline">Iniciar Sesión</a>
        </div>
    </>
  )
}
