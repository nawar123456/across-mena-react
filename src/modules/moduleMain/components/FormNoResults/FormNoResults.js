import { useTranslation } from 'react-i18next';
import './FormNoResults.css';
import { useMemo, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';
import RightSection from '../../../../assets/images/Right Section No Result2.png'; // Image you mentioned
import Morsat from '../../../../assets/icons/Morsat.svg'; // Image you mentioned
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import CardCheckContact from '../CardCheckContact/CardCheckContact';
import { FaArrowRightLong } from 'react-icons/fa6';
import { validateEmail } from '../../../../utils/validation/validationForm';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useDispatch, useSelector } from 'react-redux';
import { postAppointment } from '../../store/home/home.action';
import InputTextNoResult from '../../../moduleServices/components/common/InputText/InputTextNoResult';
import InputPhoneNoResult from '../../../moduleServices/components/common/InputPhone/InputPhoneNoResult';

const FormNoResults = ({ className }) => {
  const { t, i18n } = useTranslation();
  const selectedContainer = useSelector((state) => state.moduleServices.seaFormSlice);
  const {
    portsObject,
    bookingObject
} = useSelector((state) => state.moduleMain.homeSlice);


  const FieldsObject = {
    fieldTextPersonName: 'textPersonName',
    fieldTextPhoneNumber: 'textPhoneNumber',
    fieldEmail: 'textPersonEmail',
    fieldCheckGmail: 'checkboxGmail',
    fieldCheckWhatsapp: 'checkboxWhatsapp',
    fieldCheckPhone: 'checkboxPhone',
  };

  const initialForm = useMemo(
    () => ({
      textPersonName: '',
      textPhoneNumber: '963',
      textPersonEmail: '',
      checkboxGmail: false,
      checkboxWhatsapp: false,
      checkboxPhone: false,
    }),
    [i18n.language]
  );

  const [formNoResults, setFormNoResults] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleSumbitForm = (e) => {
    e.preventDefault();

    let errorObject = {};

    if (formNoResults?.textPersonName.trim() === '') {
      errorObject.textPersonName = 'الحقل  مطلوب';
    }

    if (formNoResults?.textPersonEmail.trim() === '') {
      errorObject.textPersonEmail = 'الحقل  مطلوب';
    }

    if (!validateEmail(formNoResults?.textPersonEmail)) {
      errorObject.textPersonEmailValid = 'الايميل غير صالح ';
    }

    if (formNoResults.textPhoneNumber.trim().length === 0) {
      errorObject.textPhoneNumber = 'الهاتف مطلوب';
    } else if (!parsePhoneNumberFromString('+' + formNoResults.textPhoneNumber)?.isValid()) {
      errorObject.textPhoneNumberValid = 'رقم الهاتف غير صالح ';
    }

    let CommunicationMethod = '';
    if (formNoResults.checkboxGmail) CommunicationMethod = ` ${t('labelServices.email')} ,`;
    if (formNoResults.checkboxWhatsapp)
      CommunicationMethod += ` ${t('labelServices.placeholderWhatsapp')} ,`;
    if (formNoResults.checkboxPhone) CommunicationMethod += ` ${t('labelServices.numberPhone')} `;
    let myCommunicationMethodEdit = CommunicationMethod.replace(/,$/, '');

    if (!CommunicationMethod) {
      errorObject.noChecks = 'الحقل  مطلوب';
    }

    setFormErrors(errorObject);

    if (Object.keys(errorObject).length > 0) {
      return;
    }

    let paramObject = {
      sender_name: formNoResults.textPersonName,
      phone_number: '+' + formNoResults.textPhoneNumber,
      email: formNoResults.textPersonEmail,
      Communication_method: myCommunicationMethodEdit,
      port_from: portsObject?.portFrom || '',
      port_to: portsObject?.portTo || '',
     container_number: selectedContainer.selectedContainer, // ✅ New
     container_size: bookingObject.container
    };

    dispatch(postAppointment(paramObject));
  };

  const handleInputText = (field, value) => {
    setFormNoResults((formNoResults) => ({ ...formNoResults, [field]: value }));

    if (field === FieldsObject.fieldTextPhoneNumber && (formErrors?.textPhoneNumberValid || formErrors?.textPhoneNumberValid === 'valid')) {
      if (parsePhoneNumberFromString('+' + value)?.isValid()) {
        setFormErrors((formErros) => ({ ...formErros, textPhoneNumberValid: 'valid' }));
      } else {
        setFormErrors((formErros) => ({ ...formErros, textPhoneNumberValid: 'هذا الرقم غير صالح' }));
      }
    } else if (field === FieldsObject.fieldEmail && (formErrors?.textPersonEmailValid || formErrors?.textPersonEmailValid === 'valid')) {
      if (validateEmail(value)) {
        setFormErrors((formErros) => ({ ...formErros, textPersonEmailValid: 'valid' }));
      } else {
        setFormErrors((formErros) => ({ ...formErros, textPersonEmailValid: 'هذا الايميل غير صالح' }));
      }
    }
  };

  const handleChecked = (field, value) => {
    setFormNoResults((formNoResults) => ({ ...formNoResults, [field]: value }));
  };

  const styleColor = {
    color: '#0D3453',
  };

  return (
    <>
      <p className="title-noResult">{t('labelServices.noResultTitle')}</p>
      <p className="subttitle-noResult">{t('labelServices.noResultsubTitle')}</p>

      <div className={`form-no-resultss ${className}`}>
        <div className="form-left-section">
          <div className="form-item width-100">
            <div className="noResult-name">
              <InputTextNoResult
                className="formNoResult-input" // 👈 Add your custom class here
                styleColor={styleColor}
                getInputText={handleInputText}
                Icon={<FaUserCircle />}
                title={t('labelServices.name')}
                placeholder={t('labelServices.placeholderName')}
                field={FieldsObject.fieldTextPersonName}
                value={formNoResults.textPersonName}
                errorValue={formErrors?.textPersonName}
              />
            </div>
          </div>

          <div className="form-item width-100">
            <div className="noResult-Email">
              <InputTextNoResult
                className="formNoResult-input" // 👈 Add your custom class here
                styleColor={styleColor}
                getInputText={handleInputText}
                Icon={<TfiEmail />}
                title={t('labelServices.email')}
                placeholder={t('labelServices.placeholderEmail')}
                field={FieldsObject.fieldEmail}
                value={formNoResults.textPersonEmail}
                errorValue={formErrors?.textPersonEmailValid}
              />
              {formErrors?.textPersonEmailValid && formErrors?.textPersonEmailValid !== 'valid' && (
                <span className="input-warning">{t('labelServices.InvalidEmail')}</span>
              )}
            </div>
          </div>

          <div className="form-item width-100">
            <div className="noResult-phone">
              <InputPhoneNoResult
                styleColor={styleColor}
                getInputText={handleInputText}
                title={t('labelServices.numberPhone')}
                placeholder={t('labelServices.placeholderNumberPhone')}
                field={FieldsObject.fieldTextPhoneNumber}
                value={formNoResults.textPhoneNumber}
                errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
                seto={setFormNoResults}
              />
              {formErrors?.textPhoneNumberValid && formErrors?.textPhoneNumberValid !== 'valid' && (
                <span className="input-warning">{t('labelServices.InvalidPhone')}</span>
              )}
            </div>
          </div>

          <div className="form-no-resultss__check">
            <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckPhone} value={formNoResults.checkboxPhone} icon={<FaUserCircle />} placeholder={t('labelServices.numberPhone')} />
            <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckGmail} value={formNoResults.checkboxGmail} icon={<TfiEmail />} placeholder={t('labelServices.email')} />
            <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckWhatsapp} value={formNoResults.checkboxWhatsapp} icon={<FaUserCircle />} placeholder={t('labelServices.placeholderWhatsapp')} />
          </div>

          <div className="form-no-resultss__button-parent">
            <div className="noResult-only">
              <button className="form-no-resultss__button" onClick={handleSumbitForm}>
                {t('actions.submit')}
              </button>
            </div>
          </div>
        </div>

        <div className="form-right-section">
        <div className="right-section-overlay-container">
  <img src={RightSection} alt="Right Section" className="right-section-img" />

  <div className={`ports-overlay ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
    <div className="port-item top-port">
      <span className="port-name">{portsObject?.portFrom}</span>
      <img src={Morsat} alt="Anchor" className="anchor" />
    </div>

    <div className="middle-section">
      <div className="dashed-line"></div>
      <div className="cargo-info">
        
    <span style={{ position: 'relative', color: '#0D3453', fontWeight: 'bold' }} className='containerOnly-fixSize'>
    {`${selectedContainer.selectedContainer}X
	${bookingObject.container?.toString().toUpperCase().replace('FT', ` FT`)}`}

	{console.log('reduxCounter',selectedContainer.selectedContainer)}
  	{console.log('reduxCounter',bookingObject.container)}

	</span>        
        </div>
    </div>

    <div className="port-item bottom-port">
      <img src={Morsat} alt="Anchor" className="anchor" />
      <span className="port-name">{portsObject?.portTo}</span>
    </div>
  </div>
</div>

</div>


      </div>
    </>
  );
};

export default FormNoResults;
