import { Routes, Route} from 'react-router-dom';

import './globals.css';

import LoginForm from './_auth/_forms/LoginForm';
import SignupForm from './_auth/_forms/SignupForm';
// import { Dashboard } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import { Toaster } from "@/components/ui/toaster";
import DashPage from './_root/pages/dash';
// import List from './_root/pages/tasks/list';
import Chat from './_root/pages/chat';
import SettPage from './_root/pages/settings';
import TasksPage from './_root/pages/tasks';
import EmpPage from './_root/pages/emp/employees';
import EmpOverviewPage from './_root/pages/emp/emp-overview';
import EmpDirectoryPage from './_root/pages/emp/emp-directory';
import EmpAddPage from './_root/pages/emp/emp-add';
import EmpDetailsPage from './_root/pages/emp/emp-details';


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<SettPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* <Route path="/tasks">
            <Route index element={<List />} />
          </Route> */}
          <Route path="/employees">
            <Route index element={<EmpPage />} /> {/* Renders when URL matches "/employees" */}
            <Route path="overview" element={<EmpOverviewPage />} /> {/* Renders when URL matches "/employees/overview" */}
            <Route path="directory" element={<EmpDirectoryPage />} /> {/* Renders when URL matches "/employees/directory"*/}
            <Route path="directory/add" element={<EmpAddPage />} /> {/* Renders when URL matches "/employees/directory/add" */}
            <Route path="directory/details" element={<EmpDetailsPage />} /> {/* Renders when URL matches "/employees/directory/add" */}

          </Route>
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