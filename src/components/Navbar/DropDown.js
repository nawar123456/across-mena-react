// import { NavLink , useNavigate } from "react-router-dom";
import { Link,  } from "react-router-dom";

import './DropDown.css';

import { useTranslation } from "react-i18next";

const Dropdown = ({ el, handleburger,queryUrl }) => {

  const {t} = useTranslation()

  const handleNavigateScroll = (id,path,dis)=>{

    if(window.matchMedia("(max-width: 1250px)").matches===true){
    handleburger();// for toggle burger just in small navbar
    }




}


return (
    <>
    <ul className="dropdown__menu">
        {el.children.map((el2) => {
        return (
          
            <li
                key={el2.id}
                onClick={() => {
                  handleNavigateScroll(el2.id,el2.toPage,el2.disable);
                  }}
                  >
                   {/* {console.log(el)}  */}
                  <Link to={el2.toPage}   className={'dropdown__link'}   >
                  {
                  el2.name
                  }
                  
                  {
                  queryUrl.has("param")===false ? 
                  null
                  :
                  !el2.toPage ? <span style={{color:'#F20815', fontSize:'11px'}}>{t('actions.development')}</span>: <span style={{color:'green',fontSize:'11px'}}>{t('actions.test')}</span>                
                  }
                  
                  </Link>
                  
                </li>
        );
        })}
    </ul>
    </>
);
};


export default Dropdown;
