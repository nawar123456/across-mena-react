// CountryPortsPage.jsx
import React, { useRef, useState ,useEffect} from 'react';
import './CountryPortsPage.css';

// مكونات
import AutoCompleteText from '../../../../moduleServices/components/common/AutoCompleteText/AutoCompleteText';
import SelectBox from '../../../../moduleServices/components/common/SelectBox/SelectBox';
import PortSwiper from './PortSwiper';
import { fetchTripsBy } from '../../../../moduleMain/store/home/home.action';
// import CardBooking from '../../components/CardBooking/CardBooking';
import {ReactComponent as ContainerIcon} from '../../../../../assets/icons/container-icon.svg';

// أيقونات 
import {ReactComponent as MenaIcon} from '../../../../../assets/icons/Mena_Line.svg';
import  ContainerMoveImage from '../../../../../assets/icons/container-icon.svg';
import {ReactComponent as ContainerMove}  from '../../../../../assets/icons/container-icon.svg';
import {editPorts, editPortsTo, resetPortTo, resetPorts } from '../../../../moduleServices/store/seaTap/seaTap.slice';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortsByCountry } from '../../../../moduleMain/store/home/home.action';

// الترجمة
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";

const CountryPortsPage = (portsObjectSave) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // --- Refs ---
  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);
  const inputSearchFrom = useRef(null);
  const inputSearchTo = useRef(null);
const dropDownRefFrom = useRef(null);
const dropDownRefTo = useRef(null);
  // --- State ---
  const [queryFrom, setQueryFrom] = useState('');
  const [queryTo, setQueryTo] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
    const navigate = useNavigate();
const [localTrips, setLocalTrips] = useState([]);

  // --- الحالة الأولية (مثل CardInputs) ---
  const initialFormSea = {
    titleLoad: t('labelServices.loadingPort'),
    titleDisCharge: t('labelServices.dischargePort'),
    placeholderLoad: t('bookingTitles.placeholderPortFrom'),
    placeholderDischarge: t('bookingTitles.placeholderPortTo'),
    loadIcon: <MenaIcon />,
    dischargeIcon: <MenaIcon />,
  counter:// by index will know whitch object should change
        [{img:ContainerMoveImage,title:`${t('labelServices.container1')}`,titleForApi:'20ft',details:`${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`},

        {img:ContainerMoveImage,title:`${t('labelServices.container2')}`,titleForApi:'40ft', details:`${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`},
        // {img:ContainerMoveImage,title:'40feet_freeser', details:`${t('labelServices.maximumContainerLoad')} ${'29.480'}`, unit:`${'m'}`},
        {img:ContainerMoveImage,title:`${t('labelServices.container4')}`,titleForApi:'40HC',details:`${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`},
        ],
    selectFromPort: null,
    selectToPort: null,
    selectContainer: null,
  };

  const [formSeaObject, setFormSeaObject] = useState(initialFormSea);
    const FieldsObject = {
        fieldFromPort:'selectFromPort',
        fieldToPort:'selectToPort',
        fieldDate:'selectDate',
        fieldContainer:'selectContainer'
    }
  // --- من Redux ---
  const { portsByCountry, loadingPorts, errorPorts } = useSelector(
    (state) => state.moduleMain.homeSlice
  );
const formatPortsForDisplay = (portsData) => {
  const formatted = [];
  portsData.forEach(item => {
        console.log(item)

    const countryLabel = item.country?.label_ar || item.country?.label;
    const countryImage = item.country?.ImageURL;
    const countryCode = item.country?.countries_code;

    item.ports.forEach(port => {
      formatted.push({
        ...port,
        origin: {
          label: item.country.label,
          label_ar: item.country.label_ar,
          ImageURL: item.country.ImageURL,
          port_code: item.country.port_code,
        },
        // للبحث والفلترة
        country_name: countryLabel,
        country_name_ar: item.country.label_ar,
      });
    });
  });
  return formatted;
  
};
const formatCountriesOnly = (portsData) => {
  const formatted = [];
  portsData.forEach(item => {
    // نتأكد أن item.country موجود
    if (!item.country) return;

    formatted.push({
    origin: {
    label: item.country.label,
    label_ar: item.country.label_ar,
    ImageURL: item.country.ImageURL,
    countries_code: item.country.countries_code,
  },
  countries_code: item.country.countries_code,
  isCountry: true,
});
  });
  return formatted;
};


