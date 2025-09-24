import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from './home/home.slice';


const mainSlice = combineReducers({
    homeSlice,
  });
    
  export default mainSlice;
  
