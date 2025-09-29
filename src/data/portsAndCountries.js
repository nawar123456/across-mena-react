// بيانات الدول والموانئ الثابتة - محسنة للأداء
// متطابقة مع Django Models: Origin و Port
import localSyriaFlag from '../assets/icons/flag-Syria-01.svg';

export const COUNTRIES_AND_PORTS = [
        {
          origin: {
            id: 1,
            lang: "ar",
            label: "Syrian Arab Republic",
            label_ar: "الجمهورية العربية السورية",
            ImageURL: localSyriaFlag,
            countries_code: "SY",
            countryGroups: [] // يمكن إضافة CountryGroup IDs هنا
          },
    ports: [
      { 
        id: 1,
        countries_code: "SY",
        name: "Lattakia", 
        name_arabic: "اللاذقية", 
        port_code: "SYLTK" 
      },
      { 
        id: 2,
        countries_code: "SY",
        name: "Tartus", 
        name_arabic: "طرطوس", 
        port_code: "SYTTS" 
      }
    ]
  },
  {
    origin: {
      id: 2,
      lang: "ar",
      label: "Turkey",
      label_ar: "تركيا",
      ImageURL: "https://www.svgrepo.com/show/405650/flag-for-flag-turkey.svg",
      countries_code: "TR",
      countryGroups: []
    },
    ports: [
      { 
        id: 3,
        countries_code: "TR",
        name: "Istanbul", 
        name_arabic: "إسطنبول", 
        port_code: "TRIST" 
      },
      { 
        id: 4,
        countries_code: "TR",
        name: "Mersin", 
        name_arabic: "مرسين", 
        port_code: "TRMER" 
      },
      { 
        id: 5,
        countries_code: "TR",
        name: "Izmir", 
        name_arabic: "إزمير", 
        port_code: "TRIZM" 
      },
      { 
        id: 94,
        countries_code: "TR",
        name: "Ambarli", 
        name_arabic: "أمبارلي", 
        port_code: "TRAMR" 
      },
      { 
        id: 95,
        countries_code: "TR",
        name: "Antalya", 
        name_arabic: "أنطاليا", 
        port_code: "TRAYT" 
      },
      { 
        id: 96,
        countries_code: "TR",
        name: "Bandirma", 
        name_arabic: "بانديرما", 
        port_code: "TRBDM" 
      },
      { 
        id: 97,
        countries_code: "TR",
        name: "Iskenderun", 
        name_arabic: "إسكندرون", 
        port_code: "TRISK" 
      },
      { 
        id: 98,
        countries_code: "TR",
        name: "Samsun", 
        name_arabic: "سامسون", 
        port_code: "TRSSX" 
      },
      { 
        id: 99,
        countries_code: "TR",
        name: "Trabzon", 
        name_arabic: "طرابزون", 
        port_code: "TRTZX" 
      }
    ]
  },
  {
    origin: {
      id: 3,
      lang: "ar",
      label: "United Arab Emirates",
      label_ar: "دولة الإمارات العربية المتحدة",
      ImageURL: "https://www.svgrepo.com/show/405642/flag-for-flag-united-arab-emirates.svg",
      countries_code: "AE",
      countryGroups: []
    },
    ports: [
      { 
        id: 6,
        countries_code: "AE",
        name: "Jebel Ali", 
        name_arabic: "جبل علي", 
        port_code: "AEJEA" 
      },
      { 
        id: 7,
        countries_code: "AE",
        name: "Dubai", 
        name_arabic: "دبي", 
        port_code: "AEDXB" 
      },
      { 
        id: 8,
        countries_code: "AE",
        name: "Abu Dhabi", 
        name_arabic: "أبو ظبي", 
        port_code: "AEAUH" 
      },
      { 
        id: 100,
        countries_code: "AE",
        name: "Khor Fakkan", 
        name_arabic: "خورفكان", 
        port_code: "AEKLF" 
      },
      { 
        id: 101,
        countries_code: "AE",
        name: "Sharjah", 
        name_arabic: "الشارقة", 
        port_code: "AESHJ" 
      },
      { 
        id: 102,
        countries_code: "AE",
        name: "Ras Al Khaima", 
        name_arabic: "رأس الخيمة", 
        port_code: "AERKT" 
      },
      { 
        id: 103,
        countries_code: "AE",
        name: "Ajman", 
        name_arabic: "عجمان", 
        port_code: "AEAJM" 
      }
    ]
  },
  {
    origin: {
      id: 4,
      lang: "ar",
      label: "China",
      label_ar: "الصين",
      ImageURL: "https://www.svgrepo.com/show/405448/flag-for-flag-china.svg",
      countries_code: "CN",
      countryGroups: []
    },
    ports: [
      { 
        id: 9,
        countries_code: "CN",
        name: "Shanghai", 
        name_arabic: "شنغهاي", 
        port_code: "CNSHG" 
      },
      { 
        id: 10,
        countries_code: "CN",
        name: "Ningbo", 
        name_arabic: "نينغبو", 
        port_code: "CNNBG" 
      },
      { 
        id: 11,
        countries_code: "CN",
        name: "Nansha", 
        name_arabic: "ميناء نانشا", 
        port_code: "CNNSA" 
      },
      { 
        id: 104,
        countries_code: "CN",
        name: "Qingdao", 
        name_arabic: "تشينغداو", 
        port_code: "CNQDG" 
      },
      { 
        id: 105,
        countries_code: "CN",
        name: "Dalian", 
        name_arabic: "داليان", 
        port_code: "CNDLC" 
      },
      { 
        id: 106,
        countries_code: "CN",
        name: "Guangzhou", 
        name_arabic: "غوانزو", 
        port_code: "CNGZG" 
      },
      { 
        id: 107,
        countries_code: "CN",
        name: "Shenzhen", 
        name_arabic: "شينزن", 
        port_code: "CNSZX" 
      },
      { 
        id: 108,
        countries_code: "CN",
        name: "Xiamen", 
        name_arabic: "شيامن", 
        port_code: "CNXMG" 
      },
      { 
        id: 109,
        countries_code: "CN",
        name: "Tianjin Xingang", 
        name_arabic: "تيانجين", 
        port_code: "CNTXG" 
      }
    ]
  },
  {
    origin: {
      id: 5,
      lang: "ar",
      label: "Algeria",
      label_ar: "الجزائر",
      ImageURL: "https://www.svgrepo.com/show/405404/flag-for-flag-algeria.svg",
      countries_code: "DZ",
      countryGroups: []
    },
    ports: [
      { 
        id: 12,
        countries_code: "DZ",
        name: "Alger (Algiers)", 
        name_arabic: "الجزائر", 
        port_code: "DZALG" 
      },
      { 
        id: 13,
        countries_code: "DZ",
        name: "Oran", 
        name_arabic: "وهران", 
        port_code: "DZORN" 
      },
      { 
        id: 87,
        countries_code: "DZ",
        name: "Arzew", 
        name_arabic: "أرزو", 
        port_code: "DZAZW" 
      },
      { 
        id: 88,
        countries_code: "DZ",
        name: "Annaba", 
        name_arabic: "عنابة", 
        port_code: "DZAAE" 
      },
      { 
        id: 89,
        countries_code: "DZ",
        name: "Bejaia", 
        name_arabic: "بجاية", 
        port_code: "DZBJA" 
      },
      { 
        id: 90,
        countries_code: "DZ",
        name: "Skikda", 
        name_arabic: "سكيكدة", 
        port_code: "DZSKI" 
      }
    ]
  },
  {
    origin: {
      id: 6,
      lang: "ar",
      label: "Egypt",
      label_ar: "مصر",
      ImageURL: "https://www.svgrepo.com/show/405456/flag-for-flag-egypt.svg",
      countries_code: "EG",
      countryGroups: []
    },
    ports: [
      { 
        id: 14,
        countries_code: "EG",
        name: "Alexandria", 
        name_arabic: "الإسكندرية", 
        port_code: "EGALY" 
      },
      { 
        id: 15,
        countries_code: "EG",
        name: "Port Said", 
        name_arabic: "بورسعيد", 
        port_code: "EGPSD" 
      },
      { 
        id: 91,
        countries_code: "EG",
        name: "Dumyat (Damietta)", 
        name_arabic: "دمياط", 
        port_code: "EGDAM" 
      },
      { 
        id: 92,
        countries_code: "EG",
        name: "Alexandria El Dekheila", 
        name_arabic: "الدخيلة", 
        port_code: "EGEDK" 
      },
      { 
        id: 93,
        countries_code: "EG",
        name: "Ain Sukhna", 
        name_arabic: "العين السخنة", 
        port_code: "EGSOK" 
      }
    ]
  },
  {
    origin: {
      id: 7,
      lang: "ar",
      label: "Lebanon",
      label_ar: "لبنان",
      ImageURL: "https://www.svgrepo.com/show/405500/flag-for-flag-lebanon.svg",
      countries_code: "LB",
      countryGroups: []
    },
    ports: [
      { 
        id: 16,
        countries_code: "LB",
        name: "Beirut", 
        name_arabic: "بيروت", 
        port_code: "LBBEY" 
      },
      { 
        id: 17,
        countries_code: "LB",
        name: "Tripoli", 
        name_arabic: "طرابلس", 
        port_code: "LBKYE" 
      }
    ]
  },
  {
    origin: {
      id: 8,
      lang: "ar",
      label: "Jordan",
      label_ar: "الأردن",
      ImageURL: "https://www.svgrepo.com/show/405490/flag-for-flag-jordan.svg",
      countries_code: "JO",
      countryGroups: []
    },
    ports: [
      { 
        id: 18,
        countries_code: "JO",
        name: "Aqaba", 
        name_arabic: "العقبة", 
        port_code: "JOAQB" 
      }
    ]
  },
  {
    origin: {
      id: 9,
      lang: "ar",
      label: "Saudi Arabia",
      label_ar: "المملكة العربية السعودية",
      ImageURL: "https://www.svgrepo.com/show/405610/flag-for-flag-saudi-arabia.svg",
      countries_code: "SA",
      countryGroups: []
    },
    ports: [
      { 
        id: 19,
        countries_code: "SA",
        name: "Jeddah", 
        name_arabic: "جدة", 
        port_code: "SAJED" 
      },
      { 
        id: 20,
        countries_code: "SA",
        name: "Dammam", 
        name_arabic: "الدمام", 
        port_code: "SADMM" 
      },
      { 
        id: 110,
        countries_code: "SA",
        name: "King Abdullah", 
        name_arabic: "الملك عبدالله", 
        port_code: "SAKAC" 
      },
      { 
        id: 111,
        countries_code: "SA",
        name: "Yanbu al-Bahr", 
        name_arabic: "ينبع البحر", 
        port_code: "SAYNB" 
      },
      { 
        id: 112,
        countries_code: "SA",
        name: "Jubail", 
        name_arabic: "الجبيل", 
        port_code: "SAJUB" 
      }
    ]
  },
  {
    origin: {
      id: 10,
      lang: "ar",
      label: "Iraq",
      label_ar: "العراق",
      ImageURL: "https://www.svgrepo.com/show/405480/flag-for-flag-iraq.svg",
      countries_code: "IQ",
      countryGroups: []
    },
    ports: [
      { 
        id: 21,
        countries_code: "IQ",
        name: "Basra", 
        name_arabic: "البصرة", 
        port_code: "IQBSR" 
      },
      { 
        id: 22,
        countries_code: "IQ",
        name: "Umm Qasr", 
        name_arabic: "أم قصر", 
        port_code: "IQUQR" 
      },
      { 
        id: 23,
        countries_code: "IQ",
        name: "Abu Al Fulus", 
        name_arabic: "ابو الفلوس", 
        port_code: "IQALF" 
      }
    ]
  },
  {
    origin: {
      id: 11,
      lang: "ar",
      label: "India",
      label_ar: "الهند",
      ImageURL: "https://www.svgrepo.com/show/405510/flag-for-flag-india.svg",
      countries_code: "IN",
      countryGroups: []
    },
    ports: [
      { 
        id: 24,
        countries_code: "IN",
        name: "Mumbai", 
        name_arabic: "مومباي", 
        port_code: "INBOM" 
      },
      { 
        id: 25,
        countries_code: "IN",
        name: "Chennai", 
        name_arabic: "تشيناي", 
        port_code: "INMAA" 
      },
      { 
        id: 26,
        countries_code: "IN",
        name: "Kolkata", 
        name_arabic: "كولكاتا", 
        port_code: "INCCU" 
      },
      { 
        id: 27,
        countries_code: "IN",
        name: "Cochin", 
        name_arabic: "كوشين", 
        port_code: "INCOK" 
      },
      { 
        id: 28,
        countries_code: "IN",
        name: "Nhava Sheva", 
        name_arabic: "نهافا شيفا", 
        port_code: "INNSA" 
      },
      { 
        id: 113,
        countries_code: "IN",
        name: "Kandla", 
        name_arabic: "كاندلا", 
        port_code: "INIXY" 
      },
      { 
        id: 114,
        countries_code: "IN",
        name: "Visakhapatnam", 
        name_arabic: "فيساخاباتنام", 
        port_code: "INVTZ" 
      },
      { 
        id: 115,
        countries_code: "IN",
        name: "Mundra", 
        name_arabic: "موندرا", 
        port_code: "INMUN" 
      },
      { 
        id: 116,
        countries_code: "IN",
        name: "Mangalore", 
        name_arabic: "مانجالور", 
        port_code: "ININML" 
      }
    ]
  },
  {
    origin: {
      id: 12,
      lang: "ar",
      label: "Pakistan",
      label_ar: "باكستان",
      ImageURL: "https://www.svgrepo.com/show/405576/flag-for-flag-pakistan.svg",
      countries_code: "PK",
      countryGroups: []
    },
    ports: [
      { 
        id: 29,
        countries_code: "PK",
        name: "Karachi", 
        name_arabic: "كراتشي", 
        port_code: "PKKHI" 
      },
      { 
        id: 30,
        countries_code: "PK",
        name: "Port Qasim", 
        name_arabic: "ميناء قاسم", 
        port_code: "PKBQM" 
      },
      { 
        id: 31,
        countries_code: "PK",
        name: "Gwadar", 
        name_arabic: "جوادر", 
        port_code: "PKGWD" 
      }
    ]
  },
  {
    origin: {
      id: 13,
      lang: "ar",
      label: "Bangladesh",
      label_ar: "بنغلاديش",
      ImageURL: "https://www.svgrepo.com/show/405420/flag-for-flag-bangladesh.svg",
      countries_code: "BD",
      countryGroups: []
    },
    ports: [
      { 
        id: 32,
        countries_code: "BD",
        name: "Chittogram", 
        name_arabic: "شاتوجرام", 
        port_code: "BDCGP" 
      },
      { 
        id: 33,
        countries_code: "BD",
        name: "Mongla", 
        name_arabic: "مونغلا", 
        port_code: "BDMGL" 
      },
      { 
        id: 34,
        countries_code: "BD",
        name: "Pangaon", 
        name_arabic: "بانجاون", 
        port_code: "BDPGN" 
      }
    ]
  },
  {
    origin: {
      id: 14,
      lang: "ar",
      label: "Iran (Islamic Republic of)",
      label_ar: "ايران (الجمهورية الاسلامية)",
      ImageURL: "https://www.svgrepo.com/show/405549/flag-for-flag-mexico.svg",
      countries_code: "IR",
      countryGroups: []
    },
    ports: [
      { 
        id: 35,
        countries_code: "IR",
        name: "Bandar Abbas", 
        name_arabic: "بندر عباس", 
        port_code: "IRBND" 
      },
      { 
        id: 36,
        countries_code: "IR",
        name: "Bandar Khomeini", 
        name_arabic: "بندر الخميني", 
        port_code: "IRBKM" 
      },
      { 
        id: 37,
        countries_code: "IR",
        name: "Bushehr", 
        name_arabic: "بوشهر", 
        port_code: "IRBUZ" 
      },
      { 
        id: 38,
        countries_code: "IR",
        name: "Asaluyeh", 
        name_arabic: "عسلوية", 
        port_code: "IRASA" 
      }
    ]
  },
  {
    origin: {
      id: 15,
      lang: "ar",
      label: "United States of America",
      label_ar: "الولايات المتحدة الاميركية",
      ImageURL: "https://flagcdn.com/w40/us.png",
      countries_code: "US",
      countryGroups: []
    },
    ports: [
      { 
        id: 39,
        countries_code: "US",
        name: "Los Angeles", 
        name_arabic: "لوس أنجلوس", 
        port_code: "USLAX" 
      },
      { 
        id: 40,
        countries_code: "US",
        name: "Long Beach", 
        name_arabic: "الشاطئ طويل", 
        port_code: "USLGB" 
      },
      { 
        id: 41,
        countries_code: "US",
        name: "New York", 
        name_arabic: "نيويورك", 
        port_code: "USNYC" 
      },
      { 
        id: 42,
        countries_code: "US",
        name: "Houston", 
        name_arabic: "هيوستن", 
        port_code: "USHKA" 
      },
      { 
        id: 43,
        countries_code: "US",
        name: "Miami", 
        name_arabic: "ميامي", 
        port_code: "USMIA" 
      },
      { 
        id: 117,
        countries_code: "US",
        name: "Oakland", 
        name_arabic: "اوكلاند", 
        port_code: "USOAK" 
      },
      { 
        id: 118,
        countries_code: "US",
        name: "Seattle", 
        name_arabic: "سياتل", 
        port_code: "USSEA" 
      },
      { 
        id: 119,
        countries_code: "US",
        name: "Norfolk", 
        name_arabic: "نورفولك", 
        port_code: "USORF" 
      },
      { 
        id: 120,
        countries_code: "US",
        name: "Savannah", 
        name_arabic: "سافانا", 
        port_code: "USSAV" 
      },
      { 
        id: 121,
        countries_code: "US",
        name: "Charleston", 
        name_arabic: "تشارلستون", 
        port_code: "USCHS" 
      }
    ]
  },
  {
    origin: {
      id: 16,
      lang: "ar",
      label: "Germany",
      label_ar: "المانيا",
      ImageURL: "https://www.svgrepo.com/show/405490/flag-for-flag-germany.svg",
      countries_code: "DE",
      countryGroups: []
    },
    ports: [
      { 
        id: 44,
        countries_code: "DE",
        name: "Hamburg", 
        name_arabic: "هامبورغ", 
        port_code: "DEHAM" 
      },
      { 
        id: 45,
        countries_code: "DE",
        name: "Bremerhaven", 
        name_arabic: "بريمرهافن", 
        port_code: "DEBRV" 
      },
      { 
        id: 46,
        countries_code: "DE",
        name: "Bremen", 
        name_arabic: "بريمن", 
        port_code: "DEBRE" 
      },
      { 
        id: 122,
        countries_code: "DE",
        name: "Wilhelmshaven", 
        name_arabic: "ويلهلمسهافن", 
        port_code: "DEWVN" 
      },
      { 
        id: 123,
        countries_code: "DE",
        name: "Rostock", 
        name_arabic: "روستوك", 
        port_code: "DERSK" 
      },
      { 
        id: 124,
        countries_code: "DE",
        name: "Kiel", 
        name_arabic: "كيل", 
        port_code: "DEKEL" 
      }
    ]
  },
  {
    origin: {
      id: 17,
      lang: "ar",
      label: "Netherlands",
      label_ar: "هولندا",
      ImageURL: "https://www.svgrepo.com/show/405561/flag-for-flag-netherlands.svg",
      countries_code: "NL",
      countryGroups: []
    },
    ports: [
      { 
        id: 47,
        countries_code: "NL",
        name: "Rotterdam", 
        name_arabic: "روتردام", 
        port_code: "NLRTM" 
      },
      { 
        id: 48,
        countries_code: "NL",
        name: "Amsterdam", 
        name_arabic: "أمستردام", 
        port_code: "NLAMS" 
      },
      { 
        id: 49,
        countries_code: "NL",
        name: "Botlek", 
        name_arabic: "بوتليك", 
        port_code: "NLBOT" 
      },
      { 
        id: 125,
        countries_code: "NL",
        name: "Vlissingen", 
        name_arabic: "فليسينجين", 
        port_code: "NLVLI" 
      },
      { 
        id: 126,
        countries_code: "NL",
        name: "Terneuzen", 
        name_arabic: "تيرنوزن", 
        port_code: "NLTNZ" 
      }
    ]
  },
  {
    origin: {
      id: 18,
      lang: "ar",
      label: "Italy",
      label_ar: "ايطاليا",
      ImageURL: "https://www.svgrepo.com/show/405517/flag-for-flag-italy.svg",
      countries_code: "IT",
      countryGroups: []
    },
    ports: [
      { 
        id: 50,
        countries_code: "IT",
        name: "Genoa", 
        name_arabic: "جينوا", 
        port_code: "ITGOA" 
      },
      { 
        id: 51,
        countries_code: "IT",
        name: "La Spezia", 
        name_arabic: "لا سبيزيا", 
        port_code: "ITSPE" 
      },
      { 
        id: 52,
        countries_code: "IT",
        name: "Livorno", 
        name_arabic: "ليفورنو", 
        port_code: "ITLIV" 
      },
      { 
        id: 53,
        countries_code: "IT",
        name: "Gioia Tauro", 
        name_arabic: "جويا تاورو", 
        port_code: "ITGIT" 
      },
      { 
        id: 127,
        countries_code: "IT",
        name: "Napoli", 
        name_arabic: "نابولي", 
        port_code: "ITNAP" 
      },
      { 
        id: 128,
        countries_code: "IT",
        name: "Bari", 
        name_arabic: "باري", 
        port_code: "ITBRI" 
      },
      { 
        id: 129,
        countries_code: "IT",
        name: "Trieste", 
        name_arabic: "ترييست", 
        port_code: "ITTRS" 
      }
    ]
  },
  {
    origin: {
      id: 19,
      lang: "ar",
      label: "Spain",
      label_ar: "اسبانيا",
      ImageURL: "https://www.svgrepo.com/show/405610/flag-for-flag-spain.svg",
      countries_code: "ES",
      countryGroups: []
    },
    ports: [
      { 
        id: 54,
        countries_code: "ES",
        name: "Algeciras", 
        name_arabic: "الجزيرة الخضراء", 
        port_code: "ESALG" 
      },
      { 
        id: 55,
        countries_code: "ES",
        name: "Barcelona", 
        name_arabic: "برشلونة", 
        port_code: "ESBCN" 
      },
      { 
        id: 56,
        countries_code: "ES",
        name: "Valencia", 
        name_arabic: "فالنسيا", 
        port_code: "ESVLC" 
      },
      { 
        id: 57,
        countries_code: "ES",
        name: "Bilbao", 
        name_arabic: "بلباو", 
        port_code: "ESBIO" 
      },
      { 
        id: 130,
        countries_code: "ES",
        name: "Vigo", 
        name_arabic: "فيجو", 
        port_code: "ESVGO" 
      },
      { 
        id: 131,
        countries_code: "ES",
        name: "Cartagena", 
        name_arabic: "قرطاجنة", 
        port_code: "ESCAR" 
      },
      { 
        id: 132,
        countries_code: "ES",
        name: "Malaga", 
        name_arabic: "ملقا", 
        port_code: "ESAGP" 
      }
    ]
  },
  {
    origin: {
      id: 20,
      lang: "ar",
      label: "France",
      label_ar: "فرنسا",
      ImageURL: "https://www.svgrepo.com/show/405485/flag-for-flag-france.svg",
      countries_code: "FR",
      countryGroups: []
    },
    ports: [
      { 
        id: 58,
        countries_code: "FR",
        name: "Le Havre", 
        name_arabic: "لا هافر", 
        port_code: "FRLEH" 
      },
      { 
        id: 59,
        countries_code: "FR",
        name: "Marseille", 
        name_arabic: "مرسيليا", 
        port_code: "FRMRS" 
      },
      { 
        id: 60,
        countries_code: "FR",
        name: "Fos-sur-Mer", 
        name_arabic: "فوس سور مير", 
        port_code: "FRFOS" 
      },
      { 
        id: 133,
        countries_code: "FR",
        name: "Dunkerque", 
        name_arabic: "دونكيرك", 
        port_code: "FRDKK" 
      },
      { 
        id: 134,
        countries_code: "FR",
        name: "Brest", 
        name_arabic: "بريست", 
        port_code: "FRBES" 
      },
      { 
        id: 135,
        countries_code: "FR",
        name: "La Rochelle", 
        name_arabic: "لاروشيل", 
        port_code: "FRLRH" 
      }
    ]
  },
  {
    origin: {
      id: 21,
      lang: "ar",
      label: "Japan",
      label_ar: "اليابان",
      ImageURL: "https://www.svgrepo.com/show/405519/flag-for-flag-japan.svg",
      countries_code: "JP",
      countryGroups: []
    },
    ports: [
      { 
        id: 61,
        countries_code: "JP",
        name: "Tokyo", 
        name_arabic: "طوكيو", 
        port_code: "JPTYO" 
      },
      { 
        id: 62,
        countries_code: "JP",
        name: "Yokohama", 
        name_arabic: "يوكوهاما", 
        port_code: "JPYOK" 
      },
      { 
        id: 63,
        countries_code: "JP",
        name: "Osaka", 
        name_arabic: "أوساكا", 
        port_code: "JPOSA" 
      },
      { 
        id: 64,
        countries_code: "JP",
        name: "Kobe", 
        name_arabic: "كوبي", 
        port_code: "JPUKB" 
      },
      { 
        id: 136,
        countries_code: "JP",
        name: "Nagoya", 
        name_arabic: "ناغويا", 
        port_code: "JPNGO" 
      },
      { 
        id: 137,
        countries_code: "JP",
        name: "Hakata", 
        name_arabic: "هاكاتا", 
        port_code: "JPHKT" 
      },
      { 
        id: 138,
        countries_code: "JP",
        name: "Nagasaki", 
        name_arabic: "ناغازاكي", 
        port_code: "JPNGS" 
      }
    ]
  },
  {
    origin: {
      id: 22,
      lang: "ar",
      label: "Korea, Republic of",
      label_ar: "جمهورية كوريا",
      ImageURL: "https://www.svgrepo.com/show/405608/flag-for-flag-south-korea.svg",
      countries_code: "KR",
      countryGroups: []
    },
    ports: [
      { 
        id: 65,
        countries_code: "KR",
        name: "Busan", 
        name_arabic: "بوسان", 
        port_code: "KRPUS" 
      },
      { 
        id: 66,
        countries_code: "KR",
        name: "Incheon", 
        name_arabic: "انشيون", 
        port_code: "KRINC" 
      },
      { 
        id: 67,
        countries_code: "KR",
        name: "Gwangyang", 
        name_arabic: "غوانغ يانغ", 
        port_code: "KRKAN" 
      },
      { 
        id: 139,
        countries_code: "KR",
        name: "Ulsan", 
        name_arabic: "أولسان", 
        port_code: "KRUSN" 
      },
      { 
        id: 140,
        countries_code: "KR",
        name: "Pohang", 
        name_arabic: "بوهانج", 
        port_code: "KRKPO" 
      }
    ]
  },
  {
    origin: {
      id: 23,
      lang: "ar",
      label: "Singapore",
      label_ar: "سنغافورة",
      ImageURL: "https://www.svgrepo.com/show/405601/flag-for-flag-singapore.svg",
      countries_code: "SG",
      countryGroups: []
    },
    ports: [
      { 
        id: 68,
        countries_code: "SG",
        name: "Singapore", 
        name_arabic: "سنغافورة", 
        port_code: "SGSIN" 
      }
    ]
  },
  {
    origin: {
      id: 24,
      lang: "ar",
      label: "Malaysia",
      label_ar: "ماليزيا",
      ImageURL: "https://www.svgrepo.com/show/405539/flag-for-flag-malaysia.svg",
      countries_code: "MY",
      countryGroups: []
    },
    ports: [
      { 
        id: 69,
        countries_code: "MY",
        name: "Port Klang", 
        name_arabic: "بورت كلانج", 
        port_code: "MYPKG" 
      },
      { 
        id: 70,
        countries_code: "MY",
        name: "Tanjung Pelepas", 
        name_arabic: "تانجونج بيليباس", 
        port_code: "MYTPP" 
      },
      { 
        id: 71,
        countries_code: "MY",
        name: "Penang", 
        name_arabic: "بينانج", 
        port_code: "MYPEN" 
      },
      { 
        id: 141,
        countries_code: "MY",
        name: "Pasir Gudang", 
        name_arabic: "باسير جودانج", 
        port_code: "MYPGU" 
      },
      { 
        id: 142,
        countries_code: "MY",
        name: "Kuching", 
        name_arabic: "كوتشينغ", 
        port_code: "MYKCH" 
      },
      { 
        id: 143,
        countries_code: "MY",
        name: "Kota Kinabalu", 
        name_arabic: "كوتا كينابالو", 
        port_code: "MYBKI" 
      }
    ]
  },
  {
    origin: {
      id: 25,
      lang: "ar",
      label: "Thailand",
      label_ar: "تايلاند",
      ImageURL: "https://www.svgrepo.com/show/405628/flag-for-flag-thailand.svg",
      countries_code: "TH",
      countryGroups: []
    },
    ports: [
      { 
        id: 72,
        countries_code: "TH",
        name: "Laem Chabang", 
        name_arabic: "ليم شابانج", 
        port_code: "THLCH" 
      },
      { 
        id: 73,
        countries_code: "TH",
        name: "Bangkok", 
        name_arabic: "بانكوك", 
        port_code: "THBKK" 
      },
      { 
        id: 144,
        countries_code: "TH",
        name: "Songkhla", 
        name_arabic: "سونغكلا", 
        port_code: "THSGZ" 
      }
    ]
  },
  {
    origin: {
      id: 26,
      lang: "ar",
      label: "Vietnam",
      label_ar: "فيتنام",
      ImageURL: "https://www.svgrepo.com/show/405655/flag-for-flag-vietnam.svg",
      countries_code: "VN",
      countryGroups: []
    },
    ports: [
      { 
        id: 74,
        countries_code: "VN",
        name: "Ho Chi Minh City", 
        name_arabic: "مدينة هو تشي مينه", 
        port_code: "VNSGN" 
      },
      { 
        id: 75,
        countries_code: "VN",
        name: "Haiphong", 
        name_arabic: "هايفونغ", 
        port_code: "VNHPH" 
      },
      { 
        id: 76,
        countries_code: "VN",
        name: "Da Nang", 
        name_arabic: "دا نانغ", 
        port_code: "VNDAD" 
      },
      { 
        id: 145,
        countries_code: "VN",
        name: "Vung Tau", 
        name_arabic: "فونج تاو", 
        port_code: "VNVUT" 
      },
      { 
        id: 146,
        countries_code: "VN",
        name: "Qui Nhon", 
        name_arabic: "كوي نون", 
        port_code: "VNUIH" 
      }
    ]
  },
  {
    origin: {
      id: 27,
      lang: "ar",
      label: "Indonesia",
      label_ar: "اندونيسيا",
      ImageURL: "https://www.svgrepo.com/show/405511/flag-for-flag-indonesia.svg",
      countries_code: "ID",
      countryGroups: []
    },
    ports: [
      { 
        id: 77,
        countries_code: "ID",
        name: "Jakarta", 
        name_arabic: "جاكرتا", 
        port_code: "IDJKT" 
      },
      { 
        id: 78,
        countries_code: "ID",
        name: "Surabaya", 
        name_arabic: "سورابايا", 
        port_code: "IDSUB" 
      },
      { 
        id: 79,
        countries_code: "ID",
        name: "Belawan", 
        name_arabic: "بيلاوان", 
        port_code: "IDBLW" 
      },
      { 
        id: 147,
        countries_code: "ID",
        name: "Medan", 
        name_arabic: "ميدان", 
        port_code: "IDMES" 
      },
      { 
        id: 148,
        countries_code: "ID",
        name: "Palembang", 
        name_arabic: "باليمبانج", 
        port_code: "IDPLM" 
      },
      { 
        id: 149,
        countries_code: "ID",
        name: "Semarang", 
        name_arabic: "سيمارانج", 
        port_code: "IDSRG" 
      }
    ]
  },
  {
    origin: {
      id: 28,
      lang: "ar",
      label: "Philippines",
      label_ar: "فيلبين",
      ImageURL: "https://www.svgrepo.com/show/405582/flag-for-flag-philippines.svg",
      countries_code: "PH",
      countryGroups: []
    },
    ports: [
      { 
        id: 80,
        countries_code: "PH",
        name: "Manila", 
        name_arabic: "مانيلا", 
        port_code: "PHMNL" 
      },
      { 
        id: 81,
        countries_code: "PH",
        name: "Cebu", 
        name_arabic: "سيبو", 
        port_code: "PHCEB" 
      },
      { 
        id: 150,
        countries_code: "PH",
        name: "Batangas", 
        name_arabic: "باتانجاس", 
        port_code: "PHBTG" 
      },
      { 
        id: 151,
        countries_code: "PH",
        name: "Subic Bay", 
        name_arabic: "سوبيك باي", 
        port_code: "PHSFS" 
      }
    ]
  },
  {
    origin: {
      id: 29,
      lang: "ar",
      label: "South Africa",
      label_ar: "جنوب افريقيا",
      ImageURL: "https://www.svgrepo.com/show/405604/flag-for-flag-south-africa.svg",
      countries_code: "ZA",
      countryGroups: []
    },
    ports: [
      { 
        id: 82,
        countries_code: "ZA",
        name: "Durban", 
        name_arabic: "ديربان", 
        port_code: "ZADUR" 
      },
      { 
        id: 83,
        countries_code: "ZA",
        name: "Cape Town", 
        name_arabic: "كيب تاون", 
        port_code: "ZACPT" 
      },
      { 
        id: 84,
        countries_code: "ZA",
        name: "Port Elizabeth", 
        name_arabic: "ميناء اليزابيث", 
        port_code: "ZAPLZ" 
      },
      { 
        id: 152,
        countries_code: "ZA",
        name: "Richards Bay", 
        name_arabic: "ريتشاردز باي", 
        port_code: "ZARCB" 
      }
    ]
  },
  {
    origin: {
      id: 30,
      lang: "ar",
      label: "Morocco",
      label_ar: "المغرب",
      ImageURL: "https://www.svgrepo.com/show/405555/flag-for-flag-morocco.svg",
      countries_code: "MA",
      countryGroups: []
    },
    ports: [
      { 
        id: 85,
        countries_code: "MA",
        name: "Casablanca", 
        name_arabic: "كازابلانكا", 
        port_code: "MACAS" 
      },
      { 
        id: 86,
        countries_code: "MA",
        name: "Tanger Med", 
        name_arabic: "طنجة المتوسط", 
        port_code: "MAPTM" 
      },
      { 
        id: 153,
        countries_code: "MA",
        name: "Agadir", 
        name_arabic: "أغادير", 
        port_code: "MAAGA" 
      },
      { 
        id: 154,
        countries_code: "MA",
        name: "Nador", 
        name_arabic: "الناظور", 
        port_code: "MANDR" 
      }
    ]
  }
];

