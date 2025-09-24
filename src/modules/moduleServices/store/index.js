import { combineReducers } from '@reduxjs/toolkit';
import seaFormSlice from './seaTap/seaTap.slice';
import landFormSlice from './landTap/landTap.slice';
import airportFormSlice from './airportTap/airportTap.slice';


const servicesSlice = combineReducers({
    seaFormSlice,
    landFormSlice,
    airportFormSlice,
  });
    
  export default servicesSlice;
  
