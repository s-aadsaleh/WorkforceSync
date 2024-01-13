import { Routes, Route} from 'react-router-dom';

import './globals.css';

import LoginForm from './_auth/_forms/LoginForm';
import SignupForm from './_auth/_forms/SignupForm';
import { Dashboard } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App