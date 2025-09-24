// CountryPortsPage.jsx
import { Fragment, useEffect, useRef, useState } from 'react';
import './CountryPortsPage.css';

// مكونات
import AutoCompleteText from '../../../../moduleServices/components/common/AutoCompleteText/AutoCompleteText';
import SelectBox from '../../../../moduleServices/components/common/SelectBox/SelectBox';
import PortSwiper from './PortSwiper';
import { fetchTripsBy } from '../../../../moduleMain/store/home/home.action';
// import CardBooking from '../../components/CardBooking/CardBooking';
import {ReactComponent as ContainerIcon} from '../../../../../assets/icons/container-icon.svg';
import CardBooking from '../../../../moduleMain/components/CardBooking/CardBooking';

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
import CardBookingSimple from '../../../../moduleMain/components/CardBooking/CardBookingSimple';
import FormNoResults from '../../../../moduleMain/components/FormNoResults/FormNoResults';
import SkeletonCardPrice from '../../../../../components/Skeletons/SkeletonCardPrice';

const CountryPortsPage = ({ portsObjectSave, hideButtons, onSelectTrip }) => {  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
const [showDropdownFrom, setShowDropdownFrom] = useState(false);
const [showDropdownTo, setShowDropdownTo] = useState(false);
    const [cardsPrice,setCardsPrice] = useState([]);
   const {
        tripsArray,
        loadingTrip,
        portsObject,
    } = useSelector((state) => state.moduleMain.homeSlice);
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
const [visibleTripsCount, setVisibleTripsCount] = useState(0);

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
  console.log('📦 tripsArray updated:', tripsArray);
  console.log('🔍 Type:', typeof tripsArray);
  console.log('✅ Is Array:', Array.isArray(tripsArray));

  if (Array.isArray(tripsArray)) {
    const count = tripsArray.filter((item) => {
      const tripDate = new Date(item.date);
      const currentDate = new Date();
      const dayDifference = (tripDate - currentDate) / (1000 * 60 * 60 * 24);
      return dayDifference >= 2;
    }).length;

    setVisibleTripsCount(count);
  } else {
    setVisibleTripsCount(0);
  }
}, [tripsArray]);

    useEffect(()=>{

        setCardsPrice([]);

        if(tripsArray.length >0){

        setCardsPrice(tripsArray.map(item => ({ ...item, checkedOrigin: false, checkedDistanation: false })))

        }


      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[loadingTrip])

// بعد تعريف localTrips
useEffect(() => {
  console.log("💡 Checking for triggering fetchTripsBy: ", {
    from: formSeaObject.selectFromPort,
    to: formSeaObject.selectToPort,
    container: formSeaObject.selectContainer,
  });
  
  if (formSeaObject.selectFromPort && formSeaObject.selectToPort && formSeaObject.selectContainer) {
    const params = {
      stationFrom: formSeaObject.selectFromPort.port_code,
      stationTo: formSeaObject.selectToPort.port_code,
      containerType: formSeaObject.selectContainer.titleForApi,
    };
    console.log("🔎 Dispatching fetchTripsBy with params:", params);
    dispatch(fetchTripsBy(params))
      .then((res) => {
        console.log("✅ fetchTripsBy response:", res);
        if (res?.payload?.length > 0) {
          setLocalTrips(res.payload);
        } else {
          setLocalTrips([]);
        }
      })
      .catch((error) => {
        console.error("❗ fetchTripsBy error:", error);
        setLocalTrips([]);
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
  // ============================
  // حالة اختيار ميناء البداية (From Port)
  // ============================
  if (field === 'selectFromPort') {
    const fullData = portsByCountry?.find(item => {
      return (
        item.country?.label === value.origin.label ||
        item.country?.label_ar === value.origin.label_ar ||
        item.country?.ImageURL === value.origin.ImageURL
      );
    });

    if (fullData) {
      setSelectedCountry(fullData); // ✅ إظهار السويبر (إن وُجد)
    }

    // ✅ إظهار العلم + اسم الدولة في حقل الإدخال
    const countryLabel = i18n.language === 'ar' ? value.origin.label_ar : value.origin.label;
    const flagEmoji = value.origin.flag || ''; // 🇸🇾 — تأكد أن لديك حقل `flag` في البيانات
    const displayText = `${flagEmoji} ${countryLabel}`;

    if (inputSearchFrom.current) {
      inputSearchFrom.current.value = displayText;
    }

    // ✅ إغلاق القائمة وتفريغ البحث
    setQueryFrom("");
    setShowDropdownFrom(false);

    // ✅ حفظ القيمة الكاملة في formSeaObject
    setFormSeaObject(prev => ({
      ...prev,
      selectFromPort: value,
      selectedCountryFrom: fullData?.country || null, // ✅ حفظ بيانات الدولة أيضًا
    }));
  }

  // ============================
  // حالة اختيار ميناء الوصول (To Port)
  // ============================
if (field === 'selectToPort') {
  const fullData = portsByCountry?.find(item => {
    return (
      item.country?.label === value.origin.label ||
      item.country?.label_ar === value.origin.label_ar ||
      item.country?.ImageURL === value.origin.ImageURL
    );
  });

  // ✅ استخراج بيانات الميناء والدولة
  const portName = i18n.language === 'ar' ? value.name : value.name_en;
  const countryLabel = i18n.language === 'ar' ? value.origin.label_ar : value.origin.label;
  const flagEmoji = value.origin.flag || ''; // مثل: 🇸🇾

  // ✅ نص للعرض في الحقل: العلم + اسم الميناء + رمزه (إذا وُجد)
  const displayText = `${flagEmoji} ${portName} `;

  if (inputSearchTo.current) {
    inputSearchTo.current.value = displayText;
  }

  // ✅ إغلاق القائمة وتفريغ البحث
  setQueryTo("");
  setShowDropdownTo(false);

  // ✅ حفظ القيمة الكاملة في formSeaObject
  setFormSeaObject(prev => ({
    ...prev,
    selectToPort: value,
    selectedCountryTo: fullData?.country || null,
  }));
}

  // ============================
  // حالة اختيار الحاوية
  // ============================
  if (field === 'selectContainer') {
    console.log("📦 نوع الحاوية المختار:", value);

    setFormSeaObject(prev => ({
      ...prev,
      selectContainer: value,
    }));
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

useEffect(() => {
  console.log('🚚 الرحلات التي تم جلبها:', localTrips);
}, [localTrips]);

  return (
    <div className="country-ports-page">
      {/* أزرار التصدير والاستيراد */}
{!hideButtons && (
  <div className="buttons-row">
    <button className="btn-export">تصدير</button>
    <button className="btn-import">استيراد</button>
  </div>
)}

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
  {/* عرض النتيجة (اختياري) */}
      {/* عرض النتيجة (اختياري) */}
      {selectedCountry && (
        <div className="port-swiper-wrapper">
          <PortSwiper
            ports={selectedCountry.ports}
            onPortSelect={(port) => {
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
            }}
          />

          {/* ✅ عرض بطاقات الرحلات تحت السويبر */}
          <div className='home-card_parent'>
            {loadingTrip && tripsArray?.length === 0 ? (
              <SkeletonCardPrice />
            ) : tripsArray?.length > 0 && visibleTripsCount > 0 ? (
              cardsPrice?.map((item, index) => (
                <Fragment key={index}>
                  <CardBookingSimple
                    item={item}
                    portsObject={portsObject}
                    setCardsPrice={setCardsPrice}
                    index={index}
                     onSelect={onSelectTrip} // ✅ نمرر onSelect إلى CardBookingSimple
                    image={<ContainerIcon />}
                  />
                </Fragment>
              ))
            ) : (
              <FormNoResults />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPortsPage;
