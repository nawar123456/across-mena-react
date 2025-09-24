// import styles from  './RootLayout.module.css';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Footer, Navbar } from '../../components';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import usePageTracker from "../../hooks/usePageTracker";
import BackToTop from "../../components/BackToTop/BackToTop";

const RootLayout = () => {
  usePageTracker(); 
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState("goTop--hidden");
  const beforeFooter = useRef(null);
  const { i18n } = useTranslation();
  const { lang } = useParams();

  const navigate =useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleVisibleButton = () => {
      const position = window.pageYOffset;
      setSrollPosition(position);

      if (position > 1200 && beforeFooter.current.getBoundingClientRect().top > 350 ) {
        setshowGoTop("goTop");
      } else if (position < 1200) {
        setshowGoTop("goTop--hidden");
      }else if (beforeFooter.current.getBoundingClientRect().top  <=350){
        setshowGoTop("goTop--hidden");
      }
    };

    window.addEventListener("scroll", handleVisibleButton);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, [scrollPosition]); // Add scrollPosition as a dependency


    useEffect(()=>{
    document.documentElement.lang=i18n.language;
    // فلما بتكون ar كمان بنفذ اوووف
    
    if(lang==="ar"|| lang===undefined){
    document.body.classList.add('rtl');
    }
    else if(lang==="en")
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

    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${lang}`, '');
    const queryParams = location.search; // Preserve existing query parameters
    navigate(`${newPath}${queryParams}`, { replace: true }); // Navigate to the new path

  }

    // eslint-disable-next-line
  },[lang])

  const handleScrollUp = () => {
    window.scrollTo({
      top: 400 ,
      left: 0,
      behavior: 'smooth'
    });
    };

  return (
    <>
        <BackToTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
        <Navbar/>
        <Outlet/>
        <div ref={beforeFooter}></div>
        <Footer/>
    </>
  )
}

export default RootLayout;
