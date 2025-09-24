import React, { useState } from 'react';
import './VolumetricCalculator.css';

const VolumetricWeightCalculator = () => {
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
    <div className="calculator-container">
      <h2 className="title">حاسبة الوزن الحجمي</h2>
      <p className="subtitle">
        استخدم حاسبة الوزن الحجمي لتجنب فرض رسوم شحن إضافية حيث يتأثر الشحن الجوي بحجم الطرود ووزنها الفعلي...
      </p>

      {forms.map((form, index) => (
        <div key={index} className="form-box">
          <div className="section-label">معلومات الطرد:</div>
          <div className="input-row">
            <div className="form-group">
              <input
                type="number"
                placeholder="عدد الطرود"
                value={form.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="وزن الطرود"
                value={form.actualWeight}
                onChange={(e) => handleChange(index, 'actualWeight', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
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

          <div className="section-label">ادخل أبعاد الطرد ( CM ):</div>
          <div className="input-row">
            <div className="form-group">
              <input
                type="number"
                placeholder="الطول"
                value={form.length}
                onChange={(e) => handleChange(index, 'length', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="العرض"
                value={form.width}
                onChange={(e) => handleChange(index, 'width', e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="الارتفاع"
                value={form.height}
                onChange={(e) => handleChange(index, 'height', e.target.value)}
              />
            </div>
          </div>

          {form.result && (
            <div className="result-box">
              <strong>{form.result}</strong> : حجم الطرود م<sup>3</sup>
            </div>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addNewForm}>
        أضف معلومات أخرى
      </button>

      {/* Final Total Volume Summary */}
      <div className="overall-result-box">
        <strong>{totalVolume}</strong> : الحجم الإجمالي للطرود م<sup>3</sup>
      </div>
    </div>
  );
};

export default VolumetricWeightCalculator;
