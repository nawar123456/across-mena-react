import React, { useState } from 'react';
import './MainImpExp.css';

import shipImage from '../../../../assets/images/CardExpImp.png';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/add-bracket_svgrepo.com.svg';
import { ReactComponent as MinIcon } from '../../../../assets/icons/min-bracket_svgrepo.com (1).svg';
import CountryPortsPage from '../../../moduleServices/components/common/AutoCompleteText/CountryPortsAutocomplete';
import CardBookingSimple from '../../../moduleMain/components/CardBooking/CardBookingSimple';
import { useDispatch, useSelector } from 'react-redux';

const MainImpExp = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [isSeaFormExpanded, setIsSeaFormExpanded] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { portsObject } = useSelector((state) => state.moduleMain.homeSlice);

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
        {selectedTrip ? (
          <div className="selected-trip-card">
            <div className="selected-trip-header">
              <h3>شحن بحري</h3>
              <PlusIcon
                className="plus-icon-selected"
                onClick={() => setSelectedTrip(null)}
              />
            </div>

            <CardBookingSimple
              item={selectedTrip}
              portsObject={portsObject}
              image={<shipImage />}
              index={0}
              setCardsPrice={() => {}}
              isPreviewMode={true}
            />
          </div>
        ) : (
          <>
            <div className="service-card">
              <div className="service-info">
                <span className="service-title">{service.title}</span>
              </div>

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

            {isSeaFormExpanded && (
              <div className="country-form-wrapper">
                <CountryPortsPage
                  hideButtons={true}
                  onSelectTrip={handleSelectTrip}
                />
              </div>
            )}
          </>
        )}
      </>
    )}

    {/* ✅ الكروت الأخرى — نُظهر PlusIcon دائمًا */}
    {service.key !== 'sea' && (
      <div className="service-card">
        <div className="service-info">
          <span className="service-title">{service.title}</span>
        </div>

        {/* ✅ نُظهر PlusIcon دائمًا */}
        <PlusIcon
          className="plus-icon"
          style={{ cursor: 'default' }} // ✅ لا نريد مؤشر pointer
          onClick={(e) => e.preventDefault()} // ✅ لا نريد أي منطق عند النقر
        />

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