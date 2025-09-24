import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ImportExport.css';

const ImportExport = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('import');

  const importCards = [
    {
      id: 1,
      title: t('importExportPage.documents.certificateOfOrigin.title'),
      description: t('importExportPage.documents.certificateOfOrigin.description'),
      icon: '📄',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: t('importExportPage.documents.commercialInvoice.title'),
      description: t('importExportPage.documents.commercialInvoice.description'),
      icon: '💰',
      color: '#2196F3'
    },
    {
      id: 3,
      title: t('importExportPage.documents.packingList.title'),
      description: t('importExportPage.documents.packingList.description'),
      icon: '📦',
      color: '#FF9800'
    },
    {
      id: 4,
      title: t('importExportPage.documents.healthCertificate.title'),
      description: t('importExportPage.documents.healthCertificate.description'),
      icon: '🏥',
      color: '#9C27B0'
    },
    {
      id: 5,
      title: t('importExportPage.documents.technicalCertificate.title'),
      description: t('importExportPage.documents.technicalCertificate.description'),
      icon: '🔧',
      color: '#607D8B'
    },
    {
      id: 6,
      title: t('importExportPage.documents.shippingInsurance.title'),
      description: t('importExportPage.documents.shippingInsurance.description'),
      icon: '🛡️',
      color: '#795548'
    }
  ];

  const exportCards = [
    {
      id: 1,
      title: t('importExportPage.documents.certificateOfOrigin.title'),
      description: t('importExportPage.documents.certificateOfOrigin.description'),
      icon: '📄',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: t('importExportPage.documents.commercialInvoice.title'),
      description: t('importExportPage.documents.commercialInvoice.description'),
      icon: '💰',
      color: '#2196F3'
    },
    {
      id: 3,
      title: t('importExportPage.documents.packingList.title'),
      description: t('importExportPage.documents.packingList.description'),
      icon: '📦',
      color: '#FF9800'
    },
    {
      id: 4,
      title: t('importExportPage.documents.healthCertificate.title'),
      description: t('importExportPage.documents.healthCertificate.description'),
      icon: '🏥',
      color: '#9C27B0'
    },
    {
      id: 5,
      title: t('importExportPage.documents.technicalCertificate.title'),
      description: t('importExportPage.documents.technicalCertificate.description'),
      icon: '🔧',
      color: '#607D8B'
    },
    {
      id: 6,
      title: t('importExportPage.documents.shippingInsurance.title'),
      description: t('importExportPage.documents.shippingInsurance.description'),
      icon: '🛡️',
      color: '#795548'
    }
  ];

  const currentCards = activeTab === 'import' ? importCards : exportCards;

  return (
    <div className="import-export-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header">
          <h1 className="page-title">
            {activeTab === 'import' ? t('importExportPage.importTitle') : t('importExportPage.exportTitle')}
          </h1>
          <p className="page-subtitle">
            {activeTab === 'import' 
              ? t('importExportPage.importSubtitle')
              : t('importExportPage.exportSubtitle')
            }
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button 
            className={`toggle-btn ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            <span className="btn-icon">📥</span>
            <span className="btn-text">{t('importExportPage.importBtn')}</span>
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <span className="btn-icon">📤</span>
            <span className="btn-text">{t('importExportPage.exportBtn')}</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="cards-grid">
          {currentCards.map((card) => (
            <div key={card.id} className="document-card">
              <div className="card-header">
                <div 
                  className="card-icon"
                  style={{ backgroundColor: card.color }}
                >
                  {card.icon}
                </div>
                <h3 className="card-title">{card.title}</h3>
              </div>
              <div className="card-body">
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-footer">
                <button className="card-btn">
                  <span>{t('importExportPage.viewDetails')}</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="info-section">
          <div className="info-card">
            <h3>{t('importExportPage.additionalInfo')}</h3>
            <p>
              {activeTab === 'import' 
                ? t('importExportPage.importInfo')
                : t('importExportPage.exportInfo')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
