import { createSlice } from '@reduxjs/toolkit';
import { postLandForm   } from './landTap.action';


const initialState = {

    loadingForm :false,
    postForm : {},
    errorForm : null,
}

const formLandSlice = createSlice({
    name: "formLandSlice",
    initialState ,

    reducers:{

    },

    extraReducers: (builder)=> {
        builder.addCase(postLandForm.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorCalc = null;
            state.postForm = {};

        });

        builder.addCase(postLandForm.fulfilled, (state,action)=>{

            state.postForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postLandForm.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorForm = action.error.message;
        });

    }

});


export default formLandSlice.reducer;