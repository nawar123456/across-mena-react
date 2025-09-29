import './BlogSyria.css';
import { MainContainer } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEO from '../../../../components/SEO/SEO';
import { getSEOData } from '../../../../const/seoTitles';
import { getAllArticles } from '../../../../data/blogArticles';
import BlogCard from '../../components/BlogCard/BlogCard';
// import Image from '../../../../assets/images
const BlogSyria = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'ar';
  
  // الحصول على جميع المقالات
  const allArticles = getAllArticles();
  
  // SEO data for blog page
  const blogSEOData = {
    ar: {
      title: "المدونة - مقالات الشحن والتجارة | Across MENA",
      description: "اقرأ أحدث المقالات حول الشحن البحري والتجارة الدولية. نصائح وأدلة شاملة للشحن إلى سورية والمنطقة العربية.",
      keywords: "مقالات شحن, مدونة شحن, نصائح شحن, دليل شحن سورية, مقالات تجارة"
    },
    en: {
      title: "Blog - Shipping & Trade Articles | Across MENA",
      description: "Read the latest articles about sea freight and international trade. Tips and comprehensive guides for shipping to Syria and the Arab region.",
      keywords: "shipping articles, shipping blog, shipping tips, Syria shipping guide, trade articles"
    }
  };

  const seoData = blogSEOData[currentLang] || blogSEOData.ar;

  const pageContent = {
    ar: {
      title: "المدونة",
      subtitle: "مقالات الشحن والتجارة الدولية",
      description: "اقرأ أحدث المقالات والنصائح حول الشحن البحري والتجارة الدولية. دليل شامل للشحن إلى سورية والمنطقة العربية."
    },
    en: {
      title: "Blog",
      subtitle: "Shipping & International Trade Articles",
      description: "Read the latest articles and tips about sea freight and international trade. Comprehensive guide for shipping to Syria and the Arab region."
    }
  };

  const content = pageContent[currentLang] || pageContent.ar;

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image="https://acrossmena.com/images/blog-featured.jpg"
        url="https://acrossmena.com/blog"
        type="website"
        lang={currentLang}
      />

      <MainContainer>
        <div className="blog-page">
          <header className="blog-page-header">
            <h1 className="page-title">{content.title}</h1>
            <h2 className="page-subtitle">{content.subtitle}</h2>
            <p className="page-description">{content.description}</p>
          </header>

          <div className="blog-articles-grid">
            {allArticles.map((article) => (
              <BlogCard 
                key={article.id}
                article={article}
                currentLang={currentLang}
              />
            ))}
          </div>

          <div className="blog-cta">
            <div className="cta-content">
              <h3>{currentLang === 'ar' ? 'احجز شحنتك الآن' : 'Book Your Shipment Now'}</h3>
              <p>{currentLang === 'ar' ? 'تواصل معنا للحصول على أفضل الأسعار والخدمات' : 'Contact us for the best rates and services'}</p>
              <button 
                className="cta-button"
                onClick={() => navigate('/')}
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

export default BlogSyria;
