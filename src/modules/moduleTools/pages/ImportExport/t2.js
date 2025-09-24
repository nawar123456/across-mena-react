import React, { useState } from 'react';
import './MainImpExp.css';

// import shipImage from '../../../../assets/images/shapeGPT.png';
import shipImage from '../../../../assets/images/CardExpImp.png';

import { ReactComponent as PlusIcon } from '../../../../assets/icons/add-bracket_svgrepo.com.svg';
import { ReactComponent as MinIcon } from '../../../../assets/icons/min-bracket_svgrepo.com (1).svg';
import CountryPortsPage from '../../../moduleServices/components/common/AutoCompleteText/CountryPortsAutocomplete';

const MainImpExp = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [showSeaForm, setShowSeaForm] = useState(false);

  const services = [
    { title: 'أضف شحن بحري', key: 'sea' },
    { title: 'أضف تخليص جمركي', key: 'custom' },
    { title: 'أضف شحن بري', key: 'land' },
  ];

  return (
    <div className="service-page" dir="rtl">
      <p className="title-main-exp-imp">تكاليف الاستيراد والتصدير</p>

     

      <div className="cards-container">
         <div className="top-buttons">
        <button
          className={`tab-button ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          استيراد
        </button>
        <button
          className={`tab-button ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          تصدير
        </button>
      </div>
        {services.map((service, idx) => (
          <div key={idx} className="service-card-with-form">
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">{service.title}</span>
              </div>

              {/* أيقونة ➕ أو ➖ حسب الحالة */}
              {service.key === 'sea' && showSeaForm ? (
                <MinIcon
                  className="plus-icon"
                  onClick={() => setShowSeaForm(false)}
                />
              ) : (
                <PlusIcon
                  className="plus-icon"
                  onClick={() => {
                    if (service.key === 'sea') setShowSeaForm(true);
                  }}
                />
              )}

              <div style={{ backgroundColor: 'white' }}>
                <img src={shipImage} alt="ship" className="ship-img" />
              </div>
            </div>

            {/* ✅ عرض كومبوننت الشحن البحري تحت الكرت */}
            {showSeaForm && service.key === 'sea' && (
              <div className="country-form-wrapper">
                <CountryPortsPage hideButtons={true}  />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainImpExp;
