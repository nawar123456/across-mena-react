import { createSlice } from '@reduxjs/toolkit';
import { fetchTrackInfo  } from './track.action';


const initialState = {

    loadingTrack :false,
    trackInfo : {},
    errorTrack : null,


}

const trackSlice = createSlice({
    name: "trackSlice",
    initialState ,

    reducers:{

        clearTrack(state,action){
            state.trackInfo = {}
            },

    },

    extraReducers: (builder)=> {
            
        builder.addCase(fetchTrackInfo.pending, (state,action)=>{
            state.loadingTrack =true;
            state.errorTrack = null;
            state.trackInfo = {};

        });

        builder.addCase(fetchTrackInfo.fulfilled, (state,action)=>{

            state.trackInfo = action.payload;
            state.loadingTrack =false;

        });

        builder.addCase(fetchTrackInfo.rejected, (state,action)=>{
            state.loadingTrack =false;
            state.errorTrack = action.error.message;
        });

    }

});

export const {clearTrack} = trackSlice.actions;

export default trackSlice.reducer;