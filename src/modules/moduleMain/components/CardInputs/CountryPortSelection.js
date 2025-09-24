// CountryPortSelection.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortsByCountry } from '../../store/home/home.action';

const CountryPortSelection = () => {
  const dispatch = useDispatch();
  const [fromCountry, setFromCountry] = useState('SY'); // سوريا
  const [toCountry, setToCountry] = useState('TR'); // تركيا
  const [fromPort, setFromPort] = useState('');
  const [toPort, setToPort] = useState('');

  // جلب الموانئ من Redux
  const { portsByCountry, loadingPorts } = useSelector(state => state.homeSlice);

  // عندما يُغير المستخدم الدولة "من"
  const handleFromCountryChange = (e) => {
    const country = e.target.value;
    setFromCountry(country);
    setFromPort(''); // مسح الميناء
    if (country.length >= 2) {
      dispatch(fetchPortsByCountry(country)); // جلب الموانئ
    }
  };

  // عندما يُغير المستخدم الدولة "إلى"
  const handleToCountryChange = (e) => {
    setToCountry(e.target.value);
    setToPort('');
  };

  // اختيار ميناء من
  const handleFromPortSelect = (port) => {
    setFromPort(port.name);
  };

  // اختيار ميناء إلى
  const handleToPortSelect = (port) => {
    setToPort(port.name);
  };

  return (
    <div className="country-port-selection">
      {/* زر التصدير والاستيراد */}
      <div className="buttons">
        <button className="export-btn">تصدير</button>
        <button className="import-btn">استيراد</button>
      </div>

      {/* حقل "من" */}
      <div className="from-section">
        <label>من:</label>
        <select value={fromCountry} onChange={handleFromCountryChange}>
          <option value="SY">سوريا (اللاذقية)</option>
          <option value="TR">تركيا</option>
          <option value="IR">إيران</option>
        </select>
      </div>

      {/* حقل "إلى" */}
      <div className="to-section">
        <label>إلى:</label>
        <select value={toCountry} onChange={handleToCountryChange}>
          <option value="TR">تركيا</option>
          <option value="EG">مصر</option>
          <option value="JO">الأردن</option>
        </select>
      </div>

      {/* عرض الموانئ لـ "من" */}
      {loadingPorts ? (
        <p>جاري التحميل...</p>
      ) : fromCountry === 'SY' && portsByCountry.length > 0 ? (
        <div className="ports-list">
          <h4>اختر ميناء من:</h4>
          {portsByCountry.map((item) => (
            <div key={item.country.countries_code}>
              <ul>
                {item.ports.map((port) => (
                  <li key={port.port_code} onClick={() => handleFromPortSelect(port)}>
                    {port.name} ({port.port_code})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {/* عرض الموانئ لـ "إلى" */}
      {toCountry === 'TR' && (
        <div className="ports-list">
          <h4>اختر ميناء إلى:</h4>
          <ul>
            <li onClick={() => handleToPortSelect({ name: 'إسطنبول', port_code: 'IST' })}>
              إسطنبول (IST)
            </li>
            <li onClick={() => handleToPortSelect({ name: 'مرسين', port_code: 'MRS' })}>
              مرسين (MRS)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryPortSelection;