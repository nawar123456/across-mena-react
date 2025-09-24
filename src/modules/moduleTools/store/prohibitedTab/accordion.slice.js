import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { createNestedStructure , groupDataByKeys } from './function';
import { axiosPublic } from '../../../../utils/api/axios';
import axios from 'axios';

const initialState = {
    selectedCard:{},
    sections:[],
    sectionChildren:{},
    parentTwo:{},
    parentTwoD:{},
    parentFinal:{},
    singleNote:[],
    searchInfo:{},
    singleCommerical:{},
    loading:false,
    error :null,

    loading22:false,
    error22 :null,

    loading23:false,
    error23 :null,

    loading2:false,
    loading3:false,
    loading4:false,

    loading5:true,
    loading6:false,
    loadingCommercial:false,

    currentRequestId: undefined,
    currentRequestIdParent2: undefined,
    currentRequestIdParentLast: undefined,

    isOpenShare: null,
    isResetIcon:false,

    // error2 :null,
//     error3 :null,
//     error4 :null,
    // error5 :null,
    // error6 :null,
    // errorCommercial :null,
    
    stateScrollValue : 0,

    activeTab :{},
    isOpen : {},
    isSearch : false,

    objectFeesModal:null,

    loadingForm :false,
    errorForm : null,
    postFormFeedBack : {},
}
export const fetchAllChapters = createAsyncThunk("accordion/fetchAllChapters", async(_,thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;

    try{
        const res = await axiosPublic("/tree_view/chapters",{
            method:"Get",
        });

        const data= res.data;

        return data;

    }catch(error){


        throw(error);

    }


});

export const fetchAllSub_Chapters = createAsyncThunk("accordion/fetchAllSub_Chapters", async(_,thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;

    try{
        const res = await axiosPublic("/tree_view/sub_chapters",{
            method:"Get",
        });

        const data= res.data;

        return data;

    }catch(error){


        throw(error);

    }


});

export const fetchSections = createAsyncThunk("accordion/fetchSections", async(_,thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;

    try{
        const res = await axiosPublic("/tree_view/sections",{
            method:"Get",
        });

        const data= res.data;

        return data;

    }catch(error){


        throw(error);

    }


});

let cancelToken;

export const fetchChildSection = createAsyncThunk("accordion/fetchChildSection", async(id, thunkAPI) =>{

      //Check if there are any previous pending requests
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel()
  }
    cancelToken = axios.CancelToken.source()
    // const { getState} = thunkAPI;

    // const {accordion} = getState();

    // if (id !== accordion.currentRequestId) {
    //     return
    // }

    try{
        const res = await axiosPublic(`/tree_view/api/section/${id}`,{
            method:"Get",
            cancelToken: cancelToken.token
        });
        
        const data=  res.data.chapters;
        
        return data;

    }catch(error){
        throw error;
    }

});

let cancelToken2;
export const fetchParentTwo = createAsyncThunk("accordion/fetchParentTwo", async(id, thunkAPI) =>{

    if (typeof cancelToken2 != typeof undefined) {
        cancelToken2.cancel()
      }
      cancelToken2 = axios.CancelToken.source()

    // const { getState} = thunkAPI;
    // const {accordion} = getState();

    
    // if (id !== accordion.currentRequestIdParent2) {
    //     return
    // }

    try{
        const res = await axiosPublic(`/tree_view/api/chapter/${id}`,{
            method:"Get",
            cancelToken: cancelToken2.token

        });
        const data=  res.data.sub_chapters;

        return data;

    }catch(error){

        throw error;

    }


});

let cancelToken3;

export const fetchParentFinal = createAsyncThunk("accordion/fetchParentFinal", async(id, thunkAPI) =>{
    
    if (typeof cancelToken3 != typeof undefined) {
        cancelToken3.cancel()
      }
      cancelToken3 = axios.CancelToken.source()
    // const { getState} = thunkAPI;

    // const {accordion} = getState();

    // if (id !== accordion.currentRequestIdParentLast) {
    //     return
    // }

    try{
        const res = await axiosPublic(`/tree_view/api/sub_chapter_with_import/${id}`,{
            method:"Get",
            cancelToken: cancelToken3.token

        });
        const data= res.data.fees;

        return data;

    }catch(error){

        throw(error);

    }


});

let previousCancelToken;

