import { NavLink, useNavigate } from 'react-router-dom';
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import './FormLogin.css';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {ReactComponent as EyeOff} from '../../../../assets/icons/eye-off-line.svg';
import {ReactComponent as EyeOn} from '../../../../assets/icons/eye-line.svg';
import face from '../../../../assets/icons/facebookicon.svg';
import google from '../../../../assets/icons/googleicon.svg';
import italicLine from '../../../../assets/icons/italic-line.svg';
// import networkLogin from '../../../../assets/icons/network-login.svg';
import triangleLogin from '../../../../assets/icons/triangle-login.svg';

import { useAuth } from '../Auth';


const FormLogin = () => {
  const [password , setPassword] = useState('')
  const [emailOrPhone , setEmailOrPhone] = useState('')

  const auth = useAuth
  const navigate=useNavigate();
    const {t} = useTranslation();
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(true);



    const FieldsObject = {
        fieldUserName:'textUserName',
        fieldPassword:'textPassword',
    }

    const initialFormSea = useMemo(() => ({
        textUserName:"",
        textPassword:"",
      }), []);

      const [formLoginIn , setFormLogin] = useState(initialFormSea);


      const handleInputText = (field,value)=>{

        setFormLogin((formLogin)=>({...formLogin, [field] : value }));

    }

    const handleLogin = (e)=>{
        e.preventDefault();
        // auth.login(password)
        // navigate("/",{replace:true})
        let errorObject = {};

        if(formLoginIn?.textUserName.trim()==="" ){
            errorObject.textEmptyUserName = "الحقل  مطلوب"
            }
        if(formLoginIn?.textPassword.trim()==="" ){
            errorObject.textEmptyPassword = "الحقل  مطلوب"
        }

        setFormErrors(errorObject);

        if(Object.keys(errorObject).length > 0){
            return;
        }
// Store tokens in session storage
// sessionStorage.setItem('accessToken', accessToken);
// sessionStorage.setItem('refreshToken', refreshToken);

// To retrieve them
// const storedAccessToken = sessionStorage.getItem('accessToken');
// const storedRefreshToken = sessionStorage.getItem('refreshToken');
      //   try {
			// 		const response =  fetch(url, {
			// 				method: 'POST',
			// 				headers: {
			// 						'Content-Type': 'application/json',
			// 				},
			// 				body: JSON.stringify(data),
			// 		});

			// 		if (!response.ok) {
			// 				throw new Error('Login failed! Check your credentials.');
			// 		}

			// 		const result =  response.json();

			// 		// Assuming your API returns an object with accessToken and refreshToken
			// 		const { accessToken, refreshToken } = result;
			// 		// const accessToken = result.accessToken;
			// 		// const refreshToken = result.refreshToken
			// 		**// Store tokens in localStorage
			// 		localStorage.setItem('accessToken', accessToken);
			// 		localStorage.setItem('refreshToken', refreshToken);

			// 		// Handle successful login (e.g., set user info, redirect, etc.)
			// 		console.log('Login successful:', result);
			// } catch (err) {
			// 		setError(err.message);
			// } finally {
			// 		setLoading(false);
			// }
	};





    const handleShowPassword = ()=>{
      setShowPassword(prev =>!prev);
    }

  return (
		<>
    <div className="login-left__parent" style={{direction:'rtl'}}>

    <h1 className="login-left__title">{t('labelAuth.welcome')}</h1>
    <p className="login-left__text">

    {t('labelAuth.subText')}
    </p>

    <div className="login-left__input">
    <InputText
          getInputText={handleInputText}
          // Icon={<MailProfile/>}
          title={t('labelAuth.emailOrPhone')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldUserName}
          value={formLoginIn.textUserName}
          // handleClick={handleClick}
          errorValue={formErrors?.textEmptyUserName}
          styleColor={{fontSize:'15px'}}
          onChange={(e)=>setEmailOrPhone(e.target.value)}
    />
    </div>

    <div className="login-left__input">
    <InputText
          getInputText={handleInputText}
          Icon={ showPassword ? <EyeOff style={{width:'20px', height:'33px', cursor:'pointer'}}/> :  <EyeOn style={{width:'20px', height:'33px', cursor:'pointer'}}/>}
          title={t('labelAuth.password')}
          // placeholder={'Email/Phone'}
          field={FieldsObject.fieldPassword}
          value={formLoginIn.textPassword}
          //   handleClick={handleClick}
          errorValue={formErrors?.textEmptyPassword}
          styleColor={{fontSize:'15px'}}
          handleShowPassword={handleShowPassword}
          showPassword={showPassword}
          onChange={(e)=> setPassword(e.target.value)}
    />

    <NavLink className={"login-left__forget"}>
    {t('labelAuth.forgetPassword')}
    </NavLink>
    </div>

    <div className='login-btn' onClick={handleLogin}>
        <button className="login-submit">
        {t('labelAuth.signIn')}
      </button>
    </div>

    <p className="login-account">
      {t('labelAuth.noAccount')}
      <NavLink to={"/register"} className="login-left__signup">
      {t('labelAuth.signUp')}
      </NavLink>





      <span className='par2button'>
      <button className="login-submit2">



       <img src={face} className='facebook_button'></img>
			 {t('labelAuth.facebook')}

      </button>

      <button className="login-submit2">
      <img src={google} className='facebook_button'></img>
			{t('labelAuth.google')}
      </button>


 </span>
      </p>

{/* <img src={italicLine}></img> */}
    </div>



</>
  )
  }

export default FormLogin;
