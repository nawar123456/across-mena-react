import { createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';

export const postAirportForm = createAsyncThunk("formAirportSlice/postAirportForm", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosPublic.post(`Sea_Shipping/air_freight/`,paramsObject);

        const data= res.data;

        // console.log(data)

        return data;

    }catch(error){

        throw(error);

    }
});


// let cancelToken;

export const fetchAirportBy = createAsyncThunk("formAirportSlice/fetchAirportBy", async(params,_) =>{
    
    // Check if there are any previous pending requests
    // if (typeof cancelToken != typeof undefined) {
    //   cancelToken.cancel()
    // }

    // cancelToken = axios.CancelToken.source()

    try{
        const res = await axiosPublic(`Fee_calculator/airport/?search=${params.query}`,{
            method:"Get",
            // cancelToken: cancelToken.token,
        });
  
        const data= res.data;
        const queryType = params.queryType;

        return {data, queryType};

  
    }catch(error){
  
          throw(error);
  
      }
  
  
  });