export const searchAccordion = createAsyncThunk("accordion/searchAccordion", async(id, thunkAPI) => {
    // If there's a previous request, cancel it
    if (previousCancelToken) {
        previousCancelToken.cancel("canceled");
    }

    // Create a new cancel token for the current request
    const cancelTokenSource = axios.CancelToken.source();
    previousCancelToken = cancelTokenSource; // Store the cancel token for the current request

    try {
        const res = await axiosPublic(`/tree_view/search/?search=${id}`, {
            method: "Get",
            cancelToken: cancelTokenSource.token
        });

        const data = res.data;
        return data;
    } catch (error) {
        // Check if the error was due to the request being canceled
        if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
        } else {
            throw error;
        }
    }
});
//NotesSectionID
export const fetchSectionNote= createAsyncThunk("accordion/fetchSectionNote", async(id, thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;
    
    try{
        const res = await axiosPublic(`/tree_view/api/notes_by_section/${id}`,{
            method:"Get",
        });
        const data= res.data;

        return data;

    }catch(error){

        throw(error);
    }
});


//NotesChapterID
export const fetchNoteWithId= createAsyncThunk("accordion/fetchNoteWithId", async(id, thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;
    
    try{
        const res = await axiosPublic(`/tree_view/api/notes_by_chapter/${id}`,{
            method:"Get",

        });
        const data= res.data;

        return data;

    }catch(error){

        throw(error);
    }
});

//NotesSubChapeterID
export const fetchSubChapterNote= createAsyncThunk("accordion/fetchSubChapterNote", async(id, thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;
    
    try{
        const res = await axiosPublic(`/tree_view/api/notes_by_subchapter/${id}`,{
            method:"Get",
        });
        const data= res.data;

        return data;

    }catch(error){

        throw(error);
    }
});

//NotesFeesID
export const fetchFeesNote= createAsyncThunk("accordion/fetchFeesNote", async(id, thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;
    
    try{
        const res = await axiosPublic(`/tree_view/api/notes_by_fee/${id}`,{
            method:"Get",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        });
        const data= res.data;

        return data;

    }catch(error){

        throw(error);
    }
});

//CommericalByFees
export const fetchCommerial= createAsyncThunk("accordion/fetchCommerial", async(id, thunkAPI) =>{

    // const { rejectedWithValue} = thunkAPI;
    
    try{
        const res = await axiosPublic(`/tree_view/second-description/${id}`,{
            method:"Get",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        });
        const data= res.data;


        return data;

    }catch(error){

        throw(error);
    }
});

export const postFeedBack = createAsyncThunk("accordion/postFeedBack", async(paramsObject,thunkAPI) =>{

    try{
        const res = await axiosPublic.post(`Sea_Shipping/FeedBack/`,paramsObject);

        const data= res.data;

        return data;

    }catch(error){

        throw(error);

    }
});

