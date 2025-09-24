import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, text }) => {
  return (
    <div className="feature-card">
      <img src={icon} alt="Feature Icon" className="feature-card__icon" />
      <p className="feature-card__text">{text}</p>
    </div>
  );
};

export default FeatureCard;
