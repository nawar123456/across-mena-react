import { createSlice } from '@reduxjs/toolkit';
import { fetchAirportBy,postAirportForm  } from './airportTap.action';


const initialState = {

    loadingForm :false,
    postForm : {},
    errorForm : null,

    AirPorts:[],
    loadingAirPorts:false,
    errorAirPort:null,

    loadingAirPortsTo:false,
    errorAirPortTo:null,
    AirPortsTo:[],

}

const formAirPortSlice = createSlice({
    name: "formAirportSlice",
    initialState ,

    reducers:{

        resetPostForm: (state) => {
            state.postForm = {}; 
        },
        resetAirport: (state) => {
            state.AirPorts = []; 
        },
        editAirport : (state,action) =>{
            state.AirPorts = action.payload;
        },

        resetAirportTo: (state) => {
            state.AirPortsTo = []; 
        },
        editAirportTo : (state,action) =>{
            state.AirPortsTo = action.payload;
        },
    },

    extraReducers: (builder)=> {
            
        builder.addCase(fetchAirportBy.pending, (state,action)=>{

            if (action.meta.arg.queryType === 'from') {
                state.loadingAirPorts =true;
                state.errorAirPort = null;
                state.AirPorts = [];
            }
            else if (action.meta.arg.queryType === 'to') {

                state.loadingAirPortsTo =true;
                state.errorAirPortTo = null;
                state.AirPortsTo = [];
            }

        });

        builder.addCase(fetchAirportBy.fulfilled, (state,action)=>{

            if (action.meta.arg.queryType === 'from') {
                // if(state.currentRequestId === i){
                    
    
                    state.AirPorts = action.payload.data;
                    // console.log("fullfiled api request whitch canceled : ", action.payload.data)
                    // state.currentRequestId = ""    
                    // }
    
                state.loadingAirPorts =false;
    
                }else if (action.meta.arg.queryType === 'to') {
                    // if(state.currentRequestId === i){
                    
                        state.AirPortsTo = action.payload.data;
                        // state.currentRequestId = ""    
                        // }
        
                    state.loadingAirPortsTo =false;
        
                }
        });

        builder.addCase(fetchAirportBy.rejected, (state,action)=>{

            if (action.meta.arg.queryType === 'from') {
                state.loadingAirPorts =false;
                state.errorAirPort = action.error.message;
                state.AirPorts = [];
            } else if (action.meta.arg.queryType === 'to') {
                state.loadingAirPortsTo =false;
                state.errorAirPortTo = action.error.message;
                state.AirPortsTo = [];
            }

        });

        builder.addCase(postAirportForm.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorCalc = null;
            state.postForm = {};

        });

        builder.addCase(postAirportForm.fulfilled, (state,action)=>{

            state.postForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postAirportForm.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorForm = action.error.message;
        });

    }

});

export const { resetPostForm ,resetAirportTo,resetAirport, editAirport,editAirportTo} = formAirPortSlice.actions;

export default formAirPortSlice.reducer;