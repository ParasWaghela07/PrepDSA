import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <BrowserRouter>
        <App/>
        <Toaster/>
        <ToastContainer/>
        </BrowserRouter>
    </AppContextProvider>
)
