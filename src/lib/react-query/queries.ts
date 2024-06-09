import {
    // useQuery,
    useMutation
  } from "@tanstack/react-query";

  
  // import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
  import {
    createUserAccount,
    signInAccount,
    // getCurrentUser,
    signOutAccount,

  } from "@/lib/appwrite/api";
  import {  INewUser } from "../../types/index";

  
  // ============================================================
  // AUTH QUERIES
  // ============================================================
  
  export const useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: INewUser) => createUserAccount(user),
    });
  };
  
  export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  };
  
  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };
  
  
  // ============================================================
  // USER QUERIES
  // ============================================================
  
  // export const useGetCurrentUser = () => {
  //   return useQuery({
  //     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
  //     queryFn: getCurrentUser,
  //   });
  // };
  