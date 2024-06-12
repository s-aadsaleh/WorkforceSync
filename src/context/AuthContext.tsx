// import { getCurrentUser } from '@/lib/appwrite/api'
// import { IContextType, IUser } from '../types/'
// import { createContext, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export const INITIAL_USER = {
//     id: '',
//     name: '',
//     username: '',
//     email: '',
//     imageUrl: '',
//     bio:''
// }


// const INITIAL_STATE = {
//     user: INITIAL_USER,
//     isPending: false,
//     isAuthenticated: false,
//     setUser: () => {},
//     setIsAuthenticated: () => {},
//     checkAuthUser: async () => false as boolean,
// }

// const AuthContext = createContext<IContextType>(INITIAL_STATE);


// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<IUser>(INITIAL_USER)
//     const [isPending, setisPending] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const navigate = useNavigate();

//     const checkAuthUser = async () => {
//         try {
//             console.log('check auth')
//             const currentAccount = await getCurrentUser();

//             if(currentAccount) {
//                 setUser({
//                     id: currentAccount.$id,
//                     name: currentAccount.name,
//                     username: currentAccount.username,
//                     email: currentAccount.email,
//                     imageUrl: currentAccount.imageUrl,
//                     bio: currentAccount.bio,
//                 })

//                 setIsAuthenticated(true);

//                 return true;
//             }

//             return false;

//         } catch (error) {
//             console.log(error);
//             return false;
//         }   finally {
//             setisPending(false);
//         }
//     };

//     useEffect(() => {
//         if(
//             localStorage.getItem('cookieFallback') === '[]' ||
//             localStorage.getItem('cookieFallback') === null
//         ) navigate('/login')

//         checkAuthUser();
//     }, []);

//     const value = {
//         user,
//         setUser,
//         isPending,
//         isAuthenticated,
//         setIsAuthenticated,
//         checkAuthUser
//     }

//   return (
//     <AuthContext.Provider value={value}>
//         {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

// export const useUserContext = () => useContext(AuthContext);

// authContext.js

import React, { createContext, 
    useContext, 
    // useEffect, 
    useState, 
    Dispatch, 
    SetStateAction
 } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '../types/';

export const INITIAL_USER: IUser = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

export interface IAuthContext {
    user: IUser;
    isPending: boolean;
    isAuthenticated: boolean;
    setUser: Dispatch<SetStateAction<IUser>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

const INITIAL_STATE: IAuthContext = {
    user: INITIAL_USER,
    isPending: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false,
};

const AuthContext = createContext<IAuthContext>(INITIAL_STATE);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isPending, setIsPending] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            console.log('check auth');
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });

                setIsAuthenticated(true);

                return true;
            }

            setIsAuthenticated(false); // Ensure isAuthenticated is set to false if user is not authenticated

            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsPending(false);
        }
    };

    // useEffect(() => {
    //     if (localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null)
    //         console.log('authcontext')
    //     console.log('yes')
    //         navigate('/login');

    //     checkAuthUser();
    // }, []);

    const value: IAuthContext = {
        user,
        setUser,
        isPending,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): IAuthContext => useContext(AuthContext);
