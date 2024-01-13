import { UserLoginForm } from "@/components/user-login-form"
import { buttonVariants } from "@/components/ui/button"

import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"


const SignupForm = () => {

  return (
    <div >
      <div className="flex flex-col space-y-2">
        {/* <img src="/assets/images/final-logo.png" alt="logo" /> */}
        
        <Link
            to="/register"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Register
          </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center py-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account 
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to login
              </p>
            </div>
            <UserLoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
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