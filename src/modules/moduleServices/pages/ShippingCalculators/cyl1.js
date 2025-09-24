import React, { useState } from 'react';
import './CylinderVolumeCalculator.css';
import Left from './../../../../assets/images/left Arrow.png'
import Right from './../../../../assets/images/right result.png';
import Rectangle from './../../../../assets/images/Rectangle 10330.png';
import AddImage from './../../../../assets/images/add-to-queue_svgrepo.com.png';

const CylinderVolumeCalculator = () => {
  const [forms, setForms] = useState([
    { quantity: 1, radius: '', height: '', result: null }
  ]);

  // Function to handle input changes
  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;

    const { radius, height, quantity } = updatedForms[index];
    if (radius && height && quantity) {
      // Correct volume formula for cylinder (Volume = π * r^2 * h * quantity)
      const volume = Math.PI * Math.pow(+radius, 2) * +height * +quantity / 1000000; // Convert to cubic meters
      updatedForms[index].result = volume.toFixed(3); // Store the result with 3 decimal points
    } else {
      updatedForms[index].result = null;
    }

    setForms(updatedForms);
  };

  // Handle increment for quantity
  const handleIncrement = (index, field) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = updatedForms[index][field] + 1;
    setForms(updatedForms);
  };

  // Handle decrement for quantity
  const handleDecrement = (index, field) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = updatedForms[index][field] - 1;
    setForms(updatedForms);
  };

  // Add a new form for another parcel
  const addNewForm = () => {
    setForms([
      ...forms,
      { quantity: 1, radius: '', height: '', result: null }
    ]);
  };

  // Calculate the total cubic meters for all forms
  const totalCubicMeters = forms.reduce((sum, form) => {
    return sum + (form.result ? parseFloat(form.result) : 0);
  }, 0).toFixed(3);

  return (
    <div className="calculator-container-cube">
      <h2 className="title">حاسبة الطرود الاسطوانية</h2>
      <p className="subtitle-cube">
      استخدم حاسبة المتر المكعب واحسب حجم بضائعك لتتمكن من اختيار الحاوية أو الشاحنة المناسبة ومساعدتك  للتخطيط الكفؤ في ترتيب بضائعك داخل وسيلة النقل.      </p>

      {forms.map((form, index) => (
        <div key={index} className="form-box-cube">
          {/* Row for number of parcels */}
          <div className="rectangle-label-cylinder">
            <img src={Rectangle} alt="" />
            <div className="section-label-cube">معلومات الطرد:</div>
          </div>
          <div className="form-group-cube">
            <label>عدد الطرود</label>
            <div className="number-input-container-cube">
              <input
               placeholder='عدد الطرود'
               className='input-cylinder'
                type="number"
                value={form.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
            </div>
          </div>

          {/* Row for radius and height */}
          <div className="rectangle-label-cube">
            <img src={Rectangle} alt="" />
            <div className="section-label-cube">ادخل ابعاد الطرد (CM) :</div>
          </div>
          <div className="input-row-cube">
            <div className="form-group-cube">
              <label>نصف قطر القاعدة </label>
              <input
              className='input-cylinder'
                type="number"
                placeholder="نصف قطر القاعدة"
                value={form.radius}
                onChange={(e) => handleChange(index, 'radius', e.target.value)}
              />
            </div>

            <div className="form-group-cube">
              <label>الارتفاع </label>
              <input
              className='input-cylinder'
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

      <div className="add-info-all">
        <img
          src={AddImage}
          className="add-info"
          alt="plusImage"
          onClick={addNewForm}
        />
        <p className="text-add">اضف معلومات اخرى</p>
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

export default CylinderVolumeCalculator;
