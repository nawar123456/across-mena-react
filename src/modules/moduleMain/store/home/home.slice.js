import { createSlice } from '@reduxjs/toolkit';
import { fetchPortsByCountry,fetchTripsBy,postBooking,postAppointment,postContactUs} from './home.action';


const initialState = {
	formData: JSON.parse(localStorage.getItem('formData')) || {

        textDescriptionBook: "",
        textReferenceNumber: "",
        textWeight: "",
        textCommodity: "",
        textPersonName: "",
        textPhoneNumber: "963",
        textPersonEmail: "",
        checkboxGmail: false,
        checkboxWhatsapp: false,
        checkboxPhone: false,
		selectedCommodityId: null,
		selectedCommodityLabel: "",

    },		// formData: {},
    tripsArray:[],
    loadingTrip:false,
    errorTrip:null,

    bookingObject:{},
    portsObject:{},
    portsObjectSave:{},
    detailsBookObject:{},
    userInfo:{},

    loadingForm:false,
    errorForm:null,
    postForm:{},

    postAppointmentForm:{},
    errorAppointmentForm:null,

    postContactForm:{},
    errorContactForm:null,
	shouldClearForm: false, // <--- New flag added here
    globalOceanFreight: 0,
   portsByCountryFrom: [],
   portsByCountryTo: [],
   loadingPorts: false,
   errorPorts: null,

}

const homeSlice = createSlice({
    name: "homeSlice",
    initialState ,

    reducers:{
		setFormData(state, action) {
            state.formData = action.payload;
        },
		setSelectedCommodity(state, action) {
            state.formData.selectedCommodityId = action.payload.id;
            state.formData.selectedCommodityLabel = action.payload.label;
        },
        addBookingObject: (state,action) => {
            state.bookingObject = action.payload;
        },
        addPortsObject: (state,action) => {
            state.portsObject = action.payload;
        },
        savePortsObject: (state,action) => {
            state.portsObjectSave = action.payload;
        },
        addDetailsBookObject: (state,action) => {
            state.detailsBookObject = action.payload;
        },
        addPersonalsObject:(state,action) =>{
            state.userInfo = action.payload;
        },
        // resetTripsArray: (state) => {
        //     state.bookingObject = [];
        // },
		setShouldClearForm: (state, action) => {
            state.shouldClearForm = action.payload;
        },
		setGlobalOceanFreight: (state, action) => { // New reducer
            state.globalOceanFreight = action.payload;
        },
    },


    
    extraReducers: (builder)=> {


        builder.addCase(fetchPortsByCountry.pending, (state) => {
      state.loadingPorts = true;
      state.errorPorts = null;
    })
    .addCase(fetchPortsByCountry.fulfilled, (state, action) => {
      state.loadingPorts = false;
      state.portsByCountry = action.payload; // [{ country, ports }]
    })
    .addCase(fetchPortsByCountry.rejected, (state, action) => {
      if (!action.payload?.canceled) {
        state.loadingPorts = false;
        state.errorPorts = action.payload?.message || 'Failed to fetch ports';
      }
    });


        builder.addCase(fetchTripsBy.pending, (state,action)=>{
            state.loadingTrip =true;
            state.errorTrip = null;
            state.tripsArray=[];

        });

        builder.addCase(fetchTripsBy.fulfilled, (state,action)=>{

            state.tripsArray = action.payload;
            state.loadingTrip =false;
        });

        builder.addCase(fetchTripsBy.rejected, (state,action)=>{
            state.loadingTrip =false;
            state.errorTrip = action.error.message;
        });

        builder.addCase(postBooking.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorForm = null;
            state.postForm = {};

        });

        builder.addCase(postBooking.fulfilled, (state,action)=>{

            state.postForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postBooking.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorForm = action.error.message;
        });

        builder.addCase(postAppointment.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorAppointmentForm = null;
            state.postAppointmentForm = {};

        });

        builder.addCase(postAppointment.fulfilled, (state,action)=>{

            state.postAppointmentForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postAppointment.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorAppointmentForm = action.error.message;
        });

        builder.addCase(postContactUs.pending, (state,action)=>{
            state.loadingForm =true;
            state.errorContactForm = null;
            state.postContactForm = {};

        });

        builder.addCase(postContactUs.fulfilled, (state,action)=>{

            state.postContactForm = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postContactUs.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorContactForm = action.error.message;
        });

    }

});

export const {addBookingObject,addPortsObject,savePortsObject,addDetailsBookObject,addPersonalsObject,setFormData,setSelectedCommodity ,setShouldClearForm,setGlobalOceanFreight} = homeSlice.actions;

export default homeSlice.reducer;
