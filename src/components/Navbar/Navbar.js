import "./Navbar.css";

import Dropdown from "./DropDown";

import MainContainer from "../MainContainer/MainContainer";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

// import {NavLinksData2} from '../../const/index';

import logo from '../../assets/icons/last_logo_navbar.svg'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down-s-line.svg';
import { ReactComponent as MenuLine } from '../../assets/icons/menu-line.svg';
import { ReactComponent as CloseLine } from '../../assets/icons/close-line.svg';
import { ReactComponent as ToArabicIcon } from '../../assets/icons/toArabic.svg';
import { ReactComponent as ToEnglishIcon } from '../../assets/icons/toEnglish.svg';


import { useCallback, useState } from "react";
import { useTranslation } from 'react-i18next';
import useQuery from "../../hooks/useQuery";
import { useAuth } from "../../modules/moduleAuth/components/Auth";

const Navbar = () => {
  const auth=useAuth();
   auth.password=null;
  const { t, i18n } = useTranslation();
  const queryUrl= useQuery();
  // if(queryUrl.has("param"))



const NavLinksData2 = [{
  "name": t('labelNavbar.track'),
  "id": 1,
  "toPage": "track",
},
{
  "name": t('labelNavbar.contact'),
  "id": 2,
  "toPage": "contact-us",
},
// {
//   "name": t('labelNavbar.help'),
//   "id": 2,
//   "children": [{
//     "name": t('labelNavbar.consulting'),
//     "id": 21,
//           "toPage": "https://acrossmena.com/%d8%a7%d9%84%d9%85%d8%b3%d8%a7%d8%b9%d8%af%d8%a9/%d8%a7%d9%84%d8%a7%d8%b3%d8%aa%d8%b4%d8%a7%d8%b1%d8%a7%d8%aa/",

//       },
//       {
//         "name": t('labelNavbar.contact'),
//         "id": 22,
//           "toPage": "https://acrossmena.com/%d8%a7%d9%84%d9%85%d8%b3%d8%a7%d8%b9%d8%af%d8%a9/%d8%a7%d8%aa%d8%b5%d9%84-%d8%a8%d9%86%d8%a7/",

//       },
//   ]
// },
{
  "name": t('labelNavbar.about'),
  "id": 3,
  "children": [{
          "id": 31,
          "name": t('labelNavbar.whoWeAre'),
          "toPage": "about-us"
      },
      {
          "id": 32,
          "name": t('labelNavbar.privacyPolicy'),
          "toPage":"privacy-policy"
      },
  ]
},
{
  "name": t('labelNavbar.tools'),
  "id": 4,
  "children": [{
          "id": 41,
          "name": t('labelNavbar.customsTariffAndConditions'),
          "toPage": 'prohibited-permitted-materials/search-hs-code',

      },
      {
          "id": 42,
          "name":  t('labelNavbar.customsDutiesCalculator'),
          "toPage": 'customs-duties-calculator/calculator',

      },
      {
          "id": 43,
          "name": t('labelNavbar.shippingCalculators'),
          "toPage":"tools/shipping-calculators"

      },
      {
          "id": 44,
          "name": t('labelNavbar.containerTypesAndSizes'),
          "toPage": "tools/container-types",

      },
      {
          "id": 45,
          "name": t('labelNavbar.truckTypesAndSizes'),
          "toPage":"tools/truck-types"
      },
      // {
      //     "id": 46,
      //     "name": t('labelNavbar.incoterms'),
      //     "toPage": "tools/incoterms"
      // },
      // {
      //     "id": 47,
      //     "name": t('labelNavbar.internationalTradeTerms'),
      //     "toPage": "tools/incoterms"
      // },
  ]
},
{
  "name": t('labelNavbar.services'),
  "id": 5,
  "children": [{

		"id": 51,
		"name": t('labelNavbar.seaShipping'),
		"toPage": "services/sea-shipping",
      },
      {


					"id": 52,
          "name": t('labelNavbar.landShipping'),
          "toPage": "services/land-shipping",

      },
      {
          "id": 53,
          "name": t('labelNavbar.airFreight'),
          "toPage": "services/airport-shipping",

      },
      // {
      //     "id": 54,
      //     "name": t('labelNavbar.customClearance'),
      //     "toPage": "services/customs-clearance",

      // },

  ]
},
{
  "name": t('labelNavbar.home'),
  "id": 6,
  "toPage": "/",

},

];

  const [toggle, setToggle] = useState(false);
  const [toggle3, setToggle3] = useState(null);
  //change color when scroll
  // const [color , setColor] = useState(false);
const navigate = useNavigate();
const location = useLocation();


  const handleToggle = (name) => {
    if (toggle3 === name) {
      setToggle3(null);
    } else {
      setToggle3(name);
    }
  };


  const handleburger = useCallback (() => {
    setToggle3(null);
    setToggle(toggle => !toggle);
  } ,[]);

  // Language toggle handler
  const toggleLanguage = (e) => {
    const currentLang = i18n.language;
  const path = location.pathname;
  const queryUrl = new URLSearchParams(location.search);

  let newPath;

  if (currentLang === 'en' || (currentLang !== 'ar' && currentLang !== undefined)) {
    // Switch to Arabic
    i18n.changeLanguage('ar');

    // If there’s an 'en' prefix, replace it with 'ar'; if no prefix, add '/ar'
    newPath = path.startsWith('/en') ? path.replace('/en', '/ar') : `/ar${path}`;

    // Preserve query params if they exist
    if (queryUrl.has('param')) {
      navigate(`${newPath}?${queryUrl.toString()}`);
    } else {
      navigate(newPath);
    }

  } else if (currentLang === 'ar') {
    // Switch to English
    i18n.changeLanguage('en');

    // If there’s an 'ar' prefix, replace it with 'en'; if no prefix, add '/en'
    newPath = path.startsWith('/ar') ? path.replace('/ar', '/en') : `/en${path}`;

    // Preserve query params if they exist
    if (queryUrl.has('param')) {
      navigate(`${newPath}?${queryUrl.toString()}`);
    } else {
      navigate(newPath);
    }
  }
};

  return (
    <header className={"header header-bg"}>
      <MainContainer hasPadding={false}>
      <nav className="nav">
        <div className="nav__data">
        <div
  style={{ width: '220px', height: '74px', cursor: 'pointer' }}
  onClick={() => {
    const langPrefix = i18n.language === 'ar' ? '/ar' : '/en';
    navigate(`${langPrefix}/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  <img src={logo} alt="logo icon" />
</div>


          <div
            className={toggle === true ? "nav__toggle show-icon" : "nav__toggle "}

            id="nav-toggle"
            onClick={() => {
              handleburger();
            }}
          >
            <MenuLine className="nav__burger" style={ {fill:'#FFC400'}}/>
            <CloseLine className="nav__close" style={ {fill:'#FFC400'}}/>
          </div>
        </div>

        {/* <!--=============== NAV MENU ===============--> */}
        <div
          className={toggle === true ? "nav__menu show-menu " : "nav__menu "}
          id="nav-menu"
        >
          <ul className="nav__list">
          {(i18n.language === 'en' ? [...NavLinksData2].reverse() : NavLinksData2).map((el) => {
              if(!el.children){
                return(
              <li
              key={el.id}
              onClick={() => {
                handleburger();
								if (el.id === 6) {
                  const langPrefix = i18n.language === 'ar' ? '/ar' : '/en';
                  navigate(`${langPrefix}/`);
                }
                
									// make reload to Home page always
									window.scrollTo({
										top: 0,
										behavior: "smooth",
									});
              }}
            >

              <NavLink  style={{pointerEvents:!el.toPage ? 'none' : 'all'}}  to={el.toPage} className={ "nav___link_change nav___link_change_color " } >
                {el.name}
                {
                  queryUrl.has("param")===false ?
                  null
                  :
                  !el.toPage ? <span className="span-developemnt">{t('actions.development')}</span>: <span className="span-developemnt" style={{color:'green'}}>{t('actions.test')}</span>
                }

                </NavLink>
            </li>
                );
              }

              return(
                <li
                key={el.id}
                onClick={() => {
                  handleToggle(el.id);
                }}
                className={
                  toggle3 === el.id
                    ? "dropdown__item active-toggle"
                    : "dropdown__item"
                }
              >
                <div className={ "nav___link_change nav___link_change_color " }>
                  {el.name}
                  <ArrowDown className="dropdown__arrow"/>
                </div>

              {/* <!--=============== DROPDOWN  ===============--> */}
              <Dropdown queryUrl={queryUrl} el={el} handleburger={handleburger} />
              </li>
              )
            })
            }



            <li onClick={toggleLanguage} className="nav__list_lan new-lang">

              {
                i18n.language==='ar' ?
                <ToEnglishIcon/>
                :
                <ToArabicIcon/>
              }
            </li>




            {!auth.password && (
              <li className="nav__list_lan new-lang login-parent " style={{ pointerEvents:'none', cursor:'context-menu'}} >
              <NavLink to={"login"} className={"navbar-login"} style={{ pointerEvents:'none',color:'#F4F4F4', cursor:'context-menu'}} >
              </NavLink>
              </li>
            ) }

{auth.password && (
              <li className="nav__list_lan new-lang login-parent ">
              <NavLink to={""} className={"navbar-login"}>
                {t('labelAuth.signOut')}
              </NavLink>
              </li>
            )}




          </ul>

        </div>
      </nav>
      </MainContainer>
    </header>
  );
};

export default Navbar;
