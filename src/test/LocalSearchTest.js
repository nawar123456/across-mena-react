// ملف اختبار بسيط للنظام الجديد
import { 
  COUNTRIES_AND_PORTS, 
  formatPortsForSearch, 
  searchPortsAndCountries,
  getOriginByCountryCode,
  getPortByPortCode,
  getAllOrigins,
  getAllPorts
} from '../data/portsAndCountries';
import { PerformanceComparison, measurePerformance, simulateApiCall, simulateLocalSearch } from '../utils/performanceComparison';
import { convertAPIDataToLocal, validateData, generateDataReport } from '../utils/apiDataConverter';

// اختبار البيانات الأساسية
export const testBasicData = () => {
  console.log('🧪 اختبار البيانات الأساسية');
  
  console.log('عدد الدول:', COUNTRIES_AND_PORTS.length);
  console.log('الدول المتاحة:', COUNTRIES_AND_PORTS.map(c => c.origin.label_ar || c.origin.label));
  
  const formattedData = formatPortsForSearch(COUNTRIES_AND_PORTS);
  console.log('إجمالي العناصر بعد التنسيق:', formattedData.length);
  
  // اختبار صحة البيانات
  const isValid = validateData(COUNTRIES_AND_PORTS);
  console.log('صحة البيانات:', isValid);
  
  // تقرير البيانات
  const report = generateDataReport(COUNTRIES_AND_PORTS);
  console.log('تقرير البيانات:', report);
  
  return {
    countriesCount: COUNTRIES_AND_PORTS.length,
    totalItems: formattedData.length,
    isValid,
    report,
    success: true
  };
};

// اختبار البحث المحلي
export const testLocalSearch = () => {
  console.log('🔍 اختبار البحث المحلي');
  
  const formattedData = formatPortsForSearch(COUNTRIES_AND_PORTS);
  const testQueries = ['سوريا', 'تركيا', 'دبي', 'اللاذقية', 'Lattakia'];
  
  const results = testQueries.map(query => {
    const searchResults = searchPortsAndCountries(query, formattedData);
    console.log(`البحث عن "${query}": ${searchResults.length} نتيجة`);
    return {
      query,
      resultsCount: searchResults.length,
      results: searchResults.slice(0, 3) // أول 3 نتائج فقط
    };
  });
  
  return {
    testQueries,
    results,
    success: true
  };
};

// اختبار الأداء
export const testPerformance = async () => {
  console.log('⚡ اختبار الأداء');
  
  const performance = new PerformanceComparison();
  const formattedData = formatPortsForSearch(COUNTRIES_AND_PORTS);
  const testQuery = 'سوريا';
  
  // اختبار البحث المحلي
  const localResult = await measurePerformance(
    () => simulateLocalSearch(testQuery, formattedData),
    'LOCAL',
    testQuery,
    0
  );
  
  performance.recordLocalSearch(testQuery, localResult.duration, localResult.resultsCount);
  
  // اختبار API (محاكاة)
  const apiResult = await measurePerformance(
    () => simulateApiCall(testQuery, 300), // محاكاة تأخير 300ms
    'API',
    testQuery,
    0
  );
  
  performance.recordApiCall(testQuery, apiResult.duration, apiResult.resultsCount);
  
  const stats = performance.getPerformanceStats();
  const report = performance.generateReport();
  
  console.log('📊 إحصائيات الأداء:', stats);
  console.log('📋 التقرير:', report);
  
  return {
    localResult,
    apiResult,
    stats,
    report,
    success: true
  };
};

// اختبار الدوال المساعدة الجديدة
export const testHelperFunctions = () => {
  console.log('🔧 اختبار الدوال المساعدة');
  
  const formattedData = formatPortsForSearch(COUNTRIES_AND_PORTS);
  
  // اختبار getOriginByCountryCode
  const syriaOrigin = getOriginByCountryCode('SY', formattedData);
  console.log('Origin سوريا:', syriaOrigin);
  
  // اختبار getPortByPortCode
  const lattakiaPort = getPortByPortCode('SYLTK', formattedData);
  console.log('ميناء اللاذقية:', lattakiaPort);
  
  // اختبار getAllOrigins
  const allOrigins = getAllOrigins(formattedData);
  console.log('جميع الدول:', allOrigins.length);
  
  // اختبار getAllPorts
  const allPorts = getAllPorts(formattedData);
  console.log('جميع الموانئ:', allPorts.length);
  
  return {
    syriaOrigin: !!syriaOrigin,
    lattakiaPort: !!lattakiaPort,
    originsCount: allOrigins.length,
    portsCount: allPorts.length,
    success: true
  };
};

// اختبار تحويل البيانات من API
export const testAPIDataConversion = () => {
  console.log('🔄 اختبار تحويل بيانات API');
  
  // محاكاة بيانات API
  const mockAPIData = [
    {
      id: 1,
      countries_code: 'SY',
      name: 'Lattakia',
      name_arabic: 'اللاذقية',
      port_code: 'SYLTK',
      origin: {
        id: 1,
        lang: 'ar',
        label: 'Syrian Arab Republic',
        label_ar: 'الجمهورية العربية السورية',
        ImageURL: 'https://example.com/syria.svg',
        countries_code: 'SY',
        countryGroups: []
      }
    }
  ];
  
  const convertedData = convertAPIDataToLocal(mockAPIData);
  console.log('البيانات المحولة:', convertedData);
  
  const isValid = validateData(convertedData);
  console.log('صحة البيانات المحولة:', isValid);
  
  return {
    convertedData,
    isValid,
    success: true
  };
};

// اختبار شامل
export const runAllTests = async () => {
  console.log('🚀 بدء الاختبارات الشاملة');
  
  try {
    const basicTest = testBasicData();
    const searchTest = testLocalSearch();
    const helperTest = testHelperFunctions();
    const conversionTest = testAPIDataConversion();
    const performanceTest = await testPerformance();
    
    const allTestsPassed = basicTest.success && 
                          searchTest.success && 
                          helperTest.success && 
                          conversionTest.success && 
                          performanceTest.success;
    
    console.log('✅ جميع الاختبارات مكتملة:', allTestsPassed);
    
    return {
      basicTest,
      searchTest,
      helperTest,
      conversionTest,
      performanceTest,
      allTestsPassed,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ خطأ في الاختبارات:', error);
    return {
      error: error.message,
      success: false,
      timestamp: new Date().toISOString()
    };
  }
};

// دالة مساعدة لتشغيل الاختبارات من وحدة التحكم
if (typeof window !== 'undefined') {
  window.testLocalSearch = {
    testBasicData,
    testLocalSearch,
    testHelperFunctions,
    testAPIDataConversion,
    testPerformance,
    runAllTests
  };
  
  console.log('🔧 تم تحميل أدوات الاختبار. استخدم:');
  console.log('- window.testLocalSearch.runAllTests() لتشغيل جميع الاختبارات');
  console.log('- window.testLocalSearch.testBasicData() لاختبار البيانات');
  console.log('- window.testLocalSearch.testLocalSearch() لاختبار البحث');
  console.log('- window.testLocalSearch.testHelperFunctions() لاختبار الدوال المساعدة');
  console.log('- window.testLocalSearch.testAPIDataConversion() لاختبار تحويل API');
  console.log('- window.testLocalSearch.testPerformance() لاختبار الأداء');
}
