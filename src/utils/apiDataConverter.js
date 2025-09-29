// أداة تحويل البيانات من Django API إلى التنسيق المحلي
// متطابقة مع Django Models: Origin و Port

/**
 * تحويل بيانات Origin من Django إلى التنسيق المحلي
 * @param {Object} originData - بيانات Origin من Django API
 * @returns {Object} - بيانات Origin محسنة للبحث المحلي
 */
export const convertOriginFromAPI = (originData) => {
  return {
    id: originData.id,
    lang: originData.lang || 'ar',
    label: originData.label,
    label_ar: originData.label_ar,
    ImageURL: originData.ImageURL,
    countries_code: originData.countries_code,
    countryGroups: originData.countryGroups || []
  };
};

/**
 * تحويل بيانات Port من Django إلى التنسيق المحلي
 * @param {Object} portData - بيانات Port من Django API
 * @returns {Object} - بيانات Port محسنة للبحث المحلي
 */
export const convertPortFromAPI = (portData) => {
  return {
    id: portData.id,
    countries_code: portData.countries_code,
    name: portData.name,
    name_arabic: portData.name_arabic,
    port_code: portData.port_code
  };
};

/**
 * تحويل مجموعة بيانات من Django API إلى التنسيق المحلي
 * @param {Array} apiData - بيانات من Django API
 * @returns {Array} - بيانات محسنة للبحث المحلي
 */
export const convertAPIDataToLocal = (apiData) => {
  const convertedData = [];
  
  // تجميع البيانات حسب Origin
  const originsMap = new Map();
  
  apiData.forEach(item => {
    const originCode = item.countries_code;
    
    if (!originsMap.has(originCode)) {
      // إنشاء Origin جديد
      originsMap.set(originCode, {
        origin: {
          id: item.origin?.id || null,
          lang: item.origin?.lang || 'ar',
          label: item.origin?.label || '',
          label_ar: item.origin?.label_ar || '',
          ImageURL: item.origin?.ImageURL || '',
          countries_code: originCode,
          countryGroups: item.origin?.countryGroups || []
        },
        ports: []
      });
    }
    
    // إضافة Port إلى Origin
    if (item.name && item.port_code) {
      originsMap.get(originCode).ports.push({
        id: item.id || null,
        countries_code: originCode,
        name: item.name,
        name_arabic: item.name_arabic || '',
        port_code: item.port_code
      });
    }
  });
  
  // تحويل Map إلى Array
  originsMap.forEach((value) => {
    convertedData.push(value);
  });
  
  return convertedData;
};

/**
 * تحويل بيانات البحث من API إلى التنسيق المحلي
 * @param {Array} searchResults - نتائج البحث من API
 * @returns {Array} - نتائج محسنة للبحث المحلي
 */
export const convertSearchResultsFromAPI = (searchResults) => {
  return searchResults.map(item => {
    if (item.origin && item.origin.ports) {
      // هذا Origin (دولة)
      return {
        origin: convertOriginFromAPI(item.origin),
        countries_code: item.origin.countries_code,
        isCountry: true,
        name: item.origin.label_ar || item.origin.label,
        searchableText: `${item.origin.label} ${item.origin.label_ar} ${item.origin.countries_code}`
      };
    } else {
      // هذا Port (ميناء)
      return {
        ...convertPortFromAPI(item),
        origin: item.origin ? convertOriginFromAPI(item.origin) : null,
        country_name: item.origin?.label_ar || item.origin?.label || '',
        country_name_ar: item.origin?.label_ar || '',
        searchableText: `${item.name} ${item.name_arabic || ''} ${item.port_code} ${item.origin?.label_ar || ''} ${item.origin?.label || ''}`
      };
    }
  });
};

/**
 * دالة لتحميل البيانات من API وتحويلها للتنسيق المحلي
 * @param {string} apiEndpoint - رابط API
 * @returns {Promise<Array>} - بيانات محسنة للبحث المحلي
 */
export const loadDataFromAPI = async (apiEndpoint) => {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    
    // تحويل البيانات إلى التنسيق المحلي
    const convertedData = convertAPIDataToLocal(data);
    
    return convertedData;
  } catch (error) {
    console.error('خطأ في تحميل البيانات من API:', error);
    return [];
  }
};

/**
 * دالة لحفظ البيانات المحلية في localStorage
 * @param {Array} data - البيانات المحلية
 * @param {string} key - مفتاح التخزين
 */
export const saveLocalData = (data, key = 'portsData') => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`تم حفظ البيانات في localStorage بمفتاح: ${key}`);
  } catch (error) {
    console.error('خطأ في حفظ البيانات:', error);
  }
};

/**
 * دالة لتحميل البيانات المحلية من localStorage
 * @param {string} key - مفتاح التخزين
 * @returns {Array} - البيانات المحلية
 */
export const loadLocalData = (key = 'portsData') => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('خطأ في تحميل البيانات:', error);
    return [];
  }
};

/**
 * دالة لمزامنة البيانات مع API
 * @param {string} apiEndpoint - رابط API
 * @param {string} key - مفتاح التخزين المحلي
 * @returns {Promise<Array>} - البيانات المحدثة
 */
export const syncDataWithAPI = async (apiEndpoint, key = 'portsData') => {
  try {
    // تحميل البيانات من API
    const apiData = await loadDataFromAPI(apiEndpoint);
    
    if (apiData.length > 0) {
      // حفظ البيانات محلياً
      saveLocalData(apiData, key);
      console.log('تم مزامنة البيانات مع API بنجاح');
    }
    
    return apiData;
  } catch (error) {
    console.error('خطأ في مزامنة البيانات:', error);
    
    // محاولة تحميل البيانات المحلية كبديل
    const localData = loadLocalData(key);
    if (localData.length > 0) {
      console.log('تم تحميل البيانات المحلية كبديل');
      return localData;
    }
    
    return [];
  }
};

/**
 * دالة للتحقق من صحة البيانات
 * @param {Array} data - البيانات للتحقق منها
 * @returns {boolean} - صحة البيانات
 */
export const validateData = (data) => {
  if (!Array.isArray(data)) {
    console.error('البيانات يجب أن تكون مصفوفة');
    return false;
  }
  
  for (const item of data) {
    if (!item.origin || !item.ports) {
      console.error('عنصر البيانات غير صحيح:', item);
      return false;
    }
    
    if (!item.origin.countries_code || !item.origin.label) {
      console.error('بيانات Origin غير مكتملة:', item.origin);
      return false;
    }
    
    if (!Array.isArray(item.ports)) {
      console.error('الموانئ يجب أن تكون مصفوفة:', item.ports);
      return false;
    }
    
    for (const port of item.ports) {
      if (!port.name || !port.port_code) {
        console.error('بيانات Port غير مكتملة:', port);
        return false;
      }
    }
  }
  
  return true;
};

/**
 * دالة لإنشاء تقرير عن البيانات
 * @param {Array} data - البيانات
 * @returns {Object} - تقرير البيانات
 */
export const generateDataReport = (data) => {
  const report = {
    totalOrigins: 0,
    totalPorts: 0,
    countries: [],
    portsByCountry: {},
    lastUpdated: new Date().toISOString()
  };
  
  data.forEach(item => {
    report.totalOrigins++;
    report.countries.push({
      code: item.origin.countries_code,
      name: item.origin.label_ar || item.origin.label,
      portsCount: item.ports.length
    });
    
    report.portsByCountry[item.origin.countries_code] = item.ports.length;
    report.totalPorts += item.ports.length;
  });
  
  return report;
};
