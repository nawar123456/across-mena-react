import './assets/styles/App.css';
import {  Suspense,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './modules/moduleAuth/components/Auth';
import { RouterProvider} from 'react-router-dom'

import router from './router';
import LoaderModal from './components/LoaderModal/LoaderModal';
import Logout from './modules/moduleAuth/components/Logout';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return (
    <>
        <AuthProvider>

      <ToastContainer />

        <Suspense fallback={<LoaderModal/>}> 
        <RouterProvider router={router} />
        </Suspense> 
        <Logout />
        </AuthProvider>

    </>
  );
}

export default App;
