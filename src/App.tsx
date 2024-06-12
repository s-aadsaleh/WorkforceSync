// import { Routes, Route} from 'react-router-dom';

// import './globals.css';

// import LoginForm from './_auth/_forms/LoginForm';
// import SignupForm from './_auth/_forms/SignupForm';

// import AuthLayout from './_auth/AuthLayout';
// import RootLayout from './_root/RootLayout';

// import { Toaster } from "@/components/ui/toaster";
// import DashPage from './_root/pages/dash';

// import SettPage from './_root/pages/settings';
// import TasksPage from './_root/pages/tasks/tasks';
// import EmpPage from './_root/pages/emp/employees';
// import EmpOverviewPage from './_root/pages/emp/emp-overview';
// import EmpDirectoryPage from './_root/pages/emp/emp-directory';
// import EmpAddPage from './_root/pages/emp/emp-add';
// import EmpDetailsPage from './_root/pages/emp/emp-details';
// import PayrollPage from './_root/pages/payroll/payroll';
// import AssetMGMTPage from './_root/pages/assets-mgmt/assets';
// import FileStoragePage from './_root/pages/file-storage/file-storage';
// import AttendancePage from './_auth/_forms/attendance';


// const App = () => {
//   return (
//     <main className="flex h-screen">
//       <Routes>
//         {/* public routes */}
//           <Route path="/attendance" element={<AttendancePage />} />

//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<SignupForm />} />

        
//         </Route>

//         {/* private routes */}
//         <Route>
//           {/* <Route index element={<LoginForm />} /> */}
//           <Route path="/dashboard" element={<DashPage />} />
//           <Route path="/settings" element={<SettPage />} />
//           <Route path="/tasks" element={<TasksPage />} />

//           <Route path="/employees">
//             <Route index element={<EmpPage />} />
//             <Route path="overview" element={<EmpOverviewPage />} /> 
//             <Route path="directory" element={<EmpDirectoryPage />} /> 
//             <Route path="directory/add" element={<EmpAddPage />} /> 
//             <Route path="directory/details" element={<EmpDetailsPage />} /> 
//           </Route>

//           <Route path="/payroll">
//             <Route index element={<PayrollPage />} />
//           </Route>

//           <Route path="/assets">
//             <Route index element={<AssetMGMTPage />} />
//           </Route>

//           <Route path="/files" element={<FileStoragePage />} />
//         </Route>
//       </Routes>

//       <Toaster />
//     </main>
//   )
// }

// export default App


import { Routes, Route, Navigate } from 'react-router-dom';
import './globals.css';

import LoginForm from './_auth/_forms/LoginForm';
import SignupForm from './_auth/_forms/SignupForm';
import AttendancePage from './_auth/_forms/AttendanceForm';

import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import DashPage from './_root/pages/dash';
import TasksPage from './_root/pages/tasks/tasks';
import EmpDirectoryPage from './_root/pages/emp/emp-directory';
import EmpAddPage from './_root/pages/emp/emp-add';
import EmpDetailsPage from './_root/pages/emp/emp-details';
import PayrollPage from './_root/pages/payroll/payroll';
import AssetMGMTPage from './_root/pages/assets-mgmt/assets';
import FileStoragePage from './_root/pages/file-storage/file-storage';


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/tasks" element={<TasksPage />} />

          <Route path="/employees" element={<Navigate to="/employees/directory" />} />
          <Route path="/employees/directory">
            <Route index element={<EmpDirectoryPage />} />
            <Route path="add" element={<EmpAddPage />} /> 
            <Route path="details" element={<EmpDetailsPage />} /> 
          </Route>

          <Route path="/payroll">
            <Route index element={<PayrollPage />} />
          </Route>

          <Route path="/assets">
            <Route index element={<AssetMGMTPage />} />
          </Route>

          <Route path="/files" element={<FileStoragePage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
      </Routes>


    </main>
  )
}

export default App;
