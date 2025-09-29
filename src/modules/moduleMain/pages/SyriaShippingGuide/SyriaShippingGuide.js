import './SyriaShippingGuide.css';
import { MainContainer } from '../../../../components';
import { useTranslation } from 'react-i18next';
import SEO from '../../../../components/SEO/SEO';
import Logo from '../../../../assets/icons/last_logo_navbar.svg';

const SyriaShippingGuide = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  
  // SEO data for comprehensive Syria guide
  const seoData = {
    ar: {
      title: "دليل شامل: شحن بحري في سورية - أسعار وطرق وموانئ 2024 | Across MENA",
      description: "دليل شامل للشحن البحري في سورية. تعرف على أفضل الطرق والأسعار والموانئ السورية. نصائح للتخليص الجمركي وحفظ التكاليف. خدمة 24/7",
      keywords: "شحن بحري في سورية, دليل الشحن إلى سورية, أسعار الشحن سورية, موانئ سورية, تخليص جمركي سورية, شحن دمشق, شحن حلب, شحن اللاذقية, طرطوس, شركة شحن سورية, أسعار حاويات سورية"
    },
    en: {
      title: "Complete Guide: Sea Freight in Syria - Rates, Routes & Ports 2024 | Across MENA",
      description: "Complete guide to sea freight in Syria. Learn about best routes, rates, and Syrian ports. Customs clearance tips and cost-saving strategies. 24/7 service",
      keywords: "sea freight in Syria, shipping guide Syria, Syria shipping rates, Syria ports, Syria customs clearance, Damascus shipping, Aleppo shipping, Latakia shipping, Tartus, Syria shipping company, Syria container rates"
    }
  };

  const currentSeo = seoData[currentLang] || seoData.ar;

  const guideContent = {
    ar: {
      title: "دليل شامل: شحن بحري في سورية",
      subtitle: "كل ما تحتاج معرفته عن الشحن البحري إلى سورية",
      sections: [
        {
          title: "مقدمة عن الشحن البحري في سورية",
          content: "سورية من الدول المهمة في المنطقة العربية، وتتميز بموقعها الاستراتيجي على البحر الأبيض المتوسط. تتمتع سورية بميناءين رئيسيين متطورين يستقبلان الحاويات الكبيرة ويقدمان خدمات شحن بحري عالية الجودة.",
          image: "syria-ports-overview"
        },
        {
          title: "الموانئ السورية الرئيسية",
          content: "تتمتع سورية بميناءين رئيسيين: ميناء اللاذقية وميناء طرطوس. كلاهما متطور ويستقبل الحاويات الكبيرة، مع وجود خطوط ملاحية مباشرة من دبي والإمارات.",
          details: [
            "ميناء اللاذقية: الميناء الرئيسي لسورية، يستقبل حاويات 20ft و40ft",
            "ميناء طرطوس: ميناء متطور يخدم المنطقة الشمالية من سورية",
            "خدمات التخليص الجمركي المتقدمة في كلا الميناءين",
            "ربط مباشر بجميع الموانئ الرئيسية في الخليج"
          ]
        },
        {
          title: "أنواع الحاويات المتاحة للشحن إلى سورية",
          content: "نوفر جميع أنواع الحاويات للشحن إلى سورية، مع أسعار تنافسية وخدمة مميزة.",
          types: [
            { name: "حاويات 20 قدم", desc: "مناسبة للبضائع الصغيرة والمتوسطة", price: "من $800" },
            { name: "حاويات 40 قدم", desc: "مناسبة للبضائع الكبيرة", price: "من $1200" },
            { name: "حاويات 40 قدم عالية", desc: "للبضائع الطويلة", price: "من $1400" },
            { name: "حاويات مبردة", desc: "للمواد الغذائية والدوائية", price: "حسب الطلب" }
          ]
        },
        {
          title: "أسعار الشحن البحري إلى سورية",
          content: "نقدم أفضل الأسعار للشحن البحري إلى سورية، مع ضمان الجودة والموثوقية.",
          pricing: [
            "شحن حاوية 20ft من دبي إلى اللاذقية: من $800",
            "شحن حاوية 40ft من دبي إلى اللاذقية: من $1200",
            "شحن حاوية 20ft من أبوظبي إلى طرطوس: من $850",
            "شحن حاوية 40ft من دبي إلى طرطوس: من $1250"
          ]
        },
        {
          title: "المدن السورية التي نخدمها",
          content: "نقدم خدمات الشحن البحري إلى جميع المدن السورية الرئيسية.",
          cities: [
            { name: "دمشق", port: "ميناء اللاذقية", distance: "200 كم" },
            { name: "حلب", port: "ميناء اللاذقية", distance: "150 كم" },
            { name: "اللاذقية", port: "ميناء اللاذقية", distance: "0 كم" },
            { name: "طرطوس", port: "ميناء طرطوس", distance: "0 كم" },
            { name: "حمص", port: "ميناء اللاذقية", distance: "100 كم" },
            { name: "حماه", port: "ميناء طرطوس", distance: "80 كم" }
          ]
        },
        {
          title: "خدمات التخليص الجمركي في سورية",
          content: "نقدم خدمات تخليص جمركي متكاملة في سورية، مع فريق من الخبراء المتخصصين في القوانين الجمركية السورية.",
          services: [
            "إعداد جميع الوثائق الجمركية المطلوبة",
            "متابعة إجراءات التخليص في الموانئ",
            "دفع الرسوم الجمركية نيابة عنك",
            "ترتيب النقل البري من الميناء إلى وجهتك النهائية"
          ]
        }
      ]
    },
    en: {
      title: "Complete Guide: Sea Freight in Syria",
      subtitle: "Everything you need to know about sea freight to Syria",
      sections: [
        {
          title: "Introduction to Sea Freight in Syria",
          content: "Syria is an important country in the Arab region, distinguished by its strategic location on the Mediterranean Sea. Syria has two main developed ports that receive large containers and provide high-quality sea freight services.",
          image: "syria-ports-overview"
        },
        {
          title: "Main Syrian Ports",
          content: "Syria has two main ports: Latakia Port and Tartus Port. Both are developed and receive large containers, with direct shipping lines from Dubai and the Emirates.",
          details: [
            "Latakia Port: Syria's main port, receives 20ft and 40ft containers",
            "Tartus Port: A developed port serving northern Syria",
            "Advanced customs clearance services at both ports",
            "Direct connection to all major Gulf ports"
          ]
        }
      ]
    }
  };

  const content = guideContent[currentLang] || guideContent.ar;

  return (
    <>
      <SEO 
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        image="https://acrossmena.net/images/syria-shipping-guide.jpg"
        url="https://acrossmena.net/guide/syria-shipping"
        type="article"
        lang={currentLang}
      />

      <MainContainer>
        <article className="syria-guide">
          <header className="guide-header">
            <h1>{content.title}</h1>
            <p className="guide-subtitle">{content.subtitle}</p>
          </header>

          <div className="guide-content">
            {content.sections.map((section, index) => (
              <section key={index} className="guide-section">
                <h2>{section.title}</h2>
                <p className="section-intro">{section.content}</p>
                
                {section.details && (
                  <ul className="section-details">
                    {section.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
                
                {section.types && (
                  <div className="container-types">
                    {section.types.map((type, idx) => (
                      <div key={idx} className="type-card">
                        <h4>{type.name}</h4>
                        <p>{type.desc}</p>
                        <span className="price">{type.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {section.pricing && (
                  <div className="pricing-list">
                    {section.pricing.map((price, idx) => (
                      <div key={idx} className="price-item">{price}</div>
                    ))}
                  </div>
                )}
                
                {section.cities && (
                  <div className="cities-grid">
                    {section.cities.map((city, idx) => (
                      <div key={idx} className="city-card">
                        <h4>{city.name}</h4>
                        <p>الميناء: {city.port}</p>
                        <span>المسافة: {city.distance}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {section.services && (
                  <ul className="services-list">
                    {section.services.map((service, idx) => (
                      <li key={idx}>✓ {service}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="guide-cta">
            <h3>احجز شحنتك إلى سورية الآن</h3>
            <p>تواصل معنا للحصول على أفضل الأسعار والخدمات</p>
            <a href="/services/sea-shipping-syria" className="cta-button">
              احجز الآن
            </a>
          </div>
        </article>
      </MainContainer>
    </>
  );
};

export default SyriaShippingGuide;
