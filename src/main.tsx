import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';
import { PunchInProvider } from './components/misc-components/punch-in';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <Analytics />
                <SpeedInsights />
                <PunchInProvider>
                    <App />     
                </PunchInProvider>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
)