const accordionSlice = createSlice({
    name: "accordion",
    initialState ,

    reducers:{

        storeObjectFeesModal(state,action){
        state.objectFeesModal = action.payload
        },

        storeSelected(state,action) {
            state.selectedCard = ({...state.selectedCard, [action.payload]: !(state.selectedCard[action.payload])})
        },

        storeSelected2(state,action) {
            state.selectedCard = ({...state.selectedCard, [action.payload]: (state.selectedCard[action.payload])})
        },

        saveScrollValue(state,action) {
            state.stateScrollValue = action.payload
        },


        clearSelectedCard: (state) => {
            state.selectedCard = {};
            state.isOpen={};
            state.activeTab ={};
            state.isSearch=false;

        },

        editIsSearch: (state) =>{
            state.isSearch=true;
        },

        clearData:(state) =>{
            state.sections=[];
            state.sectionChildren = {};
            state.parentTwo={};
            state.parentFinal={};
        },
        clearParentFinal: (state,action) =>{

            state.parentFinal= {...state.parentFinal ,[action.payload]:null};
            

        },

        resetSelectedSons: (state,action)=> {
            
            if(action.payload.toString().length !==4){
            Object.keys(state.selectedCard).map(key => (

                key.startsWith(action.payload.toString())===true && (
                    state.selectedCard = ({...state.selectedCard, [key]: false})      
            )

            ))
        }else{
            Object.keys(state.selectedCard).map(key => (

                key.startsWith(action.payload.toString())===true &&key.length>4 && (
                    state.selectedCard = ({...state.selectedCard, [key]: false})      
            )
            ))
        }

            },
    resetSelectedSonsLast: (state,action)=> {
        Object.keys(state.selectedCard).map(key => (

            key.endsWith(action.payload.toString())===true && (
                state.selectedCard = ({...state.selectedCard, [key]: false})      
        )

        ))
        },

        toggleTabLastChild(state,action) {
            state.isOpen = ({...state.isOpen, [action.payload]: !(state.isOpen[action.payload])})
        },

        clearTabWithActive(state,action){
            state.isOpen =({...state.isOpen, [action.payload] :false});
            state.activeTab =({...state.activeTab, [action.payload] :''});
        },

        storeTabLastChild(state,action) {
            state.isOpen = ({...state.isOpen, [action.payload]: true})
        },

        storeTabActiveLastChild(state,action) {
            state.activeTab = ({...state.activeTab, [action.payload.id]: action.payload.tabId})
        },

        toggleOpenShare(state,action) {

            if(action.payload ===null || state.isOpenShare===action.payload ){
                state.isOpenShare=null;
                state.isResetIcon=true;
                return;
            }

            state.isOpenShare=action.payload;
            state.isResetIcon=true;
            


        },

        toggleReset(state){
            state.isResetIcon=false;
        },

        storeInitalArray(state,action) {
            state.sections=action.payload.sectionsParam;
            state.sectionChildren=action.payload.chaptersParam;
        },

    },

    extraReducers: (builder)=> {
        builder.addCase(fetchSections.pending, (state)=>{
            state.isSearch =false;
            state.loading =true;
            state.error = null;
        });

        builder.addCase(fetchSections.fulfilled, (state,action)=>{
            state.loading =false;
            state.sections = action.payload;
        });

        builder.addCase(fetchSections.rejected, (state,action)=>{
            state.loading =false;
            state.error = action.error.message;
        });

        //geAll Chapters
        builder.addCase(fetchAllChapters.pending, (state)=>{
            state.isSearch =false;
            state.loading22 =true;
            state.error22 = null;
        });

        builder.addCase(fetchAllChapters.fulfilled, (state,action)=>{
            state.loading22 =false;
            
            state.sectionChildren= action.payload.reduce((acc, obj) => {
                const key = obj.id_parent_1;
      
                if (!acc[key]) {
                  acc[key] = [];
                }
      
                acc[key].push(obj);
      
                return acc;
              }, {});

        });

        builder.addCase(fetchAllChapters.rejected, (state,action)=>{
            state.loading22 =false;
            state.error22 = action.error.message;
        });

        //geAll Sub_Chapters
        builder.addCase(fetchAllSub_Chapters.pending, (state)=>{
            state.isSearch =false;
            state.loading23 =true;
            state.error23 = null;
        });

        builder.addCase(fetchAllSub_Chapters.fulfilled, (state,action)=>{
            state.loading23 =false;
            state.parentTwo= action.payload.results.reduce((acc, obj) => {
                const key = obj.id_parent_2;
      
                if (!acc[key]) {
                  acc[key] = [];
                }
      
                acc[key].push(obj);
      
                return acc;
              }, {});

        });

        builder.addCase(fetchAllSub_Chapters.rejected, (state,action)=>{
            state.loading23 =false;
            state.error23 = action.error.message;
        });

        //getsectionChild
        builder.addCase(fetchChildSection.pending, (state,action)=>{
            state.loading2 =true;

            // state.currentRequestId = action.meta.arg
        });

        builder.addCase(fetchChildSection.fulfilled, (state,action)=>{

            let i = action.meta.arg;


            // if(state.currentRequestId === i){
            state.sectionChildren= {...state.sectionChildren ,[i]:action.payload};
            // state.currentRequestId = undefined
            state.loading2=false;

            // }

            // state.sectionChildren={} // to be empty

        });

        builder.addCase(fetchChildSection.rejected, (state,action)=>{
            // state.sectionChildren = {};
            state.loading2 =false;
        });

        //fetchParentTwo'
        builder.addCase(fetchParentTwo.pending, (state,action)=>{
            state.loading3 =true;
            // state.currentRequestIdParent2 = action.meta.arg

        });

        builder.addCase(fetchParentTwo.fulfilled, (state,action)=>{
            let i = action.meta.arg;

            // if(state.currentRequestIdParent2 === i){
            state.parentTwo= {...state.parentTwo ,[i]:action.payload};
            // state.currentRequestIdParent2 = undefined
            
            // }
            state.loading3 =false;

        });

        builder.addCase(fetchParentTwo.rejected, (state,action)=>{
            // state.parentTwo = {};

            state.loading3 =false;
        });

        // fetchParentFinal
        builder.addCase(fetchParentFinal.pending, (state,action)=>{
            state.loading4 =true;
            // state.currentRequestIdParentLast = action.meta.arg
        });

        builder.addCase(fetchParentFinal.fulfilled, (state,action)=>{
            
            let i = action.meta.arg;

            // if(state.currentRequestIdParentLast === i){
            state.parentFinal= {...state.parentFinal ,[i]:action.payload};
            // state.currentRequestIdParentLast = undefined

            // }
            state.loading4 =false;

        });

        builder.addCase(fetchParentFinal.rejected, (state,action)=>{
            // state.parentFinal = {...state.parentFinal ,[action.meta.arg]:{}};
            state.loading4 =false;
        });


        //fetchSectionNoteId ---------------------------------------------------------
                builder.addCase(fetchSectionNote.pending, (state)=>{
                    state.loading5 =true;        
                });
        
                builder.addCase(fetchSectionNote.fulfilled, (state,action)=>{
                    state.loading5 =false;
                    state.singleNote= action.payload;
        
                });
        
                builder.addCase(fetchSectionNote.rejected, (state,action)=>{
                    state.singleNote = [];
                    state.loading5 =false;
                });

             //fetchnoteWithId---------------------------------------------
            builder.addCase(fetchNoteWithId.pending, (state)=>{
                state.loading5 =true;    
    
            });
    
            builder.addCase(fetchNoteWithId.fulfilled, (state,action)=>{
                state.loading5 =false;
                state.singleNote= action.payload;
    
            });
    
            builder.addCase(fetchNoteWithId.rejected, (state,action)=>{
                state.singleNote = [];
                state.loading5 =false;
            });

            //fetchSubChapterNoteId----------------------------------------------------
            
            builder.addCase(fetchSubChapterNote.pending, (state)=>{
                state.loading5 =true;
            });

            builder.addCase(fetchSubChapterNote.fulfilled, (state,action)=>{
                state.loading5 =false;
                state.singleNote= action.payload;
            });

            builder.addCase(fetchSubChapterNote.rejected, (state,action)=>{
                state.singleNote = [];
                state.loading5 =false;
            });

            //fetchFeesNoteId----------------------------------------------------
            builder.addCase(fetchFeesNote.pending, (state)=>{
                            state.loading5 =true;

            });
            
            builder.addCase(fetchFeesNote.fulfilled, (state,action)=>{
                            state.loading5 =false;
                            state.singleNote= action.payload;
            });
            
            builder.addCase(fetchFeesNote.rejected, (state,action)=>{
                            state.singleNote = [];
                            state.loading5 =false;
            });

            //fetchCommericalFees----------------------------------------------------
            builder.addCase(fetchCommerial.pending, (state)=>{
                            state.loadingCommercial =true;
            });
            
            builder.addCase(fetchCommerial.fulfilled, (state,action)=>{
                            state.loadingCommercial =false;
                            state.singleCommerical= {...state.singleCommerical ,[action.meta.arg]:action.payload};
            });
            
            builder.addCase(fetchCommerial.rejected, (state,action)=>{
                            state.singleCommerical = [];
                            state.loadingCommercial =false;
            });

            //searchAccordion
            builder.addCase(searchAccordion.pending, (state)=>{
                            state.isSearch=true;
                            state.loading =true;
                            state.error =null;
            });

            builder.addCase(searchAccordion.fulfilled, (state,action)=>{

                            state.searchInfo= action.payload;

                            let combinedArray = [];

                            if(state.searchInfo===undefined){

                            return;
                            }else{

                                Object.keys(state.searchInfo).map((key)=>{

                                    if(key==="Sub_Chapter"){
                                        const groupLevels2 = ["id_parent_2.id_parent_1.id", "id_parent_2.id", "id" ];
                                        const nestedGroups2 = createNestedStructure(state.searchInfo[key], groupLevels2,"Sub_Chapter");
    
                                        combinedArray = [ ...combinedArray , ...Object.entries(nestedGroups2).map(([key, value]) => ({ [key]: value }))];
    
                                    }else if (key==="Chapter"){
                                        const groupLevels3 = ["id_parent_1.id", "id" ];
                                        const nestedGroups3 = createNestedStructure(state.searchInfo[key], groupLevels3,"Chapter");
    
                                        combinedArray = [ ...combinedArray , ...Object.entries(nestedGroups3).map(([key, value]) => ({ [key]: value }))];
    
    
                                    }else if (key==="HsCode"){
                                        const groupLevels = ["id_parent_3.id_parent_2.id_parent_1.id", "id_parent_3.id_parent_2.id", "id_parent_3.id" , "id" ];
                                        const nestedGroups = createNestedStructure(state.searchInfo[key], groupLevels,"HsCode");
    
                                        
                                        combinedArray = [ ...combinedArray , ...Object.entries(nestedGroups).map(([key, value]) => ({ [key]: value }))];
    
                                    }else {
                                        const groupLevels4 = [ "id" ];
                                        const nestedGroups4 = createNestedStructure(state.searchInfo[key], groupLevels4,"Section");
                                        combinedArray = [...combinedArray ,nestedGroups4];
                                    }
                                    return combinedArray
                                })
    
    
                                const final = groupDataByKeys(combinedArray);
    
                                state.sections = [...final];

                                // console.log(final, "final");
    
    
                                final.forEach(level => {
                                    if(level.hasOwnProperty('children')===true){
                                    state.selectedCard=({...state.selectedCard,[level.id]:true})
                                    state.sectionChildren={...state.sectionChildren,[level.id]:Object.values(level.children)}
                                    }else{
                                        // state.selectedCard=({...state.selectedCard,[level.id]:true})
    
                                    }
                                    
                                    Object.values(level.children).forEach(level2 => {
                                    if(level2.hasOwnProperty('children')===true){
                                        state.selectedCard=({...state.selectedCard,[level2.id+level.id]:true})
    
                                        state.parentTwo ={...state.parentTwo,[level2.id]:Object.values(level2.children)}
                                    }else{
                                        // state.selectedCard=({...state.selectedCard,[level2.id+level.id]:true})
                                    }
    
                                    Object.values(level2.children).forEach(level3 =>{
    
                                    if(level3.hasOwnProperty('children')===true){
                                        state.selectedCard=({...state.selectedCard,[level3.id+level2.id+level.id]:true})
    
                                        state.parentFinal ={...state.parentFinal,[level3.id]:Object.values(level3.children)}
    
                                    }else{
                                        // state.selectedCard=({...state.selectedCard,[level3.id+level2.id+level.id]:true})
    
                                    }
    

                                    if(level3.hasOwnProperty('children')===true)
                                    Object.values(level3.children).forEach(feeOfArray =>{
                                        // if(Array.isArray(feeOfArray.commercial_descriptions)===false){ // if is array means is empty

                                        if(feeOfArray?.commercial_descriptions?.length > 0){

                                            state.selectedCard=({...state.selectedCard,[level3.id+level2.id+level.id+feeOfArray.id]:true})
                                            state.isOpen = ({...state.isOpen, [feeOfArray.id]: !(state.isOpen[feeOfArray.id])})
                                            state.activeTab = ({...state.activeTab, [feeOfArray.id]: "tab1"})

                                            state.singleCommerical= {...state.singleCommerical ,[feeOfArray.id]:{commercial_descriptions:feeOfArray?.commercial_descriptions}};



                                        // }


                                        }
                                    })
    
                                    })
    
                                    })
    
                                })//end final 
    
                            }


                                state.loading =false;
                        });

            builder.addCase(searchAccordion.rejected, (state,action)=>{
                            state.isSearch=false;
                            state.searchInfo = [];
                            state.error = action.error.message;
                            state.loading =false;

            });

        //Post Feed Back For Accordion:
        builder.addCase(postFeedBack.pending, (state)=>{
            state.loadingForm =true;
            state.errorForm = null;
            state.postFormFeedBack = {};

        });

        builder.addCase(postFeedBack.fulfilled, (state,action)=>{

            state.postFormFeedBack = action.payload;
            state.loadingForm =false;
        });

        builder.addCase(postFeedBack.rejected, (state,action)=>{
            state.loadingForm =false;
            state.errorForm = action.error.message;
        });
    }

});

export const {storeObjectFeesModal,storeSelected2,editIsSearch,clearData,clearParentFinal,clearSelectedCard,saveScrollValue, storeSelected, toggleOpenShare ,toggleReset,toggleTabLastChild,storeTabLastChild,storeTabActiveLastChild ,clearTabWithActive,resetSelectedSons,resetSelectedSonsLast,storeInitalArray} = accordionSlice.actions;

export default accordionSlice.reducer;

