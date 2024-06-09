import { UserCreateForm } from "@/components/auth-components/user-create-form"
import { buttonVariants } from "@/components/ui/button"

import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useEffect } from "react"


const SignupForm = () => {
  
  // Navigation
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      console.log("reg")
      navigate('/register');
    } else {
      console.log("dash")
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col space-y-2">
        {/* <img src="/assets/images/final-logo.png" alt="logo" /> */}

        <div className="fixed top-4 right-4 md:top-8 md:right-8 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pb-4 md:pb-0" // Add padding-bottom on mobile
            )}
          >
            Login
          </Link>
          <Link
            to="/attendance"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pb-4 md:pb-0" // Add padding-bottom on mobile
            )}
          >
            Attendance
          </Link>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center py-4">
              <div className="py-3"/>
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create an account
              </p>
            </div>
            <UserCreateForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm