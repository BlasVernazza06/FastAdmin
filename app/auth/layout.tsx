import Logo from "@/app/components/logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 relative overflow-hidden">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs custom-class">
            {children}
          </div>
        </div>
        <div className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-primary/50 blur-[80px] rounded-[100%] pointer-events-none -z-10" />
        <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-primary/50 blur-[80px] rounded-[100%] pointer-events-none -z-10" />
        <div className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[90%] h-[400px] bg-linear-to-t from-primary/30 via-primary/5 to-transparent blur-[50px] rounded-[100%] pointer-events-none -z-10" />
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