useEffect(() => {
  const from = formSeaObject.selectFromPort;
  const to = formSeaObject.selectToPort;
  const container = formSeaObject.selectContainer;

  if (from && to && container) {
    const params = {
      stationFrom: from.port_code,
      stationTo: to.port_code,
      containerType: container.titleForApi,
    };

    dispatch(fetchTripsBy(params)).then((res) => {
      if (res?.payload?.length > 0) {
        setLocalTrips(res.payload);
      } else {
        setLocalTrips([]);
      }
    });
  }
}, [formSeaObject.selectFromPort, formSeaObject.selectToPort, formSeaObject.selectContainer, dispatch]);

useEffect(() => {
  const handleClickOutside = (event) => {

    if ((inputRefFrom.current && inputRefFrom.current.contains(event.target)) || 
        (dropDownRefFrom.current && dropDownRefFrom.current.contains(event.target))) {

      if ((formSeaObject.selectToPort === null && !portsObjectSave?.selectToPort) || 
          (formSeaObject.selectToPort && formSeaObject.selectToPort?.origin && formSeaObject.selectToPort?.origin?.ports)) {
        setQueryTo("");
        inputSearchTo.current.value = "";
        dispatch(resetPortTo());
        setFormSeaObject((prev) => ({ ...prev, [FieldsObject.fieldToPort]: null }));
        return;
      }
    }
    else if ((inputRefTo.current && inputRefTo.current.contains(event.target)) || 
             (dropDownRefTo.current && dropDownRefTo.current.contains(event.target))) {

      if ((formSeaObject.selectFromPort === null && !portsObjectSave?.selectFromPort) || 
          (formSeaObject.selectFromPort && formSeaObject.selectFromPort?.origin && formSeaObject.selectFromPort?.origin?.ports)) {
        setQueryFrom("");
        inputSearchFrom.current.value = "";
        dispatch(resetPorts());
        setFormSeaObject((prev) => ({ ...prev, [FieldsObject.fieldFromPort]: null }));
        return;
      }
    } else {
      // النقر خارج كليهما → إغلاق القائمة
      // يمكنك هنا إضافة منطق لضبط الحالة إذا كنت تستخدم showDropdown
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [
  formSeaObject.selectFromPort,
  formSeaObject.selectToPort,
  portsObjectSave?.selectFromPort,
  portsObjectSave?.selectToPort
]);
// نُنشئ قائمة الدول فقط
const countriesOnly = Array.isArray(portsByCountry)
  ? formatCountriesOnly(portsByCountry)
  : [];
const formatSyrianPortsOnly = (portsData) => {
  const formatted = [];
  portsData.forEach(item => {
    console.log(item)
    const countryCode = item.country?.countries_code?.toUpperCase();
    if (countryCode === '(SY)') { // ✅ فقط سوريا
      item.ports.forEach(port => {
        formatted.push({
          ...port,
          origin: {
            label: item.country.label,
            label_ar: item.country.label_ar,
            ImageURL: item.country.ImageURL,
            countries_code: item.country.countries_code,
          }
        });
      });
    }
  });
  return formatted;
};
const displayOptions = Array.isArray(portsByCountry)
  ? formatPortsForDisplay(portsByCountry)
  : [];
  const syrianPorts = Array.isArray(portsByCountry)
  ? formatSyrianPortsOnly(portsByCountry)
  : [];
  // --- دالة اختيار القيمة (مطابقة تمامًا) ---
  const valueSelect = (field, value) => {
   if (field === 'selectFromPort') {
    // ابحث عن العنصر الكامل من portsByCountry
    const fullData = portsByCountry?.find(item =>
      item.country?.label === value.origin.label ||
      item.country?.label_ar === value.origin.label_ar
    );

    if (fullData) {
      setSelectedCountry(fullData); // ← هذا يحتوي .ports
      setFormSeaObject(prev => ({ ...prev, selectFromPort: value }));
    }
  }
    console.log(`Updating field: ${field} with value:`, value);

    setFormSeaObject((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'selectContainer' && value?.counter !== undefined) {
      console.log(`Saved to Redux -> Counter: ${value.counter}`);
    }

    if (field === 'selectFromPort') {
      const inputShow = value?.name || value?.origin?.label_ar || value?.origin?.label;
      if (inputSearchFrom.current) inputSearchFrom.current.value = inputShow;
    }

    if (field === 'selectToPort') {
      const inputShow = value?.name || value?.origin?.label_ar || value?.origin?.label;
      if (inputSearchTo.current) inputSearchTo.current.value = inputShow;
    }
  };

  // --- التعامل مع الكتابة ---
  const handleInputText = (field, value) => {
    if (field === 'selectFromPort') {
      setQueryFrom(value);
      if (value.length >= 2) {
        dispatch(fetchPortsByCountry(value));
      }
    } else if (field === 'selectToPort') {
      setQueryTo(value);
      if (value.length >= 2) {
        dispatch(fetchPortsByCountry(value));
      }
    }
  };
const handleClick = (e)=>{
    e.preventDefault();
    try{
    e.target.select();

    }
    catch(e){

    }
  }
  return (
    <div className="country-ports-page">
      {/* أزرار التصدير والاستيراد */}
      <div className="buttons-row">
        <button className="btn-export">تصدير</button>
        <button className="btn-import">استيراد</button>
      </div>

      {/* الحقول الثلاثة في نفس السطر */}
      <div className="inputs-row">
        {/* حقل "من" */}
        <div className="input-wrapper from-input">
          <AutoCompleteText
            recentValues={[]}
            placeholder={formSeaObject.placeholderLoad}
            Icon={formSeaObject.loadIcon}
            field={FieldsObject.fieldFromPort}
            options={countriesOnly}
            valueSelect={valueSelect}
            value={formSeaObject.selectFromPort}
            handleInputText={handleInputText}
            resetPorts={() => {}}
            isLoading={loadingPorts}
            loadingTimerSelected={false}
            loadingWriting={false}
            errorValue={false}
            errorApi={errorPorts}
            refInput={inputRefFrom}
            refSearch={inputSearchFrom}
            query={queryFrom}
            handleClickColor={handleClick}
            refDropDown={dropDownRefFrom}
  //           onOptionSelected={() => {
  //   // يمكنك إضافة منطق هنا إذا أردت
  // }}


          />
        </div>

        {/* حقل "إلى" */}
        <div className="input-wrapper to-input">
          <AutoCompleteText
            recentValues={[]}
  //           handleInputText={(field, value) => {
  //   setQueryTo(value); // يمكن البحث داخل قائمة موانئ سوريا
  // }}
  // onFocus={() => {
  //   // عند الضغط على الحقل، احمل موانئ سوريا إن لم تكن محملة
  //   const hasSyrian = portsByCountry.some(p => p.country?.countries_code === 'SY');
  //   if (!hasSyrian) {
  //     dispatch(fetchPortsByCountry("سوريا"));
  //   }
  // }}
            Icon={formSeaObject.dischargeIcon}
            placeholder={formSeaObject.placeholderDischarge}
            field="selectToPort"
            options={syrianPorts}
            valueSelect={valueSelect}
            value={formSeaObject.selectToPort}
            handleInputText={handleInputText}
            resetPorts={() => {}}
            isLoading={loadingPorts}
            loadingTimerSelected={false}
            loadingWriting={false}
            errorValue={false}
            errorApi={errorPorts}
            refInput={inputRefTo}
            refSearch={inputSearchTo}
            query={queryTo}
          />
        </div>

        {/* حقل "نوع الحاوية" - نفس البروبات تمامًا كما في CardInputs */}
        <div className="input-wrapper container-input">
          <SelectBox
            placeholder={t('labelServices.placeholderContainerType')}
            options={formSeaObject.counter}
            isSearch={false}
            value={
              formSeaObject.selectContainer ||
              null
            }
            field="selectContainer"
            valueSelect={valueSelect}
            isLoading={false}
            Icon={<ContainerMove />}
            title={t('labelServices.containerType')}
            isHideTitle={true}
            setFormSeaObject={setFormSeaObject}
            styleEdit={{ transform: 'translate(-5%, -50%)', display: 'block' }}
            errorValue={false}
            IconMobile={true}
          />
        </div>
      </div>

      {/* عرض النتيجة (اختياري) */}
      {selectedCountry && (
  <div className="port-swiper-wrapper">
<PortSwiper
  ports={selectedCountry.ports}
  onPortSelect={(port) => {
    // ✅ نحدث فقط قيمة الرحلات
    setFormSeaObject(prev => ({
      ...prev,
      selectFromPort: {
        ...port,
        origin: {
          ...port.origin,
          label: selectedCountry.country.label,
          label_ar: selectedCountry.country.label_ar,
          ImageURL: selectedCountry.country.ImageURL,
          countries_code: selectedCountry.country.countries_code,
        }
      }
    }));

    // ❌ لا نغلق السويبر
    // ✅ نُبقي الدولة ظاهرة في input بدون تعديل refSearch
  }}
/>

  </div>
)}

    </div>
  );
};

export default CountryPortsPage;