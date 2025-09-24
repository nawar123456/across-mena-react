// CountryCitySelector.jsx
import React, { useState, useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';

const CustomClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#e0e0e0',
          color: '#666',
          fontSize: '14px',
          cursor: 'pointer',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        ×
      </div>
    </components.ClearIndicator>
  );
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const CountryCitySelector = ({ onSelection }) => {
  const [step, setStep] = useState('country'); // 'country' | 'city'
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null); // ✅ الحالة الجديدة

  const loadCountries = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/Sea_Shipping/countries-from`);
      const data = await res.json();
      return data.map(c => ({ value: c.id, label: c.name }));
    } catch (error) {
      console.error('❌ فشل تحميل الدول', error);
      return [];
    }
  }, []);

  const loadCities = useCallback(async () => {
    if (!selectedCountry) return [];
    try {
      const res = await fetch(
        `${BASE_URL}/Sea_Shipping/cities-from/?country_id=${selectedCountry.value}`
      );
      const data = await res.json();
      return data.map(c => ({ value: c.id, label: c.name }));
    } catch (error) {
      console.error('❌ فشل تحميل المدن', error);
      return [];
    }
  }, [selectedCountry]);

  const handleChange = (option) => {
    setSelectedValue(option); // ✅ تحديث القيمة دائمًا

    if (option === null) {
      // ✅ تم الضغط على "X"
      setStep('country');
      setSelectedCountry(null);
      onSelection?.(null);
      return;
    }

    if (step === 'country' && option) {
      setSelectedCountry(option);
      setStep('city');
      // لا نُرسل اختيارًا نهائيًا بعد
    } else if (step === 'city' && option) {
      onSelection?.({
        countryId: selectedCountry.value,
        countryName: selectedCountry.label,
        cityId: option.value,
        cityName: option.label,
      });
    }
  };

  const placeholder =
    step === 'country'
      ? 'اختر دولة...'
      : selectedCountry
      ? `اختر مدينة في ${selectedCountry.label}`
      : 'اختر مدينة...';

  const selectKey = step === 'country' ? 'country-select' : `city-select-${selectedCountry?.value}`;

  const customStyles = {
    container: (provided) => ({ ...provided, direction: 'rtl' }),
    control: (provided) => ({
      ...provided,
      textAlign: 'right',
      flexDirection: 'row-reverse',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      flexDirection: 'row-reverse',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '4px',
      cursor: 'pointer',
    }),
  };

  return (
    <AsyncSelect
      key={selectKey}
      value={selectedValue} // ✅ هذا هو السر!
      onChange={handleChange}
      cacheOptions
      defaultOptions
      loadOptions={step === 'country' ? loadCountries : loadCities}
      placeholder={placeholder}
      isClearable={!!selectedValue} // ✅ يظهر "X" فقط إذا كانت هناك قيمة
      components={{ ClearIndicator: CustomClearIndicator }}
      styles={customStyles}
    />
  );
};

export default CountryCitySelector;