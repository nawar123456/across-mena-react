import React, { useState } from 'react';
import './MainImpExp.css';

import shipImage from '../../../../assets/images/CardExpImp.png';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/add-bracket_svgrepo.com.svg';
import { ReactComponent as MinIcon } from '../../../../assets/icons/min-bracket_svgrepo.com (1).svg';
import CountryPortsPage from '../../../moduleServices/components/common/AutoCompleteText/CountryPortsAutocomplete';

const MainImpExp = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [isSeaFormExpanded, setIsSeaFormExpanded] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const services = [
    { title: 'أضف شحن بحري', key: 'sea' },
    { title: 'أضف تخليص جمركي', key: 'custom' },
    { title: 'أضف شحن بري', key: 'land' },
  ];
  const handleSelectTrip = (trip) => {
    console.log("✅ [MainImpExp] تم استقبال الرحلة المختارة:", trip);
    setSelectedTrip(trip);
  };
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
            {/* ✅ كرت "شحن بحري" — يتغير محتواه حسب الحالة */}
            {service.key === 'sea' && (
              <>
                {/* إذا كانت رحلة مختارة — نعرضها */}
                {selectedTrip ? (
                  <div className="selected-trip-card">
                    <div className="selected-trip-header">
                      <MinIcon
                        className="plus-icon"
                        onClick={() => setSelectedTrip(null)}
                      />
                      <h3>شحن بحري</h3>
                    </div>

                    <div className="timeline-container">
                      <div className="port-info">
                        <span>{selectedTrip.from}</span>
                        <span>{selectedTrip.startDate}</span>
                      </div>

                      <div className="timeline-line">
                        <div className="dashed-line"></div>
                        <div className="ship-icon-container">
                          <img src="/path/to/ship-icon.svg" alt="ship" />
                        </div>
                      </div>

                      <div className="port-info">
                        <span>{selectedTrip.to}</span>
                        <span>{selectedTrip.endDate}</span>
                      </div>
                    </div>

                    <div className="price-info">
                      <span>{selectedTrip.price}</span>
                    </div>

                    <div className="days-info">
                      <span>{selectedTrip.days} يوم</span>
                    </div>
                  </div>
                ) : (
                  /* إذا لم تكن رحلة مختارة — نعرض الكارت الأصلي */
                  <>
                    <div className="service-card">
                      <div className="service-info">
                        <span className="service-title">{service.title}</span>
                      </div>

                      {/* أيقونة ➕ أو ➖ حسب الحالة */}
                      {isSeaFormExpanded ? (
                        <MinIcon
                          className="plus-icon"
                          onClick={() => setIsSeaFormExpanded(false)}
                        />
                      ) : (
                        <PlusIcon
                          className="plus-icon"
                          onClick={() => setIsSeaFormExpanded(true)}
                        />
                      )}

                      <div style={{ backgroundColor: 'white' }}>
                        <img src={shipImage} alt="ship" className="ship-img" />
                      </div>
                    </div>

                    {/* عرض CountryPortsPage */}
                    {isSeaFormExpanded && (
                      <div className="country-form-wrapper">
                        <CountryPortsPage
                          hideButtons={true}
                          onSelectTrip={handleSelectTrip} // ✅ نمرر الدالة
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* ✅ الكروت الأخرى — تبقى كما هي دائمًا */}
            {service.key !== 'sea' && (
              <div className="service-card">
                <div className="service-info">
                  <span className="service-title">{service.title}</span>
                </div>

                <div style={{ backgroundColor: 'white' }}>
                  <img src={shipImage} alt="ship" className="ship-img" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainImpExp;