import React, { useState } from 'react';
import './CubicMeterCalculator.css';
import Left from './../../../../assets/images/left Arrow.png'
import Right from './../../../../assets/images/right result.png'
import Rectangle from './../../../../assets/images/Rectangle 10330.png'
import AddImage from './../../../../assets/images/add-to-queue_svgrepo.com.png'

const CubicMeterCalculator = () => {
  const [forms, setForms] = useState([
    { quantity: 1, length: '', width: '', height: '', result: null }
  ]);

  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;

    const { length, width, height, quantity } = updatedForms[index];
    if (length && width && height && quantity) {
      const volume = (+length * +width * +height * +quantity) / 1000000; // Cubic meter formula
      updatedForms[index].result = volume.toFixed(3); // Store the result with 3 decimals
    } else {
      updatedForms[index].result = null;
    }

    setForms(updatedForms);
  };

  const handleIncrement = (index, field) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = updatedForms[index][field] + 1;
    setForms(updatedForms);
  };

  const handleDecrement = (index, field) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = updatedForms[index][field] - 1;
    setForms(updatedForms);
  };

  const addNewForm = () => {
    setForms([
      ...forms,
      { quantity: 1, length: '', width: '', height: '', result: null }
    ]);
  };

  const totalCubicMeters = forms.reduce((sum, form) => {
    return sum + (form.result ? parseFloat(form.result) : 0);
  }, 0).toFixed(3);

  return (
    <div className="calculator-container-cube">
      <h2 className="title-cube">حاسبة المتر المكعب</h2>
      <p className="subtitle-cube">
      استخدم حاسبة المتر المكعب واحسب حجم بضائعك لتتمكن من اختيار الحاوية أو الشاحنة المناسبة ومساعدتك  للتخطيط الكفؤ في ترتيب بضائعك داخل وسيلة النقل.      </p>

      {forms.map((form, index) => (
        <div key={index} className="form-box-cube">
          {/* Row for number of parcels */}
                  <div className='rectangle-label-cube'>
                  <img src={Rectangle} alt=''/>
                    <div className="section-label-cube">معلومات الطرد:</div>
                    </div>
          <div className="form-group-cube">
            <label>عدد الطرود</label>
            <div className="number-input-container-cube">
              {/* <img
                src={Left}
                alt="Decrease"
                className="arrow-button"
                onClick={() => handleDecrement(index, 'quantity')}
              /> */}
              <input
              className='input-cube'
              placeholder="عدد الطرود"
                type="number"
                value={form.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
              {/* <img
                src={Right}
                alt="Increase"
                className="arrow-button"
                onClick={() => handleIncrement(index, 'quantity')}
              /> */}
            </div>
          </div>

          {/* Row for length, width, and height */}
          <div className='rectangle-label-cube'>
                  <img src={Rectangle} alt=''/>
                    <div className="section-label-cube">ادخل ابعاد الطرد (  CM ) :</div>
                    </div>
          <div className="input-row-cube">
            <div className="form-group-cube">
              <label>الطول </label>
              <input
              className='input-cube'
                type="number"
                placeholder="الطول"
                value={form.length}
                onChange={(e) => handleChange(index, 'length', e.target.value)}
              />
            </div>

            <div className="form-group-cube">
              <label>العرض </label>
              <input
              className='input-cube'
                type="number"
                placeholder="العرض"
                value={form.width}
                onChange={(e) => handleChange(index, 'width', e.target.value)}
              />
            </div>

            <div className="form-group-cube">
              <label>الارتفاع </label>
              <input
              className='input-cube'
                type="number"
                placeholder="الارتفاع"
                value={form.height}
                onChange={(e) => handleChange(index, 'height', e.target.value)}
              />
            </div>
          </div>

          {form.result && (
            <div className="result-box-cube">
              <strong>{form.result}</strong> : حجم الطرود م<sup>3</sup>
            </div>
          )}
        </div>
      ))}

             <div className="add-info-all-cube">
             <img src={AddImage} className='add-info'  alt='plusImage' onClick={addNewForm}/>
             <p className='text-add'> اضف معلومات اخرى</p>
       </div>

       {forms.length > 1 && (
  <div className="overall-result-box">
    {/* <img src={Right} alt="right-icon" className="result-icon-right" /> */}
    <div style={{direction:'ltr'}} className='last-result'>
    <strong>{totalCubicMeters}</strong><span className='key-last-result' > : الحجم الإجمالي للطرود م<sup>3</sup></span>
    </div>
    <img src={Left} alt="left-icon" className="result-icon-left" />
  </div>
)}
    </div>
  );
};

export default CubicMeterCalculator;
