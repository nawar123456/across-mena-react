import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalPortSearch } from '../../hooks/useLocalPortSearch';
import { ReactComponent as MenaIcon } from '../../assets/icons/Mena_Line.svg';
import './LocalPortSearch.css';

const LocalPortSearch = ({
  placeholder,
  onSelect,
  selectedValue,
  field,
  Icon,
  recentValues = [],
  errorValue,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [isShowingCountryPorts, setIsShowingCountryPorts] = useState(false);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const {
    isLoading,
    searchPorts,
    debouncedSearch,
    getPortsByCountry,
    formattedData
  } = useLocalPortSearch();

  // البحث المحلي مع debounce
  const handleSearch = useCallback(async (query) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 2) {
      setSearchResults([]);
      setShowRecent(true);
      return;
    }

    setShowRecent(false);
    
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await debouncedSearch(query);
      setSearchResults(results);
    }, 300);
  }, [debouncedSearch]);

  // معالجة تغيير النص
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
    setIsShowingCountryPorts(false); // إعادة تعيين الحالة عند البحث الجديد
    
    // إذا بدأ المستخدم في الكتابة، أزل الميناء المحدد للسماح بالبحث عن ميناء جديد
    if (hasSelectedPort && value !== (selectedValue.name || selectedValue.origin?.label_ar || selectedValue.origin?.label)) {
      if (onSelect) {
        onSelect(field, null);
      }
    }
    
    if (value.length < 2) {
      setShowRecent(true);
    }
  };

  // معالجة اختيار عنصر
  const handleSelect = (item) => {
    // إذا كان العنصر دولة، لا يمكن اختيارها مباشرة
    if (item.isCountry) {
      // عرض جميع الموانئ في هذه الدولة مع إضافة معلومات الدولة لكل ميناء
      const countryPorts = item.origin?.ports || [];
      const formattedPorts = countryPorts.map(port => ({
        ...port,
        origin: {
          id: item.origin.id,
          lang: item.origin.lang,
          label: item.origin.label,
          label_ar: item.origin.label_ar,
          ImageURL: item.origin.ImageURL,
          countries_code: item.origin.countries_code,
          countryGroups: item.origin.countryGroups
        }
      }));
      setSearchResults(formattedPorts);
      setSearchQuery(item.origin?.label || item.origin?.label_ar);
      setIsShowingCountryPorts(true); // تم النقر على دولة
      return; // لا نغلق القائمة ولا نختار الدولة
    }
    
    // إذا كان العنصر ميناء، يمكن اختياره
    const displayName = item.name || item.origin?.label || item.origin?.label_ar;
    setSearchQuery(displayName);
    setSearchResults([]);
    setIsOpen(false);
    setShowRecent(false);
    setIsShowingCountryPorts(false); // إعادة تعيين الحالة
    
    if (onSelect) {
      onSelect(field, item);
    }
  };

  // معالجة النقر خارج المكون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تحديث قيمة الإدخال عند تغيير القيمة المحددة
  useEffect(() => {
    if (selectedValue && selectedValue.name) {
      const displayValue = selectedValue.name || 
                          selectedValue.origin?.label_ar || 
                          selectedValue.origin?.label || '';
      setSearchQuery(displayValue);
    } else if (selectedValue === null) {
      setSearchQuery('');
    }
  }, [selectedValue]);

  // تنظيف timeout عند إلغاء المكون
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const displayResults = showRecent ? recentValues : searchResults;

  // تحديد ما إذا كان هناك ميناء محدد
  const hasSelectedPort = selectedValue && selectedValue.port_code && selectedValue.name;

  return (
    <div className={`local-port-search ${className}`}>
        <div className="search-input-container">
          {Icon && <div className="search-icon">{Icon}</div>}
          
          {/* عرض الـ input مع إمكانية إضافة عناصر داخلية */}
          <div className="input-wrapper">
            {/* عرض علم البلد ورمز الميناء إذا كان هناك ميناء محدد */}
            {hasSelectedPort && (
              <div className="input-display-elements">
                {selectedValue.origin?.ImageURL && (
                  <img 
                    src={selectedValue.origin.ImageURL} 
                    alt={selectedValue.origin.label || 'Country flag'}
                    className="country-flag-in-input"
                    onError={(e) => {
                      // إخفاء الصورة إذا فشل تحميلها
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                {selectedValue.port_code && (
                  <span className="port-code-in-input">({selectedValue.port_code})</span>
                )}
              </div>
            )}
            
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className={`search-input ${errorValue ? 'error' : ''} ${hasSelectedPort ? 'has-selected-port' : ''}`}
            />
          </div>
          
          <div className="input-anchor-icon">{Icon}</div>
          {isLoading && <div className="loading-spinner">⟳</div>}
        </div>

      {isOpen && (
        <div ref={dropdownRef} className="search-dropdown">
          {showRecent && recentValues.length > 0 && (
            <div className="recent-section">
              <div className="section-title">الاختيارات الأخيرة</div>
              {recentValues.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item recent-item"
                  onClick={() => handleSelect(item)}
                >
                  <div className="item-content">
                    <div className="item-name">{item.name}</div>
                    {item.origin && (
                      <div className="item-country">
                        {item.origin.ImageURL && (
                          <img 
                            src={item.origin.ImageURL} 
                            alt={item.origin.label}
                            className="country-flag"
                            onError={(e) => {
                              // إخفاء الصورة إذا فشل تحميلها
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        {item.origin.label_ar || item.origin.label}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showRecent && searchResults.length > 0 && (
            <div className="results-section">
              {/* عنوان القسم فقط عند عرض موانئ دولة معينة */}
              {isShowingCountryPorts && searchQuery && (
                <div className="section-title country-ports-title">
                  Ports of <span className="country-name-highlight">{searchQuery}</span>
                </div>
              )}
              
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className={`dropdown-item ${item.isCountry ? 'country-item' : 'port-item'}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="item-content">
                    {item.isCountry ? (
                      <div className="country-item-content">

                        <span className="country-name">
                          {item.origin.label || item.origin.label_ar}
                        </span>

                        <span className="ports-count">
                          {item.origin.ports?.length || 0} ميناء
                        </span>
                        <span className="country-code">({item.countries_code})</span>

                        {item.origin.ImageURL && (
                          <img 
                            src={item.origin.ImageURL} 
                            alt={item.origin.label}
                            className="country-flag"
                            onError={(e) => {
                              // إخفاء الصورة إذا فشل تحميلها
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                   
                     
                      </div>
                    ) : (
                      <div className="port-item-content">
                        <span className="port-name-local">{item.name}</span>
                        <span className="port-code">({item.port_code})</span>
                        <MenaIcon className="mena-icon" />

                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showRecent && searchResults.length === 0 && searchQuery.length >= 2 && (
            <div className="no-results">
              <div className="no-results-text">لا توجد نتائج</div>
            </div>
          )}
        </div>
      )}

      {errorValue && (
        <div className="error-message">{errorValue}</div>
      )}
    </div>
  );
};

export default LocalPortSearch;
