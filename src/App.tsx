import { Routes, Route} from 'react-router-dom';

import './globals.css';

import LoginForm from './_auth/_forms/LoginForm';
import SignupForm from './_auth/_forms/SignupForm';

import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster";
import DashPage from './_root/pages/dash';

import SettPage from './_root/pages/settings';
import TasksPage from './_root/pages/tasks';
import EmpPage from './_root/pages/emp/employees';
import EmpOverviewPage from './_root/pages/emp/emp-overview';
import EmpDirectoryPage from './_root/pages/emp/emp-directory';
import EmpAddPage from './_root/pages/emp/emp-add';
import EmpDetailsPage from './_root/pages/emp/emp-details';
import PayrollPage from './_root/pages/payroll/payroll';
import AssetMGMTPage from './_root/pages/assets-mgmt/assets';
import AssetRegisterPage from './_root/pages/assets-mgmt/assets-register';
import FileStoragePage from './_root/pages/file-storage/file-storage';


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/settings" element={<SettPage />} />
          <Route path="/tasks" element={<TasksPage />} />

          <Route path="/employees">
            <Route index element={<EmpPage />} />
            <Route path="overview" element={<EmpOverviewPage />} /> 
            <Route path="directory" element={<EmpDirectoryPage />} /> 
            <Route path="directory/add" element={<EmpAddPage />} /> 
            <Route path="directory/details" element={<EmpDetailsPage />} /> 
          </Route>

          <Route path="/payroll">
            <Route index element={<PayrollPage />} />
          </Route>

          <Route path="/assets">
            <Route index element={<AssetMGMTPage />} />
            <Route path="register" element={<AssetRegisterPage />} /> 
          </Route>

          <Route path="/files" element={<FileStoragePage />} />
        
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App