# تكامل مع Django Models

## نظرة عامة

تم تحديث النظام المحلي ليتطابق تماماً مع Django Models الموجودة في الباك إند:
- `Origin` model (الدول)
- `Port` model (الموانئ)
- `CountryGroup` model (مجموعات الدول)

## هيكل البيانات المحدث

### Origin Model (الدول)
```javascript
{
  id: 1,
  lang: "ar", // أو "en"
  label: "Syrian Arab Republic",
  label_ar: "الجمهورية العربية السورية",
  ImageURL: "https://example.com/flag.svg",
  countries_code: "SY",
  countryGroups: [] // مصفوفة IDs لمجموعات الدول
}
```

### Port Model (الموانئ)
```javascript
{
  id: 1,
  countries_code: "SY",
  name: "Lattakia",
  name_arabic: "اللاذقية",
  port_code: "SYLTK"
}
```

## الملفات المحدثة

### 1. بيانات الدول والموانئ
**الملف**: `src/data/portsAndCountries.js`

**التغييرات**:
- تحديث هيكل البيانات ليتطابق مع Django Models
- إضافة `id` و `lang` و `countryGroups` للـ Origin
- تغيير `name_ar` إلى `name_arabic` للـ Port
- إضافة دوال مساعدة جديدة

**الدوال الجديدة**:
```javascript
// الحصول على Origin بواسطة countries_code
getOriginByCountryCode(countryCode, data)

// الحصول على Port بواسطة port_code
getPortByPortCode(portCode, data)

// الحصول على جميع Origins
getAllOrigins(data)

// الحصول على جميع Ports
getAllPorts(data)
```

### 2. أداة تحويل البيانات
**الملف**: `src/utils/apiDataConverter.js`

**الوظائف**:
- تحويل بيانات Django API إلى التنسيق المحلي
- مزامنة البيانات مع API
- التحقق من صحة البيانات
- إنشاء تقارير البيانات

**الدوال الرئيسية**:
```javascript
// تحويل Origin من API
convertOriginFromAPI(originData)

// تحويل Port من API
convertPortFromAPI(portData)

// تحويل مجموعة بيانات من API
convertAPIDataToLocal(apiData)

// مزامنة البيانات مع API
syncDataWithAPI(apiEndpoint, key)

// التحقق من صحة البيانات
validateData(data)

// إنشاء تقرير البيانات
generateDataReport(data)
```

### 3. مكون البحث المحلي
**الملف**: `src/components/LocalPortSearch/LocalPortSearch.jsx`

**التحديثات**:
- عرض الاسم العربي للموانئ (`name_arabic`)
- دعم الهيكل الجديد للبيانات
- تحسين عرض المعلومات

### 4. ملف الاختبار
**الملف**: `src/test/LocalSearchTest.js`

**الاختبارات الجديدة**:
- اختبار الدوال المساعدة
- اختبار تحويل بيانات API
- اختبار صحة البيانات
- اختبار تقارير البيانات

## كيفية الاستخدام

### 1. تحميل البيانات من API

```javascript
import { syncDataWithAPI } from '../utils/apiDataConverter';

// مزامنة البيانات مع API
const data = await syncDataWithAPI('/api/ports-countries/', 'portsData');
```

### 2. البحث عن دولة أو ميناء

```javascript
import { 
  getOriginByCountryCode, 
  getPortByPortCode,
  searchPortsAndCountries 
} from '../data/portsAndCountries';

// البحث عن دولة
const syria = getOriginByCountryCode('SY', formattedData);

// البحث عن ميناء
const lattakia = getPortByPortCode('SYLTK', formattedData);

// البحث النصي
const results = searchPortsAndCountries('سوريا', formattedData);
```

### 3. التحقق من صحة البيانات

```javascript
import { validateData, generateDataReport } from '../utils/apiDataConverter';

// التحقق من صحة البيانات
const isValid = validateData(COUNTRIES_AND_PORTS);

// إنشاء تقرير
const report = generateDataReport(COUNTRIES_AND_PORTS);
console.log(report);
```

## التكامل مع Django

### 1. API Endpoints المطلوبة

```python
# Django Views
class PortsCountriesView(APIView):
    def get(self, request):
        # إرجاع جميع الدول والموانئ
        origins = Origin.objects.all()
        ports = Port.objects.all()
        
        data = []
        for origin in origins:
            origin_ports = ports.filter(countries_code=origin.countries_code)
            data.append({
                'origin': {
                    'id': origin.id,
                    'lang': origin.lang,
                    'label': origin.label,
                    'label_ar': origin.label_ar,
                    'ImageURL': origin.ImageURL,
                    'countries_code': origin.countries_code,
                    'countryGroups': list(origin.countryGroups.values_list('id', flat=True))
                },
                'ports': [
                    {
                        'id': port.id,
                        'countries_code': port.countries_code,
                        'name': port.name,
                        'name_arabic': port.name_arabic,
                        'port_code': port.port_code
                    }
                    for port in origin_ports
                ]
            })
        
        return Response(data)
```

### 2. Serializers

```python
# Django Serializers
class OriginSerializer(serializers.ModelSerializer):
    countryGroups = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Origin
        fields = ['id', 'lang', 'label', 'label_ar', 'ImageURL', 'countries_code', 'countryGroups']

class PortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Port
        fields = ['id', 'countries_code', 'name', 'name_arabic', 'port_code']
```

## اختبار النظام

### 1. تشغيل الاختبارات

```javascript
// في وحدة التحكم
window.testLocalSearch.runAllTests();
```

### 2. اختبارات محددة

```javascript
// اختبار البيانات الأساسية
window.testLocalSearch.testBasicData();

// اختبار الدوال المساعدة
window.testLocalSearch.testHelperFunctions();

// اختبار تحويل API
window.testLocalSearch.testAPIDataConversion();
```

## المزايا الجديدة

### 1. **التوافق الكامل مع Django**
- نفس هيكل البيانات
- نفس أسماء الحقول
- دعم جميع العلاقات

### 2. **مرونة في التحديث**
- مزامنة تلقائية مع API
- تحديث البيانات المحلية
- نسخ احتياطية

### 3. **أدوات تطوير محسنة**
- اختبارات شاملة
- تقارير مفصلة
- أدوات تصحيح

### 4. **دعم متعدد اللغات**
- دعم العربية والإنجليزية
- تبديل سهل بين اللغات
- عرض محسن للنصوص

## التوصيات

### 1. **للانتقال التدريجي**
1. اختبار النظام الجديد في بيئة التطوير
2. مقارنة الأداء مع النظام الحالي
3. نشر تدريجي للمستخدمين

### 2. **للصيانة**
1. تحديث البيانات شهرياً
2. مراقبة الأداء
3. نسخ احتياطية دورية

### 3. **للتطوير**
1. استخدام أدوات الاختبار
2. مراجعة التقارير
3. تحسينات مستمرة

## الخلاصة

النظام المحدث يوفر:
- ✅ **توافق كامل** مع Django Models
- ✅ **مرونة عالية** في التحديث والمزامنة
- ✅ **أدوات تطوير** شاملة ومتقدمة
- ✅ **دعم متعدد اللغات** محسن
- ✅ **اختبارات شاملة** لضمان الجودة

النظام جاهز للاستخدام في الإنتاج مع ضمان التوافق الكامل مع الباك إند Django! 🚀
