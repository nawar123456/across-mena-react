import { createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';
// import axios from 'axios';


export const postSeaForm = createAsyncThunk("formSeaSlice/postSeaForm", async(paramsObject,thunkAPI) =>{

    try{
        // const lang = localStorage.getItem('language') || 'ar';

        const res = await axiosPublic.post(`Sea_Shipping/sea_shipping/`,paramsObject);

        const data= res.data;

        console.log(data)

        return data;

    }catch(error){

        throw(error);

    }
});


// let cancelToken;

export const fetchPortBy = createAsyncThunk("formSeaSlice/fetchPortBy", async(params,thunkAPI) =>{

    // Check if there are any previous pending requests
    // if (typeof cancelToken != typeof undefined) {
    //   cancelToken.cancel()
    // }

    // cancelToken = axios.CancelToken.source()
    // const { getState} = thunkAPI;

    // console.log(getState(),"getState()getState()")
    // const {moduleServices} = getState();

    // if (params.query !== moduleServices.seaFormSlice.currentRequestId) {
    //     return
    // }


    try{
        const res = await axiosPublic(`Fee_calculator/search?search=${params.query}`,{
            method:"Get",
            // cancelToken: cancelToken.token,
        });

        const data= res.data;
        const queryType = params.queryType;

        return {data, queryType};

    }catch(error){
        //   if (axios.isCancel(error)) {
        //       console.log('Request omar', error.message);
        //     }

          throw(error);

      }


  });

