import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

// المكونات المحلية
import LocalPortSearch from "../../../../components/LocalPortSearch/LocalPortSearch";
import SelectBox from "../../../moduleServices/components/common/SelectBox/SelectBox";

// الأيقونات
import { ReactComponent as MenaIcon } from '../../../../assets/icons/Mena_Line.svg';
import { ReactComponent as ContainerMove } from '../../../../assets/icons/container-icon.svg';
import ContainerMoveImage from '../../../../assets/icons/container-icon.svg';

// Redux Actions
import { fetchTripsBy } from '../../store/home/home.action';
import { addPortsObject, savePortsObject, addBookingObject } from "../../store/home/home.slice";

// البيانات المحلية
import { COUNTRIES_AND_PORTS, formatPortsForSearch } from '../../../../data/portsAndCountries';

import './CardInputs.css';

const CardInputsOptimized = ({ portsObjectSave }) => {
  const [hasError, setHasError] = useState(false);
  const [recentPortsFrom, setRecentPortsFrom] = useState([]);
  const [recentPortsTo, setRecentPortsTo] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const { loadingForm } = useSelector((state) => state.moduleMain.homeSlice);

  // تحضير البيانات المحلية مرة واحدة فقط
  const localPortsData = useMemo(() => {
    return formatPortsForSearch(COUNTRIES_AND_PORTS);
  }, []);

  const FieldsObject = {
    fieldFromPort: 'selectFromPort',
    fieldToPort: 'selectToPort',
    fieldDate: 'selectDate',
    fieldContainer: 'selectContainer'
  };

  // تحضير البيانات الأولية للنموذج
  const initialFormSea = useMemo(() => ({
    titleLoad: t('labelServices.loadingPort'),
    titleDisCharge: t('labelServices.dischargePort'),
    placeholderLoad: t('bookingTitles.placeholderPortFrom'),
    placeholderDischarge: t('bookingTitles.placeholderPortTo'),
    loadIcon: <MenaIcon />,
    dischargeIcon: <MenaIcon />,
    counter: [
      {
        img: ContainerMoveImage,
        title: `${t('labelServices.container1')}`,
        titleForApi: '20ft',
        details: `${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`
      },
      {
        img: ContainerMoveImage,
        title: `${t('labelServices.container2')}`,
        titleForApi: '40ft',
        details: `${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`
      },
      {
        img: ContainerMoveImage,
        title: `${t('labelServices.container4')}`,
        titleForApi: '40HC',
        details: `${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`
      }
    ],
    selectFromPort: null,
    selectToPort: null,
    selectContainer: null
  }), [i18n.language, t]);

  const [formSeaObject, setFormSeaObject] = useState(initialFormSea);

  // تحميل الاختيارات الأخيرة من localStorage
  useEffect(() => {
    const storedRecentPortsFrom = JSON.parse(localStorage.getItem('recentPortsFrom')) || [];
    const storedRecentPortsTo = JSON.parse(localStorage.getItem('recentPortsTo')) || [];
    setRecentPortsFrom(storedRecentPortsFrom);
    setRecentPortsTo(storedRecentPortsTo);
  }, []);

  // تحديث الاختيارات الأخيرة
  const updateRecentPorts = useCallback((field, selectedValue) => {
    if (field === FieldsObject.fieldFromPort) {
      setRecentPortsFrom((prev) => {
        const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
        localStorage.setItem('recentPortsFrom', JSON.stringify(updated.slice(0, 10)));
        return updated.slice(0, 10);
      });
    } else if (field === FieldsObject.fieldToPort) {
      setRecentPortsTo((prev) => {
        const updated = [selectedValue, ...prev.filter((item) => item.name !== selectedValue.name)];
        localStorage.setItem('recentPortsTo', JSON.stringify(updated.slice(0, 10)));
        return updated.slice(0, 10);
      });
    }
  }, [FieldsObject.fieldFromPort, FieldsObject.fieldToPort]);

  // معالجة اختيار القيم
  const valueSelect = useCallback((field, value) => {
    console.log(`Updating field: ${field} with value:`, value);

    updateRecentPorts(field, value);

    setFormSeaObject((prev) => ({
      ...prev,
      [field]: value
    }));

    // معالجة خاصة للموانئ
    if (field === FieldsObject.fieldFromPort || field === FieldsObject.fieldToPort) {
      let inputShow = "";
      if (value?.name) {
        inputShow = `${value?.name}`;
      } else {
        inputShow = `${value?.origin?.label || value?.origin?.label_ar}`;
      }

      // إذا كان اختيار دولة، نحتاج لتحميل موانئها
      if (value && value?.origin && value?.origin?.ports) {
        // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
        console.log('Selected country with ports:', value.origin.ports);
      }
    }
  }, [FieldsObject.fieldFromPort, FieldsObject.fieldToPort, updateRecentPorts]);

  // تحديث النموذج عند تغيير اللغة
  useEffect(() => {
    setFormSeaObject((prev) => ({
      ...prev,
      titleLoad: t('labelServices.loadingPort'),
      titleDisCharge: t('labelServices.dischargePort'),
      placeholderLoad: t('bookingTitles.placeholderPortFrom'),
      placeholderDischarge: t('bookingTitles.placeholderPortTo'),
      counter: [
        {
          img: ContainerMoveImage,
          title: `${t('labelServices.container1')}`,
          titleForApi: '20ft',
          details: `${t('labelServices.maximumContainerLoad')} ${'28.300kg & 33m'}`,
        },
        {
          img: ContainerMoveImage,
          title: `${t('labelServices.container2')}`,
          titleForApi: '40ft',
          details: `${t('labelServices.maximumContainerLoad')} ${'28.800kg & 55m'}`,
        },
        {
          img: ContainerMoveImage,
          title: `${t('labelServices.container4')}`,
          titleForApi: '40HC',
          details: `${t('labelServices.maximumContainerLoad')} ${'28.690kg & 76m'}`,
        },
      ],
      selectFromPort: prev.selectFromPort,
      selectToPort: prev.selectToPort,
      selectContainer: prev.selectContainer,
    }));
  }, [i18n.language, t]);

  // معالجة البحث
  const handleResults = useCallback(() => {
    // التحقق من صحة البيانات
    const isFromPortEmpty = !(formSeaObject.selectFromPort || portsObjectSave?.selectFromPort);
    const isToPortEmpty = !(formSeaObject.selectToPort || portsObjectSave?.selectToPort);
    const isContainerTypeEmpty = !(formSeaObject.selectContainer || portsObjectSave?.selectContainer);

    if (isFromPortEmpty || isToPortEmpty || isContainerTypeEmpty) {
      setHasError(true);
      return;
    }

    setHasError(false);

    // التحقق من الأخطاء
    let errorObject = {};

    if (formSeaObject?.selectContainer === null || formSeaObject?.selectContainer === undefined) {
      if (portsObjectSave?.selectContainer === null || portsObjectSave?.selectContainer === undefined) {
        errorObject.selectContainer = "الحقل مطلوب";
      }
    }

    if (formSeaObject?.selectFromPort === null || formSeaObject?.selectFromPort === undefined) {
      if (portsObjectSave?.selectFromPort === null || portsObjectSave?.selectFromPort === undefined) {
        errorObject.selectFromPort = "الحقل مطلوب";
      }
    }

    if (formSeaObject?.selectToPort === null || formSeaObject?.selectToPort === undefined) {
      if (portsObjectSave?.selectToPort === null || portsObjectSave?.selectToPort === undefined) {
        errorObject.selectToPort = "الحقل مطلوب";
      }
    }

    setFormErrors(errorObject);

    if (Object.keys(errorObject).length > 0) {
      return;
    }

    // حفظ البيانات في Redux
    dispatch(addPortsObject({
      portFrom: formSeaObject.selectFromPort?.name || portsObjectSave.selectFromPort?.name,
      portTo: formSeaObject.selectToPort?.name || portsObjectSave.selectToPort?.name,
      selectContainer: formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi,
    }));

    // إعداد معاملات البحث
    let params = {
      stationFrom: formSeaObject.selectFromPort?.port_code || portsObjectSave.selectFromPort?.port_code,
      stationTo: formSeaObject.selectToPort?.port_code || portsObjectSave.selectToPort?.port_code,
      containerType: formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi,
    };

    // البحث عن الرحلات
    dispatch(fetchTripsBy(params));

    // التنقل إلى صفحة النتائج
    if (location.pathname !== "/results-book") {
      navigate('/results-book');
    }

    // حفظ البيانات للصفحات الأخرى
    if (location.pathname.substring(location.pathname.lastIndexOf('/')) !== "/results-book") {
      dispatch(savePortsObject({
        selectFromPort: formSeaObject.selectFromPort,
        selectToPort: formSeaObject.selectToPort,
        selectContainer: formSeaObject.selectContainer || portsObjectSave.selectContainer,
      }));

      dispatch(addBookingObject({
        portFrom: formSeaObject.selectFromPort?.name || portsObjectSave.selectFromPort?.name,
        portTo: formSeaObject.selectToPort?.name || portsObjectSave.selectToPort?.name,
        container: formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi,
      }));

      navigate('results-book');
    } else if (location.pathname.substring(location.pathname.lastIndexOf('/')) === "/results-book") {
      dispatch(savePortsObject({
        selectFromPort: formSeaObject.selectFromPort || portsObjectSave.selectFromPort,
        selectToPort: formSeaObject.selectToPort || portsObjectSave.selectToPort,
        selectContainer: portsObjectSave?.selectContainer || formSeaObject.selectContainer,
      }));

      dispatch(addBookingObject({
        portFrom: formSeaObject.selectFromPort?.name || portsObjectSave.selectFromPort?.name,
        portTo: formSeaObject.selectToPort?.name || portsObjectSave.selectToPort?.name,
        container: formSeaObject.selectContainer?.titleForApi || portsObjectSave.selectContainer?.titleForApi,
      }));
    }
  }, [formSeaObject, portsObjectSave, dispatch, navigate, location.pathname]);

  const styleEdit = {
    transform: 'translate(-5%, -50%)',
    display: 'block',
  };

  return (
    <div className="card-section">
      <div className='card-inputs'>
        {/* ميناء المغادرة */}
        <LocalPortSearch
          placeholder={formSeaObject.placeholderLoad}
          Icon={formSeaObject.loadIcon}
          field={FieldsObject.fieldFromPort}
          onSelect={valueSelect}
          selectedValue={formSeaObject.selectFromPort || portsObjectSave?.selectFromPort}
          recentValues={recentPortsFrom}
          errorValue={formErrors?.selectFromPort}
        />

        {/* ميناء الوصول */}
        <LocalPortSearch
          placeholder={formSeaObject.placeholderDischarge}
          Icon={formSeaObject.dischargeIcon}
          field={FieldsObject.fieldToPort}
          onSelect={valueSelect}
          selectedValue={formSeaObject.selectToPort || portsObjectSave?.selectToPort}
          recentValues={recentPortsTo}
          errorValue={formErrors?.selectToPort}
        />

        {/* نوع الحاوية */}
        <div className="card-inputs__selected">
          <SelectBox
            placeholder={t('labelServices.placeholderContainerType')}
            options={formSeaObject.counter}
            isSearch={false}
            value={portsObjectSave?.selectContainer || formSeaObject.selectContainer || null}
            field={FieldsObject.fieldContainer}
            valueSelect={valueSelect}
            isLoading={false}
            Icon={<ContainerMove />}
            title={t('labelServices.containerType')}
            isHideTitle={true}
            setFormSeaObject={setFormSeaObject}
            styleEdit={styleEdit}
            errorValue={formErrors?.selectContainer}
            IconMobile={true}
          />
        </div>
      </div>

      {/* زر البحث */}
      <div className='home-btn'>
        <button 
          disabled={loadingForm} 
          className='btn-main' 
          onClick={handleResults}
        >
          {t('actions.searchBtn')}
          <span className={`${loadingForm && 'btn-ring'}`}></span>
        </button>
      </div>
    </div>
  );
};

export default CardInputsOptimized;
