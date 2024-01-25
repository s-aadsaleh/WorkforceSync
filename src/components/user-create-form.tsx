"use client"

import * as React from "react"
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// import { account } from "@/lib/appwrite/config"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries"
import { useUserContext } from "@/context/AuthContext";



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserCreateForm({ className, ...props }: UserAuthFormProps) {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/register');
    } else {
      navigate('/dashboard');
    }
  }, []);

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  async function googleAuth(){

    // console.log('Google authentication initiated');
    // account.createOAuth2Session(
    // 'google', 
    // "http://localhost:5173/dashboard", 
    // "http://localhost:5173/login"
    // );

    // const sessi0n = await account.getSession('current');

    // console.log(sessi0n.provider);
    // console.log(sessi0n.providerUid);
    // console.log(sessi0n.providerAccessToken);

  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    //setIsLoading(true)
    console.log({ email, password, name })
    console.log(isSigningInUser,isUserLoading)

    try {
      const newUser = await createUserAccount({
        email, password, name,
        username: ""
      });
  
      if(!newUser) {
        return toast({
          title: "Incorrect details. Please try again."
        })
      }

  
      const session = await signInAccount({
        email: email,
        password: password,
      });
  
      if(!session) {
        return toast({
          title: "Sign up failed. Please try again."
        })
      }
  
      const isLoggedIn = await checkAuthUser();
  
      if(isLoggedIn){
        navigate('/dashboard')
      } else {
        return toast({title: "Sign up failed. Please try again."})
      }
    } catch (error) {
      console.log({ error });
    }
    

    // setTimeout(() => {
    //   setIsLoading(false)
    // }, 3000)

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              type="text"
              autoCapitalize="words"
              autoComplete="off"
              autoCorrect="off"
              disabled={isCreatingAccount}
              className="shad-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isCreatingAccount}
              className="shad-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isCreatingAccount}
              className="shad-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <Button disabled={isCreatingAccount}>
            {isCreatingAccount && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create account
          </Button>
        </div>
      </form>
      <div className="relative">
      <div className="absolute inset-0 flex items-center">
          
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button  type="button" onClick={() => {
        console.log('Button Clicked');
        googleAuth(); 
      }} disabled={isCreatingAccount}>
        {isCreatingAccount ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
         Google
      </Button>
    </div>
  )
}