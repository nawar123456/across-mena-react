import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export  const usePreviousUrl = () => {
	const location = useLocation();
    const prevUrlRef = useRef(null);

    useEffect(() => {
        // Store the previous path whenever the location changes
        prevUrlRef.current = location.pathname;
    }, [location]);

    return prevUrlRef.current;
};