// دالة لتحويل البيانات إلى التنسيق المطلوب للبحث
// متطابقة مع Django Models: Origin و Port
export const formatPortsForSearch = (portsData) => {
  const formatted = [];
  
  portsData.forEach(item => {
    const origin = item.origin; // Origin model
    const ports = item.ports;   // Port models array
    
    const countryLabel = origin?.label_ar || origin?.label;
    const countryImage = origin?.ImageURL;
    const countryCode = origin?.countries_code;

    // إضافة الدولة (Origin) كخيار
    formatted.push({
      origin: {
        id: origin.id,
        lang: origin.lang,
        label: origin.label,
        label_ar: origin.label_ar,
        ImageURL: origin.ImageURL,
        countries_code: origin.countries_code,
        countryGroups: origin.countryGroups,
        ports: ports // إضافة الموانئ للدولة
      },
      countries_code: origin.countries_code,
      isCountry: true,
      name: origin.label_ar || origin.label,
      searchableText: `${origin.label} ${origin.label_ar} ${origin.countries_code}`
    });

    // إضافة كل ميناء (Port) كخيار منفصل
    ports.forEach(port => {
      formatted.push({
        id: port.id,
        countries_code: port.countries_code,
        name: port.name,
        name_arabic: port.name_arabic,
        port_code: port.port_code,
        origin: {
          id: origin.id,
          lang: origin.lang,
          label: origin.label,
          label_ar: origin.label_ar,
          ImageURL: origin.ImageURL,
          countries_code: origin.countries_code,
          countryGroups: origin.countryGroups,
        },
        country_name: countryLabel,
        country_name_ar: origin.label_ar,
        searchableText: `${port.name} ${port.name_arabic || ''} ${port.port_code} ${countryLabel} ${origin.label}`
      });
    });
  });
  
  return formatted;
};

// دالة البحث المحلية السريعة
export const searchPortsAndCountries = (query, data) => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  
  return data.filter(item => 
    item.searchableText.toLowerCase().includes(searchTerm)
  );
};

// دالة للحصول على الموانئ لدولة معينة
export const getPortsByCountry = (countryCode, data) => {
  const country = data.find(item => 
    item.isCountry && item.countries_code === countryCode
  );
  
  return country?.origin?.ports || [];
};

// دالة للحصول على Origin (الدولة) بواسطة countries_code
export const getOriginByCountryCode = (countryCode, data) => {
  const country = data.find(item => 
    item.isCountry && item.countries_code === countryCode
  );
  
  return country?.origin || null;
};

// دالة للحصول على Port بواسطة port_code
export const getPortByPortCode = (portCode, data) => {
  const port = data.find(item => 
    !item.isCountry && item.port_code === portCode
  );
  
  return port || null;
};

// دالة للحصول على جميع Origins (الدول)
export const getAllOrigins = (data) => {
  return data.filter(item => item.isCountry).map(item => item.origin);
};

// دالة للحصول على جميع Ports (الموانئ)
export const getAllPorts = (data) => {
  return data.filter(item => !item.isCountry);
};
