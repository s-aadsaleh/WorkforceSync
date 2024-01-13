import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/dashboard" />
      ): (
        <>
        <section className='flex flex-1 justify-self-center items-center flex-col py-10'>
          <Outlet />
        </section>
        </>
      )}
    </>
    
  )
}

export default AuthLayout