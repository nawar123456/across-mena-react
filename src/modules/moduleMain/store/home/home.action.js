import { createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';
import axios from 'axios';
import { axiosReservation } from '../../../../utils/api/axiosreservation';

let cancelToken;
let cancelTokenPorts; // مفتاح إلغاء منفصل

export const fetchPortsByCountry= createAsyncThunk(
  'homeSlice/fetchPortsByCountry',
  async (country, { rejectWithValue }) => {
    // إلغاء الطلب السابق إذا وُجد
    if (cancelTokenPorts) {
      cancelTokenPorts.cancel('Previous request canceled');
    }

    // إنشاء مصدر إلغاء جديد
    cancelTokenPorts = axios.CancelToken.source();

    try {
      const response = await axiosPublic.get('/Fee_calculator/country-ports/', {
        params: { q: country },
        cancelToken: cancelTokenPorts.token,
      });

      // نتوقع مصفوفة من { country, ports }
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // لا نُرجع خطأ إذا تم الإلغاء
        return rejectWithValue({ message: 'Request canceled', canceled: true });
      } else {
        return rejectWithValue(error.response?.data || 'Error fetching ports');
      }
    }
  }
);


// export const fetchPortsByCountryTo = createAsyncThunk(
//   'homeSlice/fetchPortsByCountry',
//   async (country, { rejectWithValue }) => {
//     // إلغاء الطلب السابق إذا وُجد
//     if (cancelTokenPorts) {
//       cancelTokenPorts.cancel('Previous request canceled');
//     }

//     // إنشاء مصدر إلغاء جديد
//     cancelTokenPorts = axios.CancelToken.source();

//     try {
//       const response = await axiosPublic.get('/Fee_calculator/country-ports/', {
//         params: { q: country },
//         cancelToken: cancelTokenPorts.token,
//       });

//       // نتوقع مصفوفة من { country, ports }
//       return response.data;
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         // لا نُرجع خطأ إذا تم الإلغاء
//         return rejectWithValue({ message: 'Request canceled', canceled: true });
//       } else {
//         return rejectWithValue(error.response?.data || 'Error fetching ports');
//       }
//     }
//   }
// );


export const fetchTripsBy = createAsyncThunk(
  "homeSlice/fetchTripsBy",
  async (params, _) => {
    if (typeof cancelToken !== 'undefined') {
      cancelToken.cancel();
    }

    cancelToken = axios.CancelToken.source();

    try {
      const res = await axiosPublic(
        `price/search/?station_origin=${params.stationFrom}&station_delivery=${params.stationTo}&container=${params.containerType}`,
        {
          method: "get",
          cancelToken: cancelToken.token,
        }
      );
      console.log("🎯 Axios response:", res);

      // Return just the data — assuming your API returns an object like { trips: [...] }
      return res.data.trips ?? res.data;
    } catch (error) {
      throw error;
    }
  }
);


//url should change
export const postBooking = createAsyncThunk("homeSlice/postBooking", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosReservation.post(`Sea_Shipping/booking/`,paramsObject);

        const data= res.data;


        return data;

    }catch(error){

        throw(error);

    }
});

export const postAppointment = createAsyncThunk("homeSlice/postAppointment", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosPublic.post(`Sea_Shipping/helper/`,paramsObject);

        const data= res.data;


        return data;

    }catch(error){

        throw(error);

    }
});

//contact us :
export const postContactUs = createAsyncThunk("homeSlice/postContactUs", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosPublic.post(`Sea_Shipping/contact_us/`,paramsObject);

        const data= res.data;


        return data;

    }catch(error){

        throw(error);

    }
});



      