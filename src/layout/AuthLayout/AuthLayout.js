import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './AuthLayout.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AuthLayout = () => {

  const {i18n} = useTranslation();
  const { lang } = useParams();
  const navigate =useNavigate();
  const location =useLocation();


  useEffect(()=>{
    document.documentElement.lang=i18n.language;
    // فلما بتكون ar كمان بنفذ اوووف

    if(lang==="ar"|| lang===undefined){
    document.body.classList.add('rtl');
    }
    else if(lang==="en")
    // document.body.classList.remove('rtl');
    document.body.classList.remove('rtl');


    if(lang===undefined){
      i18n.changeLanguage("ar");
      localStorage.setItem('language', "ar");
    }else{
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }



    if (lang !== 'en' && lang !==undefined) {
      if(lang ==='ar' ){
        const currentPath = location.pathname;
        const newPath = currentPath.replace('/ar', '');
        const queryParams = location.search; // Preserve existing query parameters

        navigate(`${newPath}${queryParams}`, { replace: true }); // Navigate to the new path
      return;
      }
    }

    // eslint-disable-next-line
  },[lang])



  return (
    <main className='auth-layout'>
        <Outlet/>

    </main>
  )
}

export default AuthLayout
