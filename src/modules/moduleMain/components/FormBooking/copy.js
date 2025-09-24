import { useEffect, useState, useRef, useMemo } from 'react';
import InputWithSelect from '../../../moduleServices/components/common/InputWithSelect/InputWithSelect';
import './FormBooking.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDetailsBookObject, addPersonalsObject } from '../../store/home/home.slice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/math/mathUtils';
import InputText from '../../../moduleServices/components/common/InputText/InputText';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import InputPhone from '../../../moduleServices/components/common/InputPhone/InputPhone';
import CardCheckContact from '../CardCheckContact/CardCheckContact';
import { validateEmail } from '../../../../utils/validation/validationForm';
import { FaUserCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

let timer;

const FormBooking = () => {
  const { t } = useTranslation();
  const { portsObject } = useSelector((state) => state.moduleMain.homeSlice);

  const FieldsObject = {
    fieldDescription: 'textDescriptionBook',
    fieldReferenceNumber: 'textReferenceNumber',
    fieldWeight: 'textWeight',
    fieldCommodity: 'textCommodity',
    fieldTextPersonName: 'textPersonName',
    fieldTextPhoneNumber: 'textPhoneNumber',
    fieldEmail: 'textPersonEmail',
    fieldCheckGmail: 'checkboxGmail',
    fieldCheckWhatsapp: 'checkboxWhatsapp',
    fieldCheckPhone: 'checkboxPhone',
  };

  const initialForm = useMemo(
    () => ({
      textDescriptionBook: "",
      textReferenceNumber: "",
      textWeight: "",
      textCommodity: "",
      textPersonName: "",
      textPhoneNumber: "963",
      textPersonEmail: "",
      checkboxGmail: false,
      checkboxWhatsapp: false,
      checkboxPhone: false,
    }),
    []
  );

  const [formBookObject, setFormBookObject] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingForm } = useSelector((state) => state.moduleMain.homeSlice);

  const handleInputText = (field, value) => {
    if (!field || !value) return; // Defensive check to ensure field and value are valid
    if (field === FieldsObject.fieldWeight) {
      setFormBookObject((prevState) => ({ ...prevState, [field]: formatNumber(value) }));
    } else if (field === FieldsObject.fieldEmail) {
      if (validateEmail(value)) {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPersonEmailValid: "valid" }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPersonEmailValid: "هذا الايميل غير صالح" }));
      }
    } else {
      setFormBookObject((prevState) => ({ ...prevState, [field]: value }));
    }
  };

  const handleInputTextContact = (field, value) => {
    if (!field || !value) return; // Defensive check
    setFormBookObject((prevState) => ({ ...prevState, [field]: value }));

    if (field === FieldsObject.fieldTextPhoneNumber) {
      if (parsePhoneNumberFromString("+" + value)?.isValid()) {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPhoneNumberValid: "valid" }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPhoneNumberValid: "هذا الرقم غير صالح" }));
      }
    } else if (field === FieldsObject.fieldEmail) {
      if (validateEmail(value)) {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPersonEmailValid: "valid" }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, textPersonEmailValid: "هذا الايميل غير صالح" }));
      }
    }
  };

  const handleChecked = (field, value) => {
    setFormBookObject((prevState) => ({ ...prevState, [field]: value }));
  };

  const removeTrailingComma = (str) => {
    return str?.endsWith(',') ? str.slice(0, -1) : str;
  };

  const handleFormBook = (e) => {
    e.preventDefault();
    const errorObject = {};

    if (formBookObject.textDescriptionBook.trim() === "") {
      errorObject.textDescriptionBook = "الحقل  مطلوب";
    }
    if (formBookObject.textWeight.trim() === "") {
      errorObject.textWeight = "الحقل  مطلوب";
    }
    if (formBookObject.textCommodity.trim() === "") {
      errorObject.textCommodity = "الحقل  مطلوب";
    }
    if (formBookObject.textPersonName.trim() === "") {
      errorObject.textPersonName = "الحقل  مطلوب";
    }
    if (!validateEmail(formBookObject.textPersonEmail)) {
      errorObject.textPersonEmailValid = "الايميل غير صالح ";
    }
    if (formBookObject.textPhoneNumber.trim().length === 0) {
      errorObject.textPhoneNumber = "الهاتف مطلوب";
    } else if (!parsePhoneNumberFromString("+" + formBookObject.textPhoneNumber)?.isValid()) {
      errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح ";
    }

    if (!formBookObject.checkboxGmail && !formBookObject.checkboxWhatsapp && !formBookObject.checkboxPhone) {
      errorObject.noChecks = "الحقل  مطلوب";
    }

    setFormErrors(errorObject);

    if (Object.keys(errorObject).length > 0) {
      return;
    }

    const communicationMethod = [
      formBookObject.checkboxGmail ? t('labelServices.email') : '',
      formBookObject.checkboxWhatsapp ? t('labelServices.placeholderWhatsapp') : '',
      formBookObject.checkboxPhone ? t('labelServices.numberPhone') : '',
    ]
      .filter(Boolean)
      .join(',');

    dispatch(
      addDetailsBookObject({
        descriptionBook: formBookObject.textDescriptionBook,
        refernceNumber: formBookObject.textReferenceNumber,
        textWeight: formBookObject.textWeight,
        textCommodity: formBookObject.textCommodity,
        sender_name: formBookObject.textPersonName,
        phone_number: "+" + formBookObject.textPhoneNumber,
        email: formBookObject.textPersonEmail,
        Communication_method: removeTrailingComma(communicationMethod),
      })
    );

    dispatch(addPersonalsObject({ emailUser: formBookObject.textEmail }));

    navigate('details-book');
  };

  return (
    <div className='form-booking'>
      <div className='booking_row1'>
        {portsObject.portFrom}-----{portsObject.portTo}
        <p className='row1__title'>
          {t('bookingTitles.labelWhatShipping')}
        </p>
      </div>

      <div className='booking_row2'>
        <p className='row2__title'>
          {t('bookingTitles.labelDetailsCargoCard')}
        </p>

        <div className='form-item width-100'>
          <InputText
            getInputText={handleInputText}
            placeholder={t('bookingTitles.placeholderCargoDescription')}
            title={t('bookingTitles.labelCargoDescription')}
            field={FieldsObject.fieldDescription}
            value={formBookObject.textDescriptionBook}
            errorValue={formErrors?.textDescriptionBook}
            isTextArea={true}
            styleTextArea={{ height: '70px' }}
          />
        </div>

        <div className='card-tools'>
          <div className='card-input'>
            <InputWithSelect
              textWeightValue={formBookObject.textWeight}
              getInputText={handleInputText}
              field={FieldsObject.fieldWeight}
              title={t('bookingTitles.labelCargoWeight')}
              showunitText={true}
              untiText={t('bookingTitles.unitCargoWeight')}
              errorValue={formErrors?.textWeight}
            />
          </div>

          <div className='card-input'>
            <InputWithSelect
              textWeightValue={formBookObject.textReferenceNumber}
              getInputText={handleInputText}
              field={FieldsObject.fieldReferenceNumber}
              title={t('bookingTitles.HaulageReference')}
              hideSelect={true}
            />
          </div>
        </div>

        <div className='form-item width-100'>
          <InputText
            styleColor={{ color: '#0D3453' }}
            getInputText={handleInputTextContact}
            Icon={<FaUserCircle />}
            title={t('labelServices.name')}
            placeholder={t('labelServices.placeholderName')}
            field={FieldsObject.fieldTextPersonName}
            value={formBookObject.textPersonName}
            errorValue={formErrors?.textPersonName}
          />
        </div>

        <div className='form-item width-100 input-box2'>
          <InputPhone
            styleColor={{ color: '#0D3453' }}
            getInputText={handleInputTextContact}
            title={t('labelServices.numberPhone')}
            placeholder={t('labelServices.placeholderNumberPhone')}
            field={FieldsObject.fieldTextPhoneNumber}
            value={formBookObject.textPhoneNumber}
            errorValue={formErrors?.textPhoneNumber || formErrors?.textPhoneNumberValid}
            seto={setFormBookObject}
          />
        </div>

        <div className='form-item width-100'>
          <InputText
            styleColor={{ color: '#0D3453' }}
            getInputText={handleInputTextContact}
            Icon={<TfiEmail />}
            title={t('labelServices.email')}
            placeholder={t('labelServices.placeholderEmail')}
            field={FieldsObject.fieldEmail}
            value={formBookObject.textPersonEmail}
            errorValue={formErrors?.textPersonEmailValid}
          />
        </div>

        <div className='form-no-results__check'>
          <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckPhone} value={formBookObject.checkboxPhone} placeholder={t('labelServices.numberPhone')} />
          <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckGmail} value={formBookObject.checkboxGmail} placeholder={t('labelServices.email')} />
          <CardCheckContact handleChecked={handleChecked} field={FieldsObject.fieldCheckWhatsapp} value={formBookObject.checkboxWhatsapp} placeholder={t('labelServices.placeholderWhatsapp')} />
        </div>

        <div className='form-no-results__button-parent'>
          <button disabled={loadingForm} className='form-no-results__button' onClick={handleFormBook}>
            2Form
            <span className={`${loadingForm && 'btn-ring'}`}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBooking;
