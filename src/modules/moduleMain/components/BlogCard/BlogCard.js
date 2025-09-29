import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';
import Image from '../../../../assets/images/HeroHome.png';
import logo from '../../../../assets/icons/last_logo_navbar.svg';

const BlogCard = ({ article, currentLang = 'ar' }) => {
  const navigate = useNavigate();

  const title = article.title[currentLang] || article.title.ar;
  const excerpt = article.excerpt[currentLang] || article.excerpt.ar;
  const category = article.category[currentLang] || article.category.ar;
  const readTime = article.readTime[currentLang] || article.readTime.ar;

  // تنسيق تاريخ النشر
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCardClick = () => {
    navigate(`/blog/${article.slug}`);
  };

  return (
    <article className="blog-card" onClick={handleCardClick}>
      <div className="card-image">
        <img 
          src={Image} 
          alt={title}
          onError={(e) => {
            e.target.src = '/images/HeroHome.png';
          }}
        />
        <div className="card-category">{category}</div>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="card-date">{formatDate(article.publishDate)}</span>
          <span className="card-read-time">{readTime}</span>
        </div>
        
        <h3 className="card-title">{title}</h3>
        
        <p className="card-excerpt">{excerpt}</p>
        
        <div className="card-tags">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="card-author">
          <img 
            src={logo} 
            alt={article.author.name[currentLang] || article.author.name.ar}
            className="author-avatar"
            onError={(e) => {
              e.target.src = '/images/default-avatar.jpg';
            }}
          />
          <span className="author-name">
            {article.author.name[currentLang] || article.author.name.ar}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
