import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { axiosPublic } from '../../../../utils/api/axios';
import axios from 'axios';

const initialState = {

    loadingFeeCalc :false,
    feeCalculator : {
        arrayFee:[],
        totalFee :0
    },
    errorCalc : null,

    // loadingCountry: false,
    arrayCountries : [],
    errorCountry : null,

    loadingCustomCalc : false,
    customValues : {},

    currentRequestId: undefined,
    getLastItem:"",
    getLastItemSea:"",

}

// let CancelToken = axios.CancelToken;
let cancelToken


export const fetchFeeCalculator = createAsyncThunk("customsCalculator/fetchFeeCalculator", async(params,thunkAPI) =>{

  //Check if there are any previous pending requests
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel()
  }

  cancelToken = axios.CancelToken.source()

    // const { getState} = thunkAPI;

    // const {customsCalculator} = getState();

    // if (params.query !== customsCalculator.currentRequestId) {
    //     return
    // }



    try{
        const res = await axiosPublic(`/Fee_calculator/fees/?search=${params.query}&page=${params.page}`,{
            method:"Get",
            cancelToken: cancelToken.token,
        });



        const data= res.data;
        return data;

    }catch(error){
        if (axios.isCancel(error)) {
            console.log(axios.isCancel(error),"axios.isCancel(error)")
            // throw(error);

          }else{
            throw(error);

          }


    }


});


export const fetchOrigins = createAsyncThunk("customsCalculator/fetchOrigins", async(_,thunkAPI) =>{
    try{
        const res = await axiosPublic(`/Fee_calculator/origin/`,{
            method:"Get",
        });

        const data= res.data;
        return data;

    }catch(error){

        throw(error);

    }


});

export const fetchCustomValues = createAsyncThunk("customsCalculator/fetchCustomValues" , async(paramsObject,thunkAPI)=>{

    try{
        const res = await axiosPublic.post(`Fee_calculator/multi_calculate/`,paramsObject);

        const data= res.data;

        return data;

    }catch(error){

        throw(error);

    }
})


const customsCalcSlice = createSlice({
    name: "customsCalculator",
    initialState ,

    reducers:{

        resetFeeCalculator: (state) => {
            state.feeCalculator = {
                arrayFee:[],
                totalFee :0
            };
        },

        getLastItemValue : (state,action) =>{
            state.getLastItem = action.payload;
        },
        getLastItemValueSea : (state,action) =>{
            state.getLastItemSea = action.payload;
        },
        getLastItemValueEmpty: (state,action) =>{
            state.getLastItem = "";
        }
    },

    extraReducers: (builder)=> {
        builder.addCase(fetchFeeCalculator.pending, (state,action)=>{
            state.loadingFeeCalc =true;
            state.errorCalc = null;
            // state.currentRequestId = action.meta.arg.query;
            console.log("state.feeCalculator.arrayFee",state.feeCalculator.arrayFee?.length)


        });

        builder.addCase(fetchFeeCalculator.fulfilled, (state,action)=>{
            // let i = action.meta.arg.query;
            // if(state.currentRequestId === i){

                if(action.payload?.results){
                state.feeCalculator.arrayFee =  [...state.feeCalculator.arrayFee ,...action.payload.results];

                console.log("state.feeCalculator.arrayFee",state.feeCalculator.arrayFee?.length)
                // console.log("state.feeCalculator.results",action.payload.results)

                state.feeCalculator.totalFee = Math.ceil(action.payload.count/10)
                }
                // state.currentRequestId = undefined
                // }
                console.log("state.feeCalculator.arrayFee",state.feeCalculator.arrayFee?.length)

            state.loadingFeeCalc =false;
        });

        builder.addCase(fetchFeeCalculator.rejected, (state,action)=>{
            state.loadingFeeCalc =false;
            state.feeCalculator = { arrayFee:[], totalFee :0}
            state.errorCalc = action.error.message;
        });

        builder.addCase(fetchOrigins.pending, (state)=>{
            // state.loadingCountry =true;
            state.errorCountry = null;
        });

        builder.addCase(fetchOrigins.fulfilled, (state,action)=>{
            // state.loadingCountry =false;
            state.arrayCountries = action.payload;

        });

        builder.addCase(fetchOrigins.rejected, (state,action)=>{
            // state.loadingCountry =false;
            state.arrayCountries = [];
            state.errorCountry = action.error.message;
        });

        builder.addCase(fetchCustomValues.pending, (state)=>{
            state.loadingCustomCalc =true;
        });

        builder.addCase(fetchCustomValues.fulfilled, (state,action)=>{
            state.loadingCustomCalc =false;
            state.customValues = action.payload;

        });

        builder.addCase(fetchCustomValues.rejected, (state,action)=>{
            state.loadingCustomCalc =false;
            state.customValues = {};
        });

    }
 
});

export const { resetFeeCalculator ,getLastItemValue , getLastItemValueSea , getLastItemValueEmpty} = customsCalcSlice.actions;

export default customsCalcSlice.reducer;
