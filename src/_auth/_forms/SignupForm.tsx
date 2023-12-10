import { UserAuthForm } from "@/components/user-auth-form"
import { Link } from "react-router-dom"



const SignupForm = () => {

  return (
    <div >
      <div className="flex flex-col space-y-2">
        <img src="/assets/images/final-logo.png" alt="logo" />
        
          <Link to="/sign-in"
            className="absolute right-4 top-4 md:right-8 md:top-8 text-small-semibold mr-1">
            Have an account? 
            Login
          </Link>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm