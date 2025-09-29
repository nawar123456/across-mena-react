import './SeaFreightSyria.css';
import { MainContainer } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEO from '../../../../components/SEO/SEO';
import Image from '../../../../assets/images/HeroHome.png';
import logo from '../../../../assets/icons/last_logo_navbar.svg';

const SeaFreightSyria = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'ar';

  // بيانات الكاردات التسعة
  const cardsData = [
    {
      id: 1,
      title: {
        ar: 'الموانئ السورية الرئيسية',
        en: 'Main Syrian Ports'
      },
      description: {
        ar: 'تعرف على الموانئ السورية الرئيسية: ميناء اللاذقية وميناء طرطوس. خدمات متطورة ومواقع استراتيجية.',
        en: 'Learn about the main Syrian ports: Latakia Port and Tartus Port. Advanced services and strategic locations.'
      },
      image: Image,
      category: {
        ar: 'الموانئ',
        en: 'Ports'
      }
    },
    {
      id: 2,
      title: {
        ar: 'أنواع الحاويات المتاحة',
        en: 'Available Container Types'
      },
      description: {
        ar: 'حاويات 20 قدم و 40 قدم للشحن إلى سورية. خيارات متنوعة تناسب جميع أنواع البضائع.',
        en: '20ft and 40ft containers for shipping to Syria. Various options suitable for all types of goods.'
      },
      image: Image,
      category: {
        ar: 'الحاويات',
        en: 'Containers'
      }
    },
    {
      id: 3,
      title: {
        ar: 'أسعار الشحن التنافسية',
        en: 'Competitive Shipping Rates'
      },
      description: {
        ar: 'أسعار شفافة ومتنافسة للشحن البحري إلى سورية. لا توجد رسوم مخفية أو تكاليف إضافية.',
        en: 'Transparent and competitive rates for sea freight to Syria. No hidden fees or additional costs.'
      },
      image: Image,
      category: {
        ar: 'الأسعار',
        en: 'Pricing'
      }
    },
    {
      id: 4,
      title: {
        ar: 'التخليص الجمركي',
        en: 'Customs Clearance'
      },
      description: {
        ar: 'خدمة التخليص الجمركي الكاملة مع فريق محترف يعرف جميع القوانين واللوائح السورية.',
        en: 'Complete customs clearance service with a professional team familiar with all Syrian laws and regulations.'
      },
      image: Image,
      category: {
        ar: 'الجمرك',
        en: 'Customs'
      }
    },
    {
      id: 5,
      title: {
        ar: 'تتبع الشحنات',
        en: 'Shipment Tracking'
      },
      description: {
        ar: 'تتبع شحنتك في الوقت الفعلي من الميناء المصدر حتى الوصول إلى سورية.',
        en: 'Track your shipment in real-time from the source port until arrival in Syria.'
      },
      image: Image,
      category: {
        ar: 'التتبع',
        en: 'Tracking'
      }
    },
    {
      id: 6,
      title: {
        ar: 'التأمين على البضائع',
        en: 'Cargo Insurance'
      },
      description: {
        ar: 'تأمين شامل على البضائع أثناء النقل البحري. حماية كاملة لاستثماراتك.',
        en: 'Comprehensive cargo insurance during sea transport. Complete protection for your investments.'
      },
      image: Image,
      category: {
        ar: 'التأمين',
        en: 'Insurance'
      }
    },
    {
      id: 7,
      title: {
        ar: 'خدمة العملاء 24/7',
        en: '24/7 Customer Service'
      },
      description: {
        ar: 'فريق خدمة العملاء متاح على مدار الساعة للإجابة على استفساراتك ومساعدتك.',
        en: 'Customer service team available 24/7 to answer your inquiries and assist you.'
      },
      image: Image,
      category: {
        ar: 'الخدمة',
        en: 'Service'
      }
    },
    {
      id: 8,
      title: {
        ar: 'الشحن السريع',
        en: 'Express Shipping'
      },
      description: {
        ar: 'خدمة الشحن السريع إلى سورية مع أوقات تسليم محسنة وموثوقية عالية.',
        en: 'Express shipping service to Syria with improved delivery times and high reliability.'
      },
      image: Image,
      category: {
        ar: 'السريع',
        en: 'Express'
      }
    },
    {
      id: 9,
      title: {
        ar: 'الشحن المتخصص',
        en: 'Specialized Shipping'
      },
      description: {
        ar: 'شحن متخصص للبضائع الحساسة والمواد الخطرة وفقاً للمعايير الدولية.',
        en: 'Specialized shipping for sensitive goods and hazardous materials according to international standards.'
      },
      image: Image,
      category: {
        ar: 'متخصص',
        en: 'Specialized'
      }
    }
  ];

  // SEO data
  const seoData = {
    ar: {
      title: "الشحن البحري إلى سورية - دليل شامل | Across MENA",
      description: "دليل شامل للشحن البحري إلى سورية. تعرف على الموانئ والأسعار والخدمات المتاحة للشحن إلى سورية.",
      keywords: "شحن بحري سورية, موانئ سورية, شحن اللاذقية, شحن طرطوس, تخليص جمركي سورية"
    },
    en: {
      title: "Sea Freight to Syria - Complete Guide | Across MENA",
      description: "Complete guide to sea freight to Syria. Learn about ports, rates, and available services for shipping to Syria.",
      keywords: "sea freight Syria, Syria ports, Latakia shipping, Tartus shipping, Syria customs clearance"
    }
  };

  const currentSeoData = seoData[currentLang] || seoData.ar;

  const pageContent = {
    ar: {
      title: "الشحن البحري إلى سورية",
      subtitle: "دليل شامل للشحن البحري",
      description: "تعرف على جميع خدمات الشحن البحري إلى سورية. موانئ متطورة، أسعار تنافسية، وخدمات شاملة."
    },
    en: {
      title: "Sea Freight to Syria",
      subtitle: "Complete Sea Freight Guide",
      description: "Learn about all sea freight services to Syria. Advanced ports, competitive rates, and comprehensive services."
    }
  };

  const content = pageContent[currentLang] || pageContent.ar;

  return (
    <>
      <SEO 
        title={currentSeoData.title}
        description={currentSeoData.description}
        keywords={currentSeoData.keywords}
        image="https://acrossmena.com/images/sea-freight-syria.jpg"
        url="https://acrossmena.com/blog/sea-freight-syria"
        type="website"
        lang={currentLang}
      />

      <MainContainer>
        <div className="sea-freight-page">
          <header className="page-header">
            <h1 className="page-title">{content.title}</h1>
            <h2 className="page-subtitle">{content.subtitle}</h2>
            <p className="page-description">{content.description}</p>
          </header>

          <div className="cards-grid">
            {cardsData.map((card) => (
              <div key={card.id} className="info-card">
                <div className="card-image">
                  <img 
                    src={card.image} 
                    alt={card.title[currentLang] || card.title.ar}
                    onError={(e) => {
                      e.target.src = '/images/HeroHome.png';
                    }}
                  />
                  <div className="card-category">
                    {card.category[currentLang] || card.category.ar}
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">
                    {card.title[currentLang] || card.title.ar}
                  </h3>
                  
                  <p className="card-description">
                    {card.description[currentLang] || card.description.ar}
                  </p>
                  
                  <div className="card-author">
                    <img 
                      src={logo} 
                      alt="Across MENA"
                      className="author-avatar"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.jpg';
                      }}
                    />
                    <span className="author-name">Across MENA</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="page-cta">
            <div className="cta-content">
              <h3>{currentLang === 'ar' ? 'احجز شحنتك الآن' : 'Book Your Shipment Now'}</h3>
              <p>{currentLang === 'ar' ? 'تواصل معنا للحصول على أفضل الأسعار والخدمات للشحن البحري إلى سورية' : 'Contact us for the best rates and services for sea freight to Syria'}</p>
              <button 
                className="cta-button"
                onClick={() => {
                  navigate('/');
                  // الانتقال إلى أعلى الصفحة بعد التوجيه
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {currentLang === 'ar' ? 'احجز الآن' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default SeaFreightSyria;
