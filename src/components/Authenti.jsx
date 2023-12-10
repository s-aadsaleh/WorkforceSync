import React from 'react'
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Authenti = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  console.log(auth?.currentUser?.email);

  const signUp = async () => {
      await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('successfully signed in')
};

  const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
      await signOut(auth);
  };


  return (
    <div>
      <div className='mt-[10px] mb-[10px] flex flex-col font-medium font-poppins'> Welcome Back! 🫡</div>
        <label className='mb-[10px] block text-base flex flex-col font-medium text-dark dark:text-black font-poppins'>
          Email
        </label>
        <div className='relative'>
          <input
            type='email'
            placeholder='info@yourmail.com'
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
          />
          <span className='absolute top-1/2 left-4 -translate-y-1/2'>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity={0.8} fillRule="evenodd" clipRule="evenodd" fill="#9CA3AF">
                <path d="M3.334 4.167A.838.838 0 0 0 2.501 5v10c0 .456.377.833.833.833h13.333a.838.838 0 0 0 .834-.833V5a.838.838 0 0 0-.834-.833H3.334ZM.834 5c0-1.377 1.123-2.5 2.5-2.5h13.333c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.334a2.505 2.505 0 0 1-2.5-2.5V5Z" />
                <path d="M.985 4.522a.833.833 0 0 1 1.16-.205l7.856 5.499 7.855-5.5a.833.833 0 1 1 .956 1.366l-8.333 5.833a.833.833 0 0 1-.956 0L1.19 5.682a.833.833 0 0 1-.205-1.16Z" />
              </g>
            </svg>
          </span>
        </div>

        <label className='mb-[10px] block text-base flex flex-col font-medium text-dark dark:text-black font-poppins'>
          Password
        </label>
        <div className='relative'>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'

          />
          <span className='absolute top-1/2 left-4 -translate-y-1/2'>
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity={0.8}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.16797 10.0007C3.70773 10.0007 3.33464 10.3737 3.33464 10.834V16.6673C3.33464 17.1276 3.70773 17.5007 4.16797 17.5007H15.8346C16.2949 17.5007 16.668 17.1276 16.668 16.6673V10.834C16.668 10.3737 16.2949 10.0007 15.8346 10.0007H4.16797ZM1.66797 10.834C1.66797 9.45327 2.78726 8.33398 4.16797 8.33398H15.8346C17.2153 8.33398 18.3346 9.45327 18.3346 10.834V16.6673C18.3346 18.048 17.2153 19.1673 15.8346 19.1673H4.16797C2.78726 19.1673 1.66797 18.048 1.66797 16.6673V10.834Z"
                fill="#9CA3AF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2.50065C9.11594 2.50065 8.2681 2.85184 7.64298 3.47696C7.01786 4.10208 6.66667 4.94993 6.66667 5.83398V9.16732C6.66667 9.62756 6.29357 10.0007 5.83333 10.0007C5.3731 10.0007 5 9.62756 5 9.16732V5.83398C5 4.5079 5.52678 3.23613 6.46447 2.29845C7.40215 1.36077 8.67392 0.833984 10 0.833984C11.3261 0.833984 12.5979 1.36077 13.5355 2.29845C14.4732 3.23613 15 4.5079 15 5.83398V9.16732C15 9.62756 14.6269 10.0007 14.1667 10.0007C13.7064 10.0007 13.3333 9.62756 13.3333 9.16732V5.83398C13.3333 4.94993 12.9821 4.10208 12.357 3.47696C11.7319 2.85184 10.8841 2.50065 10 2.50065Z"
                fill="#9CA3AF"
              />
            </g>
            </svg>
          </span>
        </div>
        <button onClick={signIn} 
        className='bg-primary border-primary border rounded-md flex flex-col items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#12627b] hover:border-[#12627b] disabled:bg-[#12627b] disabled:border-[#12627b] disabled:text-dark-5 active:bg-[#12627b] active:border-[#12627b]'
        >
           Sign In
        </button>
        <button onClick={logout} 
        className='bg-primary border-primary border rounded-md flex flex-col items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#12627b] hover:border-[#12627b] disabled:bg-[#12627b] disabled:border-[#12627b] disabled:text-dark-5 active:bg-[#12627b] active:border-[#12627b]'
        >
           Log Out
        </button>
        <button onClick={signUp} 
        className='bg-primary border-primary border rounded-md flex flex-col items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#12627b] hover:border-[#12627b] disabled:bg-[#12627b] disabled:border-[#12627b] disabled:text-dark-5 active:bg-[#12627b] active:border-[#12627b]'
        >
           Sign Up
        </button>
        <button onClick={signInWithGoogle} 
        className='bg-primary border-primary border rounded-md flex flex-col items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#12627b] hover:border-[#12627b] disabled:bg-[#12627b] disabled:border-[#12627b] disabled:text-dark-5 active:bg-[#12627b] active:border-[#12627b]'
        >
           Sign In With Google
        </button>
    </div>
  )
}

export default Authenti