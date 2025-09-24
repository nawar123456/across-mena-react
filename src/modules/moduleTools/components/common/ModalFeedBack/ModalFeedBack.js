import  {  t } from 'i18next';
import { postFeedBack, storeObjectFeesModal } from '../../../store/prohibitedTab/accordion.slice';
import './ModalFeedBack.css';
import { useDispatch,useSelector } from 'react-redux';
import InputText from '../../../../moduleServices/components/common/InputText/InputText';
import { ReactComponent as ArrowIcon } from "../../../../../assets/icons/arrow-down-final.svg";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '../../../../../utils/validation/validationForm';

const ModalFeedBack = ({objectFeesModal}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const {i18n} = useTranslation();
    const dispatch = useDispatch();
    const {
      loadingForm ,
      postFormFeedBack 
    } = useSelector((state) => state.accordion);



    //5 inputs option
    const FieldsObject = {

      fieldName:'textPersonName',
      fieldEmail:'textPersonEmail',
      fieldMessage:'textMessage',

      fieldTypeProblem:'selectTypeProblem',
      fieldTypeSection:'selectTypeSection',
    }

    const initialFormFeedBack ={
      textPersonName:"",
      textPersonEmail:"",
      textMessage:"",
      selectTypeProblem:"",
      selectTypeSection:""
    };


    useEffect(()=>{
      setFeedBackObject((formSeaObject)=>({...formSeaObject, selectTypeProblem : t('labelProhibitedPage.Choose') }));
      setFeedBackObject((formSeaObject)=>({...formSeaObject, selectTypeSection : t('labelProhibitedPage.Choose') }));
    },[i18n.language])

    const [formFeedBackObject , setFeedBackObject] = useState(initialFormFeedBack);

    const [formErrors, setFormErrors] = useState({});


    const handleInputText = (field,value)=>{
      setFeedBackObject((formSeaObject)=>({...formSeaObject, [field] : value }));
    }

    const valueSelect = (field , value)=>{

      if(field===FieldsObject.fieldTypeProblem){
        setFeedBackObject((formSeaObject)=>({...formSeaObject, selectTypeProblem : value }));
        setIsOpen2(false);


      }else if(field===FieldsObject.fieldTypeSection){
        setFeedBackObject((formSeaObject)=>({...formSeaObject, selectTypeSection : value }));
        setIsOpen(false);


      }else{
        setFeedBackObject((formSeaObject)=>({...formSeaObject, [field] : value }));

      }

    
    }

    const optionsProblems = [
        t('labelProhibitedPage.lackinformation'),
        t('labelProhibitedPage.otherwise'),
    ];


    const toggleOptionsList = () => {
        setIsOpen(!isOpen);
      };

    const toggleOptionsList2 = () => {
        setIsOpen2(!isOpen2);
      };

    

    const handleRequest = (e) => {
      e.preventDefault();

      let errorObject = {};
      let NameTapCommerical="";

      if(formFeedBackObject?.textPersonName.trim()==="" ){
          errorObject.textPersonName = "الحقل  مطلوب"
      }
  
      if(formFeedBackObject?.textPersonEmail.trim().length > 0)
      {
      if(!validateEmail(formFeedBackObject?.textPersonEmail)){
      errorObject.textPersonEmailValid = "الايميل غير صالح "
      }
    }

    if(formFeedBackObject?.textMessage.trim()==="" ){
      errorObject.textMessage = "الحقل  مطلوب"
    }

    if(formFeedBackObject?.selectTypeProblem===t('labelProhibitedPage.Choose') ){
    errorObject.selectTypeProblem = "الحقل  مطلوب"
    }      
    
    if(objectFeesModal?.nameTap===t('labelProhibitedPage.commercialDescription')){
      // fill param for API ( default value )
      NameTapCommerical=t('labelProhibitedPage.commercialDescription');
    }else{
      if(formFeedBackObject?.selectTypeSection===t('labelProhibitedPage.Choose') ){
        errorObject.selectTypeSection = "الحقل  مطلوب"
        }
    }


      setFormErrors(errorObject);
      if(Object.keys(errorObject).length > 0){
        return;
      }

      let postParamObject = {
        description: objectFeesModal?.data ,
        Tab_name: objectFeesModal?.nameTap,
        Field_type: NameTapCommerical.length > 0 ? NameTapCommerical : formFeedBackObject.selectTypeSection,
        sender_name: formFeedBackObject.textPersonName,
        email: formFeedBackObject.textPersonEmail,
        massage: formFeedBackObject.textMessage,
        problem: formFeedBackObject.selectTypeProblem
    }


      dispatch(postFeedBack(postParamObject));

      };


      useEffect(()=>{
        if(Object.keys(postFormFeedBack).length>0){
          setFeedBackObject(initialFormFeedBack);
          
        }

      },[postFormFeedBack])

    



const handleHide =()=>{//reset objectFeesModal
    dispatch(storeObjectFeesModal(null))
    setIsOpen(false);
    setIsOpen2(false);

    setFeedBackObject(initialFormFeedBack);

    }
const styleColor = {
  color:'#0D3453'
}

const styleTextArea ={
  height:'100px',
}


  return (
<section className='modal-feedback__background' style={{display:objectFeesModal?'block':'none'}}>

<section   className="modal-feedback">

  <form className="modal-feedback__content" >
    <div className="modal-feedback__container">

      <h2 className='modal-feedback__container-title'>
        {
          t('labelProhibitedPage.titleFormFeedBack')
        }
      </h2>

      <div className='modal-feedback__container-details'>
        <p className='modal-feedback__container-details__text'>
         <span>
         {t('labelProhibitedPage.chooseItem')} :
         </span>

         <span>
         {objectFeesModal?.data}
         </span>

        </p>

        <p className='modal-feedback__container-details__text'>
        <span>
        {t('labelProhibitedPage.nameContent')} :
        </span>

         <span>
         {objectFeesModal?.nameTap}
         </span>
        </p>
      </div>

      <div className='modal-feedback__container-tools'>
              <div className='modal-feedback__container-input'>

              <InputText 
              getInputText={handleInputText}
            //   // Icon={<UserProfile/>} 
            styleColor={styleColor}
              title={t('labelServices.name')}
              placeholder={t('labelServices.placeholderName')}
              field={FieldsObject.fieldName}
              value={formFeedBackObject.textPersonName}
              // handleClick={handleClick}
              errorValue={formErrors?.textPersonName}

              /> 
              </div>

              <div className='modal-feedback__container-input'>
              <InputText 
              styleColor={styleColor}

              getInputText={handleInputText} 
            //   // Icon={<MailProfile/>} 
              title={t('labelServices.email')}
              placeholder={t('labelServices.placeholderEmail')}
              field={FieldsObject.fieldEmail}
              value={formFeedBackObject.textPersonEmail}
            //   handleClick={handleClick}
              errorValue={formErrors?.textPersonEmailValid}

              />
              </div>

              { formErrors?.textPersonEmailValid &&
                <span className='input-warning'>
                { t('labelServices.InvalidEmail')}
                </span>
              }

      </div>


            {/* type Field except وصف تجاري */}

            <div className='modal-feedback__container-tools' style={{gridTemplateColumns : objectFeesModal?.nameTap===t('labelProhibitedPage.commercialDescription') && '1fr' }}>
            
              <div className='modal-feedback__container-input'>
                <p className='modal-feedback__container__select-title'>
                    {t('labelProhibitedPage.problemFeedBack')}
                </p>
                <div className="modal-feedback__container__select-menu">

                <div style={{border: formErrors?.selectTypeProblem &&formFeedBackObject.selectTypeProblem===t('labelProhibitedPage.Choose') ? '1px solid  red' : ''}} className="modal-feedback__container__select-menu__select" onClick={toggleOptionsList2}>
                    <span>{formFeedBackObject.selectTypeProblem}</span>
                    <ArrowIcon className={`modal-feedback__container__select-menu__select-icon ${isOpen2 ? 'rotate' :''}`} />
                </div>

                <div className={`modal-feedback__container__select-menu__options-list ${isOpen2 ? 'active': ''}`}>
                    {optionsProblems.map((option, index) => (
                    <div key={index} className="modal-feedback__container__select-menu__options-list__item" onClick={() => valueSelect(FieldsObject.fieldTypeProblem,option)}>
                    {option}
                    </div>
                    ))}
                </div>


                </div>

                </div>

                <>
                {objectFeesModal?.nameTap===t('labelProhibitedPage.commercialDescription') 
            ? null 
            :
            <div className='modal-feedback__container-input'>
                
                <p className='modal-feedback__container__select-title'>
                    {t('labelProhibitedPage.typeFeedBack')}
                </p>
                <div className="modal-feedback__container__select-menu">

                <div style={{border: formErrors?.selectTypeSection &&formFeedBackObject.selectTypeSection===t('labelProhibitedPage.Choose') ? '1px solid  red' : ''}} className="modal-feedback__container__select-menu__select" onClick={toggleOptionsList}>
                <span>{formFeedBackObject.selectTypeSection}</span>
                    <ArrowIcon className={`modal-feedback__container__select-menu__select-icon ${isOpen ? 'rotate' :''}`} />
                </div>

                <div className={`modal-feedback__container__select-menu__options-list ${isOpen ? 'active': ''}`}>
                    {objectFeesModal?.options.map((option, index) => (
                    <div key={index} className="modal-feedback__container__select-menu__options-list__item" onClick={() => valueSelect(FieldsObject.fieldTypeSection,option)}>
                    {option}
                    </div>
                    ))}
                </div>


                </div>

            </div>
            
            }


                </>

            </div>


            <div className='modal-feedback__container-input'>
                
            <InputText 
            styleColor={styleColor}
              getInputText={handleInputText}
            //   // Icon={<UserProfile/>} 
              title={t('labelProhibitedPage.messageFeedBack')}
            //   placeholder={t('labelServices.placeholderName')}
              field={FieldsObject.fieldMessage}
              value={formFeedBackObject.textMessage}
            //   handleClick={handleClick}
              errorValue={formErrors?.textMessage}
            isTextArea={true}
            styleTextArea={styleTextArea}

              /> 

            </div>

    
      <div className="modal-feedback__clearfix">
        <button type="button" onClick={handleHide} className="modal-feedback__cancelbtn">{t('actions.buttonCancel')}</button>

        <button disabled={loadingForm} type="button" onClick={handleRequest} className="modal-feedback__submitbtn">
          {loadingForm ? "" : t('actions.submit')}
          <span className={`${loadingForm && 'btn-ring'}`}></span>

        </button>
      </div>
    </div>
  </form>
</section>

</section>


  )
}

export default ModalFeedBack
