import React, { useState } from 'react';
import './VolumetricWeightCalculator.css';
import Rectangle from './../../../../assets/images/Rectangle 10330.png'
import AddImage from './../../../../assets/images/add-to-queue_svgrepo.com.png'
import Left from './../../../../assets/images/left Arrow.png'
import Right from './../../../../assets/images/right result.png'
import { useTranslation } from 'react-i18next';
 
const VolumetricCalculator = () => {
    const {t,i18n} = useTranslation();
  
  const [forms, setForms] = useState([
    { length: '', width: '', height: '', quantity: '', actualWeight: '', result: null }
  ]);

  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;

    const { length, width, height, quantity } = updatedForms[index];
    if (length && width && height && quantity) {
      const vol = ((+length * +width * +height) / 5000) * +quantity;
      updatedForms[index].result = vol.toFixed(2);
    } else {
      updatedForms[index].result = null;
    }

    setForms(updatedForms);
  };

  const addNewForm = () => {
    setForms([
      ...forms,
      { length: '', width: '', height: '', quantity: '', actualWeight: '', result: null }
    ]);
  };

  const totalVolume = forms.reduce((sum, form) => {
    return sum + (form.result ? parseFloat(form.result) : 0);
  }, 0).toFixed(2);

  return (
<div className="calculator-container" dir={i18n.dir()}>
      <h2 className="title-volume"> 
{t('VolumetricCalculator.title')}      
        </h2>
      <p className="subtitle-volume">
{t('VolumetricCalculator.subtitle')}      
       </p>

      {forms.map((form, index) => (
        <div key={index} className="form-box-volume">
            <div className='rectangle-label'>
        <img src={Rectangle} alt=''/>
          <div className="section-label">{t('commonShipping.packageInfo')}</div>
          </div>
          <div className="input-row">
  <div className="form-group">
    <label className='label-volume'> {t('commonShipping.packageNumber')}</label>
    <input
    className='input-volume'
      type="number"
      placeholder="عدد الطرود"
      value={form.quantity}
      onChange={(e) => handleChange(index, 'quantity', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className='label-volume'>  {t('commonShipping.packageWeight')} </label>
    <input
      className='input-volume'
      type="number"
      placeholder="وزن الطرود"
      value={form.actualWeight}
      onChange={(e) => handleChange(index, 'actualWeight', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className='label-volume only-label-total'>{t('commonShipping.totalActualWeightOfThePackage')}</label>
    <input
    className='input-volume'
      type="text"
      placeholder="إجمالي الوزن الفعلي للطرود"
      value={
        form.quantity && form.actualWeight
          ? (+form.quantity * +form.actualWeight).toFixed(2)
          : ''
      }
      readOnly
    />
  </div>
</div>

<div className="rectangle-label">
  <img src={Rectangle} alt='' />
  <div className="section-label">{t('commonShipping.enterThePackageDimensions')}</div>
</div>
<div className="input-row">
  <div className="form-group">
    <label className='label-volume'>{t('commonShipping.length')}</label>
    <input
      className='input-volume'
      type="number"
      placeholder={t('commonShipping.length')}
      value={form.length}
      onChange={(e) => handleChange(index, 'length', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className='label-volume'>{t('commonShipping.width')}</label>
    <input
        className='input-volume'
      type="number"
      placeholder="العرض"
      value={form.width}
      onChange={(e) => handleChange(index, 'width', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className='label-volume'>{t('commonShipping.height')}</label>
    <input
        className='input-volume'
      type="number"
      placeholder="الارتفاع"
      value={form.height}
      onChange={(e) => handleChange(index, 'height', e.target.value)}
    />
  </div>
</div>


          {form.result && (
            <div className="result-box">
              <strong>{form.result}</strong> <span className='span-volume'>{t('commonShipping.parcelSize')} <sup>3</sup></span>
            </div>
          )}
        </div>
      ))}

      {/* <button className="add-btn" onClick={addNewForm}> */}
       <div className="add-info-all-volume">
       <img src={AddImage} className='add-info'  alt='plusImage' onClick={addNewForm}/>
          <p onClick={addNewForm} className='text-add' style={{cursor:'pointer'}}>
          {t('commonShipping.addMoreInformation')}
       </p>
 </div>
      {/* </button> */}

      {/* Final Total Volume Summary */}
      {forms.length > 1 && (
  <div className="overall-result-box">
    {/* <img src={Right} alt="right-icon" className="result-icon-right" /> */}
    <div className='last-result' >
    <strong>{totalVolume}</strong><span className='key-last-result' >  {t('commonShipping.totalActualWeightOfThePackage')} <sup>3</sup></span>
    </div>
    <img src={Left} alt="left-icon" className="result-icon-left" />
  </div>
)}


    </div>
  );
};

export default VolumetricCalculator;
