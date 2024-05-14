import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';
import { PunchInProvider } from './components/punch-in';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Analytics />
        <SpeedInsights />
        <QueryProvider>
            <AuthProvider>
                <PunchInProvider>
                    <App />     
                </PunchInProvider>
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
)