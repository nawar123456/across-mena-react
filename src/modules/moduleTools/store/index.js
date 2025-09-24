import { combineReducers } from '@reduxjs/toolkit';
import accordion from './prohibitedTab/accordion.slice';
import customsCalculator from './calculatorTap/customs.slice';
import trackSlice from './trackTab/track.slice';


const toolsSlice = combineReducers({
    accordion,
    customsCalculator,
    trackSlice
  });
    
  export default toolsSlice;
  
  //  const {.....} = useSelector((state) => state.toolsSlice.accordion);
 //  const customsCalculatorState = useSelector((state) => state.toolsSlice.customsCalculator);