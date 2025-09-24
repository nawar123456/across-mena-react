import { createSlice } from '@reduxjs/toolkit';
import { postSeaForm ,fetchPortBy  } from './seaTap.action';


const initialState = {
    selectedContainer: null, // Store selected container globally
    loadingPorts:false,
    errorPort:null,
    Ports:[],


    loadingPortsTo:false,
    errorPortTo:null,
    PortsTo:[],



    loadingForm :false,
    postForm : {},
    errorForm : null,



    predictionsCities:[],
    isLoadedMap:false,
    currentRequestId: "",

}



const formSeaSlice = createSlice({
    name: "formSeaSlice",
    initialState ,

    reducers:{

        resetPostForm: (state) => {
            state.postForm = {};
        },
        resetPorts: (state) => {
            state.Ports = [];
        },
        resetPortTo : (state) =>{
            state.PortsTo=[];

        },

        editPorts : (state,action) =>{
            state.Ports = action.payload;
        },
        editPortsTo : (state,action) =>{
            state.PortsTo = action.payload;
        },
        setIsLoadedMap: (state, action) => {
            state.isLoadedMap = action.payload;
        },

		setSelectedContainer: (state, action) => {
			state.selectedContainer = action.payload;
		},
		resetSelectedContainer: (state) => {
			state.selectedContainer = null;
		}
	},

    extraReducers: (builder)=> {
        builder.addCase(postSeaForm.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorForm = null;
            state.postForm = {};

        });

        builder.addCase(postSeaForm.fulfilled, (state,action)=>{

            state.postForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postSeaForm.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorForm = action.error.message;
        });

        builder.addCase(fetchPortBy.pending, (state,action)=>{

            if (action.meta.arg.queryType === 'from') {

                // console.log("from from ")
            state.loadingPorts =true;
            state.errorPort = null;
            state.Ports = [];
            }
            else if (action.meta.arg.queryType === 'to') {

                // console.log("to to ")

                state.loadingPortsTo =true;
                state.errorPortTo = null;
                state.PortsTo = [];
            }

            // state.currentRequestId = action.meta.arg.query;

        });

        builder.addCase(fetchPortBy.fulfilled, (state,action)=>{

            // let i = action.meta.arg.query;

            if (action.meta.arg.queryType === 'from') {
            // if(state.currentRequestId === i){


                state.Ports = action.payload.data;
                // console.log("fullfiled api request whitch canceled : ", action.payload.data)
                // state.currentRequestId = ""
                // }

            state.loadingPorts =false;

            }else if (action.meta.arg.queryType === 'to') {
                // if(state.currentRequestId === i){

                    state.PortsTo = action.payload.data;
                    // state.currentRequestId = ""
                    // }

                state.loadingPortsTo =false;

            }
        });

        builder.addCase(fetchPortBy.rejected, (state,action)=>{

            if (action.meta.arg.queryType === 'from') {
                state.loadingPorts =false;
                state.errorPort = action.error.message;
                state.Ports = [];
            } else if (action.meta.arg.queryType === 'to') {
                state.loadingPortsTo =false;
                state.errorPortTo = action.error.message;
                state.PortsTo = [];
            }

            // console.log("rejected api request whitch canceled : ", action.error.message)


        });

    }

});

export const { setSelectedContainer, resetSelectedContainer, resetPostForm ,
	resetPorts,resetPortTo, editPorts,
	editPortsTo,setIsLoadedMap} = formSeaSlice.actions;

export default formSeaSlice.reducer;
