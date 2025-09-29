import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainContainer } from '../../../../components';
import SEO from '../../../../components/SEO/SEO';
import { getArticleBySlug, getRelatedArticles } from '../../../../data/blogArticles';
import BlogCard from '../../components/BlogCard/BlogCard';
import './BlogDetail.css';
import Logo from '../../../../assets/icons/last_logo_navbar.svg';
import Container20 from '../../../../assets/images/20ft.webp';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';

  // الحصول على المقالة
  const article = getArticleBySlug(slug);
  
  // إذا لم توجد المقالة، إعادة توجيه إلى 404
  if (!article) {
    navigate('/404');
    return null;
  }

  // الحصول على المقالات ذات الصلة
  const relatedArticles = getRelatedArticles(slug, 3);

  // البيانات حسب اللغة
  const title = article.title[currentLang] || article.title.ar;
  const content = article.content[currentLang] || article.content.ar;
  const author = article.author.name[currentLang] || article.author.name.ar;
  const authorBio = article.author.bio[currentLang] || article.author.bio.ar;
  const readTime = article.readTime[currentLang] || article.readTime.ar;
  const category = article.category[currentLang] || article.category.ar;
  const seoData = article.seo[currentLang] || article.seo.ar;

  // تنسيق تاريخ النشر
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={article.featuredImage}
        url={`https://acrossmena.com/blog/${slug}`}
        type="article"
        lang={currentLang}
      />

      <MainContainer>
        <article className="blog-detail">
          {/* Header Section */}
          <header className="blog-detail-header">
            {/* <div className="blog-breadcrumb">
              <span 
                className="breadcrumb-link"
                onClick={() => navigate('/')}
              >
                {currentLang === 'ar' ? 'الرئيسية' : 'Home'}
              </span>
              <span className="breadcrumb-separator">/</span>
              <span 
                className="breadcrumb-link"
                onClick={() => navigate('/blog')}
              >
                {currentLang === 'ar' ? 'المدونة' : 'Blog'}
              </span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{category}</span>
            </div> */}
{/* 
            <div className="blog-meta">
              <span className="blog-category">{category}</span>
              <span className="blog-date">{formatDate(article.publishDate)}</span>
              <span className="blog-read-time">{readTime}</span>
            </div> */}

            <h1 className="blog-title">{title}</h1>
            
            <p className="blog-excerpt">
              {article.excerpt[currentLang] || article.excerpt.ar}
            </p>

            <div className="blog-author">
              <img 
                src={Logo} 
                alt={author}
                className="author-avatar"
                onError={(e) => {
                  e.target.src = '/images/default-avatar.jpg';
                }}
              />
              <div className="author-info">
                <h4 className="author-name">{author}</h4>
                <p className="author-bio">{authorBio}</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {/* <div className="blog-featured-image">
            <img 
              src={Logo} 
              alt={title}
              onError={(e) => {
                e.target.src = '/images/default-blog-image.jpg';
              }}
            />
          </div> */}

          {/* Content Section */}
          <div className="blog-content">
            <div className="content-introduction">
              <p className="introduction-text">{content.introduction}</p>
            </div>

            {content.sections.map((section, index) => (
              <section key={index} className="content-section">
                <h2 className="section-title">{section.title}</h2>
                
                <div className="section-content">
                  <p className="section-text">{section.content}</p>
                  
                  {section.image && (
                    <div className="section-image">
                      <img 
                        src={Container20} 
                        alt={section.title}
                        onError={(e) => {
                          e.target.src = '/images/default-section-image.jpg';
                        }}
                      />
                    </div>
                  )}

                  {section.features && section.features.length > 0 && (
                    <div className="section-features">
                      <h3 className="features-title">
                        {currentLang === 'ar' ? 'المميزات الرئيسية:' : 'Key Features:'}
                      </h3>
                      <ul className="features-list">
                        {section.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="feature-item">
                            <span className="feature-icon">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            ))}

            <div className="content-conclusion">
              <h2 className="conclusion-title">
                {currentLang === 'ar' ? 'الخلاصة' : 'Conclusion'}
              </h2>
              <p className="conclusion-text">{content.conclusion}</p>
            </div>
          </div>

          {/* Tags Section */}
          {/* <div className="blog-tags">
            <h3 className="tags-title">
              {currentLang === 'ar' ? 'العلامات:' : 'Tags:'}
            </h3>
            <div className="tags-list">
              {article.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                </span>
              ))}
            </div>
          </div> */}

          {/* CTA Section */}
          <div className="blog-cta">
            <div className="cta-content">
              <h3 className="cta-title">
                {currentLang === 'ar' ? 'احجز شحنتك الآن' : 'Book Your Shipment Now'}
              </h3>
              <p className="cta-description">
                {currentLang === 'ar' 
                  ? 'تواصل معنا للحصول على أفضل الأسعار والخدمات' 
                  : 'Contact us for the best rates and services'
                }
              </p>
              <button 
                className="cta-button"
                onClick={() => navigate('/')}
              >
                {currentLang === 'ar' ? 'احجز الآن' : 'Book Now'}
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="related-articles">
              <h3 className="related-title">
                {currentLang === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
              </h3>
              <div className="related-grid">
                {relatedArticles.map((relatedArticle) => (
                  <BlogCard 
                    key={relatedArticle.id}
                    article={relatedArticle}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </MainContainer>
    </>
  );
};

export default BlogDetail;
