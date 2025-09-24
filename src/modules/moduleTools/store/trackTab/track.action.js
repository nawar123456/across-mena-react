import { createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';



export const fetchTrackInfo = createAsyncThunk("trackSlice/fetchTrackInfo", async(params,_) =>{
    

    try{
        const res = await axiosPublic(`tracking/shipments/${params.query}/`,{
            method:"Get",
        });

        const data= res.data;

        return data;


    }catch(error){

        throw(error);
  
      }

  });