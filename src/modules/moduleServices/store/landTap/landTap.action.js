import { createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';


export const postLandForm = createAsyncThunk("formLandSlice/postLandForm", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosPublic.post(`Sea_Shipping/land_shipping/`,paramsObject);

        const data= res.data;


        return data;

    }catch(error){

        throw(error);

    }
});




