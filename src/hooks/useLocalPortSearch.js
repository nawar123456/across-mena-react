import { useState, useMemo, useCallback } from 'react';
import { COUNTRIES_AND_PORTS, formatPortsForSearch, searchPortsAndCountries } from '../data/portsAndCountries';

export const useLocalPortSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // تحضير البيانات مرة واحدة فقط
  const formattedData = useMemo(() => {
    return formatPortsForSearch(COUNTRIES_AND_PORTS);
  }, []);

  // دالة البحث المحلية
  const searchPorts = useCallback((searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }

    setIsLoading(true);
    
    // محاكاة تأخير صغير للواقعية (اختياري)
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return searchPortsAndCountries(searchQuery, formattedData);
  }, [formattedData]);

  // دالة البحث مع debounce
  const debouncedSearch = useCallback((searchQuery, delay = 300) => {
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        const results = searchPorts(searchQuery);
        resolve(results);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    });
  }, [searchPorts]);

  // دالة للحصول على الموانئ لدولة معينة
  const getPortsByCountry = useCallback((countryCode) => {
    const country = formattedData.find(item => 
      item.isCountry && item.countries_code === countryCode
    );
    
    return country?.origin?.ports || [];
  }, [formattedData]);

  // دالة للحصول على جميع الدول
  const getAllCountries = useCallback(() => {
    return formattedData.filter(item => item.isCountry);
  }, [formattedData]);

  return {
    query,
    setQuery,
    isLoading,
    searchPorts,
    debouncedSearch,
    getPortsByCountry,
    getAllCountries,
    formattedData
  };
};
