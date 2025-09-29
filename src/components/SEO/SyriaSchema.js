// Schema Markup for Syria-specific content
export const syriaSeaShippingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "شحن بحري إلى سورية - Sea Freight to Syria",
  "description": "خدمات شحن بحري متكاملة من دبي والإمارات إلى جميع المدن السورية مع أفضل الأسعار",
  "provider": {
    "@type": "Organization",
    "name": "Across MENA",
    "url": "https://acrossmena.net",
    "logo": "https://acrossmena.net/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-XX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressRegion": "Dubai"
    }
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Syria",
      "alternateName": "سورية"
    }
  ],
  "serviceType": "Sea Freight Shipping",
  "category": "Logistics and Shipping",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "شحن بحري إلى سورية",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "شحن حاويات 20ft إلى سورية",
          "description": "شحن حاويات 20 قدم إلى الموانئ السورية"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "شحن حاويات 40ft إلى سورية",
          "description": "شحن حاويات 40 قدم إلى الموانئ السورية"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "تخليص جمركي سورية",
          "description": "خدمات التخليص الجمركي للبضائع المتجهة إلى سورية"
        }
      }
    ]
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://acrossmena.net/services/sea-shipping-syria",
    "serviceName": "شحن بحري سورية"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "33.5138",
      "longitude": "36.2765"
    },
    "geoRadius": "500000"
  },
  "keywords": "شحن بحري في سورية, شحن بحري سورية, شحن إلى سورية, حاويات سورية, دبي سورية, الإمارات سورية, أسعار الشحن إلى سورية, تخليص جمركي سورية, شحن بحري دمشق, شحن بحري حلب, ميناء اللاذقية, ميناء طرطوس, شحن بحري من دبي إلى سورية, شحن بحري من الإمارات إلى سورية, أفضل شركة شحن إلى سورية, أسعار شحن بحري سورية, تكلفة الشحن البحري إلى سورية"
};

export const syriaPortsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "موانئ سورية للشحن البحري",
  "description": "قائمة الموانئ السورية التي نقدم لها خدمات الشحن البحري",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Place",
        "name": "ميناء اللاذقية",
        "alternateName": "Latakia Port",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "35.5217",
          "longitude": "35.7898"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "اللاذقية",
          "addressCountry": "Syria"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Place",
        "name": "ميناء طرطوس",
        "alternateName": "Tartus Port",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.8885",
          "longitude": "35.8867"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "طرطوس",
          "addressCountry": "Syria"
        }
      }
    }
  ]
};

export default syriaSeaShippingSchema;
