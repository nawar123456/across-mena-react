import {  useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

function GoToTop({valueScroll}) {

  const routePath = useLocation();

  const onTop = useCallback(() => {
    if(valueScroll===undefined || valueScroll===0) 
    {window.scrollTo({
      top: 0,
      left: 0,
    });

    }
    else if (valueScroll===-1)
    return
    else{
    window.scrollTo(0, valueScroll);

    }
  },[valueScroll])

  useEffect(() => {


  }, [routePath,onTop]);


}

export default GoToTop;