// TripleCountryCitySelector.jsx
import React from 'react';
import CountryCitySelector from './CountryCitySelector'; // نفس الكومبوننت الذي أنشأناه

const TripleCountryCitySelector = ({
  onOrigin1Selection,   // المنشأ الأول (مثل: من دولة/مدينة)
  onOrigin2Selection,   // المنشأ الثاني (مثل: إلى دولة/مدينة)
  onDestinationSelection // الوجهة (دولة/مدينة)
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* السطر الأول: تنين سلكتورز جنب بعض */}
      <div style={{
        display: 'flex',
        gap: '16px',
        flexDirection: 'row-reverse', // لأننا RTL: العنصر الأول يظهر على اليمين
        width: '100%'
      }}>
        {/* السلكتور الأول (يمين) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <CountryCitySelector onSelection={onOrigin1Selection} />
        </div>

        {/* السلكتور الثاني (يسار) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <CountryCitySelector onSelection={onOrigin2Selection} />
        </div>
      </div>

      {/* السطر الثاني: سلكتور واحد كامل العرض */}
      <div style={{ width: '100%' }}>
        <CountryCitySelector onSelection={onDestinationSelection} />
      </div>
    </div>
  );
};

export default TripleCountryCitySelector;