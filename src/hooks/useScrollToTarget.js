import { useEffect } from 'react';

const useScrollToTarget = (targetRef, offset = { small: 20, large: 90 }) => {
  useEffect(() => {
    if (targetRef.current) {
      const targetElement = targetRef.current;
      const scrollOffset =  ((targetElement.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop) - (window.innerWidth < 800 ? offset.small : offset.large));
      window.scrollTo({
        top: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, []);
};

export default useScrollToTarget;