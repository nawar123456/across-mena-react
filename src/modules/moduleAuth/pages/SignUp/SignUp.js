import FormSignUp from '../../components/FormSignUp/FormSignUp';
import './SignUp.css';
import ImageLogin from '../../../../assets/images/test2.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrigins } from '../../../moduleTools/store/calculatorTap/customs.slice';
import FormNoResults from '../../../moduleMain/components/FormNoResults/FormNoResults';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next';

const SignUp = () => {
	const { t, i18n } = useTranslation();

    const { lang } = useParams();
    const dispatch = useDispatch();
    const {arrayCountries } = useSelector((state) => state.customsCalculator);


    useEffect(()=>{
        if(arrayCountries?.length >0)
        return
        dispatch(fetchOrigins());

        // eslint-disable-next-line
      },[dispatch]);



return (
    <>

    <section className="signup-left">
        <FormSignUp/>

    </section>

    {/* <section className="signup-right" style={{left : '1%' }}> */}
        {/* <img className="signup-right__image" src={ImageLogin} alt="signup" />
        <button className='sign-right__button login-submit2'>
            طلب مساعدة
        </button> */}
        {/* <FormNoResults/> */}



{/*
    <Card sx={{ Width: 110 }} style={{backgroundColor:'#eaeaea'}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
         {t('labelAuth.why')} AcrossMena
				 <br/>
				 <br/>
        </Typography>

        <Typography variant="h6" component="div">
			<div className='check_info'>
         <span className='circle_check_mark'></span><p>{t('labelAuth.infoRegister')}</p>
		 </div>
        </Typography>
        <br/>
        <br/>

        <Typography variant="h6" component="div">
			<div className='check_info'>
         <span className='circle_check_mark'></span><p>{t('labelAuth.infoRegister')}</p>
		 </div>
        </Typography>
 <br/>
        <br/>
        <Typography variant="h6" component="div">
			<div className='check_info'>
         <span className='circle_check_mark'></span><p>{t('labelAuth.infoRegister')}</p>
		 </div>
        </Typography>

      </CardContent>

    </Card> */}


    {/* </section> */}

    </>
)
}

export default SignUp
