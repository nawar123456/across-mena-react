import styles from  './AccordionFinal.module.css';
import LastChild from './LastChild';
import React, { useEffect, useRef, useState  } from 'react';
import { useDispatch ,useSelector } from 'react-redux';


import {storeSelected,saveScrollValue,clearSelectedCard ,searchAccordion,clearData,clearParentFinal,fetchSections ,fetchChildSection,fetchAllChapters ,fetchParentTwo,fetchParentFinal,fetchNoteWithId,fetchSectionNote,fetchSubChapterNote,fetchFeesNote,toggleOpenShare,clearTabWithActive,resetSelectedSons, resetSelectedSonsLast,storeInitalArray } from '../../../store/prohibitedTab/accordion.slice';
import { ReactComponent as ModalIcon } from '../../../../../assets/icons/note_icon2.svg';

import { ReactSVG } from 'react-svg'
import ModalView from '../PopupModal/ModalView';

import SerachBar from '../../../components/common/Search/SerachBar'
import SkeletonSubAccordion from '../../../../../components/Skeletons/SkeletonSubAccordion';
import SkeletonAccordion from '../../../../../components/Skeletons/SkeletonAccordion';
import {useLocation, useNavigate, useParams } from 'react-router-dom';

import Mark from "mark.js";

import { useTranslation } from 'react-i18next';
import useQuery from '../../../../../hooks/useQuery';

const Accordion3 = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const {
    selectedCard,
    sections,
    sectionChildren,
    parentTwo,
    parentFinal,
    singleNote,
    loading,
    loading22,
    loading2,
    loading3,
    loading4,
    error,
    isSearch,
    searchInfo,
  } = useSelector((state) => state.accordion);
  const queryUrl= useQuery();

  const sectionsStore = useRef([]);
  const chaptersStore = useRef({});



  const [selectedModl, setSelectedModal] = useState(null);
  // const [selectedFetchId,setSelectedFetchId] = useState(0);

  const {pathname, search} = useLocation();
  const {id} = useParams();
  const query = new URLSearchParams(search).get('query');
  const [valueSearch , setValueSearch] = useState(id !=="search-hs-code"? id :query===null?"": query);
//  id !== "search-hs-code" ? (query === null ? "" : query) : ""
//   if (id !== "search-hs-code") {
//     if (query === null) {
//       return "";
//     } else {
//       return query;
//     }
//   } else {
//     return "";
//   }

  const resultSearch = useRef(null);

  // const { i18n } = useTranslation();
  const { lang } = useParams();



  useEffect(() => {
    if(searchInfo===undefined || searchInfo===null)
    return;

    if(Object.keys(searchInfo)?.length >0 && selectedCard ){
    const markInstance = new Mark(resultSearch.current);
    // markInstance.unmark( {
    //   done: () => {
    //     var Mark = {
    //       "color":"red",
    //       "background":'red'
    //   };
        markInstance.mark(valueSearch);
    // <div style={{color:'red'}}>
    //  {valueSearch.current}
    //  </div>
    //   }
    // })
    }



    // eslint-disable-next-line
  }, [searchInfo,selectedCard]);

  const formatDateString = (inputString) => {
    // Ensure the inputString is not empty
    if (!inputString) {
        return '';
    }

    // Split the inputString into chunks
    const chunks = inputString.match(/.{1,2}/g);

    // Format the chunks into the desired date-like string
    const formattedString = chunks.join('.');

    return formattedString;
}
const formatDateString2 = (input) => {
  const inputString = String(input || '');
  if (inputString.length < 8) return inputString; // or return placeholder if needed
  return `${inputString.slice(0, 4)}.${inputString.slice(4, 6)}.${inputString.slice(6)}`;
};






  useEffect(()=>{
    let revokeRequest = false;
    if(!revokeRequest && query===null &&id==="search-hs-code")
        {//Object.keys(sections).length === 0
            if(valueSearch.trim().length ===0){
            // setValueSearch("");
            // dispatch(fetchAllSub_Chapters());
            dispatch(clearSelectedCard());
            dispatch(clearData());
            dispatch(fetchAllChapters());
            dispatch(fetchSections());
            }


        }
    return () =>{
      revokeRequest =true;
    }
    // eslint-disable-next-line
  },[dispatch,query,id,lang]);

  const fetchchild = (async (id)=>{

    try{
    // setSelectedFetchId(id);

    // if(sectionChildren[id]) //حاليا رح علقها
    // return


    await dispatch(fetchChildSection(id)).unwrap();

    }catch(err){
      return "eee";
    }

  });

  const gethParentTwo = (async (id)=>{

    // setSelectedFetchId(id);
    try{

      // if(parentTwo[id]) //حاليا رح علقها
      // return

      await dispatch(fetchParentTwo(id)).unwrap();

    }catch(err){
      return "eee";
    }

  });



  const gethParentFinal = (async (id)=>{

    // setSelectedFetchId(id);

      // setSelectedFetchId(id);
      try{

        // if(parentFinal[id] ) //حاليا رح علقها
        // return
        await dispatch(fetchParentFinal(id)).unwrap();


      }catch(err){
        return "eee";
      }

  });

  const gethNoteWithId = ((id,sectionParent,isNoteHave=false)=>{


    if((id.toString().length===1 || sectionParent === 1) && isNoteHave===true  ){
    dispatch(fetchSectionNote(id));
    return;

    }else if((id.toString().length ===2)&& isNoteHave===true ){
      dispatch(fetchNoteWithId(id));
      return;

    }else if(id.toString().length ===4 ){
      dispatch(fetchSubChapterNote(id));
      return;

    }else if (id.toString().length ===8){
      dispatch(fetchFeesNote(id))
    }


  });


  const toggleModal = (isNoteHave,id,grand=1,Papa=1,Son=1) =>{

    if(selectedModl === id+grand+Papa+Son ){

      return setSelectedModal(null);
    }
    gethNoteWithId(id,grand,isNoteHave);

    setSelectedModal(id+grand+Papa+Son);

}

  const toggle =  async (secondId,id) =>{
    setSelectedModal(null);
    if(!selectedCard[secondId] ){ //for close
//    if(!selectedCard[secondId] && !sectionChildren[id]){ //for close

      dispatch(storeSelected(secondId));
      if(await fetchchild(id) ==="eee"){
        dispatch(storeSelected(secondId));
        return;
    }else{
      // scrollView(secondId);
    }




      }else{ // for keep
        if(sectionChildren[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close

          dispatch(storeSelected(secondId));

          if(isSearch===false){
            dispatch(resetSelectedSonsLast(id))
            // dispatch(storeSelected(secondId));
            }

        }


    }



  }

  const toggle1 = async (secondId,id) =>{

    setSelectedModal(null);

    if(!selectedCard[secondId] ){ //for close
      // if(!selectedCard[secondId] && !parentTwo[id]){ //for close

      dispatch(storeSelected(secondId));
      if(await gethParentTwo(id) ==="eee"){
        // alert("ffff")
        dispatch(storeSelected(secondId));
        return;
    }




      }else{ // for keep
        if(parentTwo[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close

          dispatch(storeSelected(secondId));

          if(isSearch===false){
            dispatch(resetSelectedSons(id))
            // dispatch(storeSelected(secondId));
            }

        }
    }
  }

  const toggle2 = async (secondId,id) =>{

    setSelectedModal(null);

    if(!selectedCard[secondId] ){ //for close
//    if(!selectedCard[secondId] && !parentFinal[id]){ //for close

      dispatch(storeSelected(secondId));
      if(await gethParentFinal(id) ==="eee"){
        dispatch(storeSelected(secondId));

        return;
    }


      }else{ // for keep
        if(parentFinal[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close




          dispatch(storeSelected(secondId));
          if(isSearch===false){
            dispatch(resetSelectedSons(id))
            // dispatch(storeSelected(secondId));
            }

          //clear the parentFinals
          if(isSearch===true)
          dispatch(clearParentFinal(id));

        }


    }
  }

  const toggle3 = (secondId,id) =>{// for who : id ساستعمله في open and active  لانه مميز

    setSelectedModal(null); //اخفاء الملاظات

    if(!selectedCard[secondId]){ // للفتح توغل

      dispatch(clearTabWithActive(id));
      // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for open
      dispatch(storeSelected(secondId));


  }else{
    // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for open
    dispatch(storeSelected(secondId));
    /*
    هنا اللعبة اغلق الابناء

    */



  }

  //شرط تحقق من الابناء مفتوحين او لا اذا اي سكر هذا الابن اذا مغلق اتركه لا تعمل شي


}

//--------------------------_--_-_-_-_-___-__-_-___-___-__-__-__-___-___--_-_-_-_-_-_-_-_-_-*-*_*_*_*_**_***_*

const navigate = useNavigate();

useEffect(()=>{

  if(id !=="search-hs-code" && valueSearch===id){


    dispatch(searchAccordion(id))
    return
  }
  else if (query!==null && valueSearch===query){
    dispatch(clearSelectedCard())
    dispatch(clearData());
    dispatch(searchAccordion(query))

    if(sections && Object.keys(sectionChildren).length > 0){
      sectionsStore.current = sections;
      chaptersStore.current = sectionChildren;
    }

    return
  }else{
    // setValueSearch("");
  }
  // eslint-disable-next-line
},[dispatch,id,valueSearch,query]);

//when user write (OnChange)
const handleResetAccordion = (e) =>{
setValueSearch("")

}
const handleSearchAccordion = (e) =>{
  if(query){

    dispatch(saveScrollValue(-1));

    if(queryUrl.has("param"))
    navigate(`${pathname}?param=across-mean`);
    else
    navigate(pathname);

  } else if (id!=="search-hs-code"){

    // setValueSearch(e.target.value);

    dispatch(saveScrollValue(-1));
    dispatch(clearSelectedCard())
    dispatch(clearData());

    dispatch(fetchAllChapters());
    dispatch(fetchSections());

    if(queryUrl.has("param"))
    navigate('/prohibited-permitted-materials/search-hs-code?param=across-mean');
    else
    navigate('/prohibited-permitted-materials/search-hs-code');


    setValueSearch(e.target.value);

    return
  }


  if(e.target.value.length===0 && isSearch===true)
  {
    dispatch(saveScrollValue(-1));
      dispatch(clearSelectedCard())
      dispatch(clearData());

      if(sectionsStore.current && Object.keys(chaptersStore.current).length >0 ){

        dispatch(storeInitalArray({sectionsParam:sectionsStore.current,chaptersParam:chaptersStore.current}))
      }else{
      dispatch(fetchAllChapters());
      dispatch(fetchSections());
      }
  }

  setValueSearch(e.target.value);

}

const clickSearchAccordion = (e)=>{
  dispatch(saveScrollValue(-1));

  if(valueSearch.trim().length===0){

    if(queryUrl.has("param"))
    navigate(`${pathname}?param=across-mean`);
    else
    navigate(pathname);

    return;
  }

  if(valueSearch.trim().length===1){


      if(queryUrl.has("param"))
      navigate(`${pathname}?param=across-mean`);
      else
      navigate(pathname);

      return;
  }

  if(queryUrl.has("param"))
  navigate(`?query=${valueSearch.trim()}&param=across-mean`);
  else
  navigate(`?query=${valueSearch.trim()}`);

  // رح ينفذوا بواسطة ال useEffect
  // dispatch(clearSelectedCard())
  // dispatch(clearData());
  // dispatch(searchAccordion(valueSearch));


  // if(sections && Object.keys(sectionChildren).length > 0){
  //   sectionsStore.current = sections;
  //   chaptersStore.current = sectionChildren;
  // }
}


  return (

    <div className={styles.wrapper}>
      <div style={{marginTop:'70px'}}>
      <SerachBar valueSearch={valueSearch} clickSearchAccordion={clickSearchAccordion} handleSearchAccordion={handleSearchAccordion} handleResetAccordion={handleResetAccordion}  />
      </div>
    {/* <SkeletonAccordion loading={loading} loading22={loading22} loading23={loading23} error={error}> */}
    <SkeletonAccordion loading={loading} loading22={loading22}  error={error}>

      <div ref={resultSearch} className={styles.accordion}>
        {
          sections?.length > 0?
          sections.map((Grand,i) =>{

            return (
              
            <div key={i} id={Grand.id}   className={`${styles.section} ${(( !sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id]?  styles['section-grid-auto']: styles['section-grid-fr']}`}  style={(( !sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? { border:'2px solid #fcc400'}:{}} >

              <div className={`${styles['section-content']} ${(( !sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? styles['content-border'] : styles['content-flex']}`}  onClick={()=>{dispatch(toggleOpenShare(null))}} >
              <div onClick={ () =>  toggle(Grand.id,Grand.id)}  className={`${styles['section-content-title']} ${(( !sectionChildren[Grand.id] )||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? styles['section-content-line']: {} } `} style={ (( !sectionChildren[Grand.id] )||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? { borderColor:'#fcc400'} : {}}  >

              <div className={styles['section-info']} style={(( !sectionChildren[Grand.id] )||sectionChildren[Grand.id] )&& selectedCard[Grand.id]?{flexDirection:'column'}:{}}>
                <ReactSVG  className={styles['section-info-logo']} src={ Grand.image} style={{marginTop: (( !sectionChildren[Grand.id] )||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? '10px' : '',fill: selectedCard[Grand.id] ? '#fcc400' : ''}}/>
                <div className={(( !sectionChildren[Grand.id] )||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? styles['info-center'] :{}}>
                <h2 className={styles['section-info-department']}>{Grand.name}</h2>
                <p className={styles['section-info-count']}>
                  ({Grand.end}
                  <span className={styles['count-arrow']}>
                  {i18n.language === 'ar' ? '\u2190' : '\u2192'}
                  </span>
                  {Grand.start})
                </p>
                </div>

              </div>

              </div>
{/* {console.log("section all",Grand)} */}
              </div>

              <div className={`${styles['pp']} ${selectedCard[Grand.id] ? styles['pp-relative']: ""} `}>
              <h2 onClick={ () =>  toggle(Grand.id,Grand.id)} className={`${styles['section-info-title']} ${styles['limit-text']} `} style={{display: (( !sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id] && "block" }}>
                {Grand.label}
              </h2>

<div className={styles['section-icons']}>
{/* <ModalIcon  data-tooltip-id={Grand.id+Grand.id} data-tooltip-delay-hide={150}  className={styles['section-icons-modal']}  alt="Modal Icon" onClick={() => toggleModal(Grand.id)} /> */}

<span >

{/* {sectionChildren[Grand.id] &&selected[Grand.id] ? (loading2? <LoadingSpinner/> : <i className="fa fa-3x fa-angle-down fa-rotate-30 "></i>) : <i style={{transition: "all 100ms"}} className="fa fa-3x fa-angle-down"></i>} */}

{/* { (selected[Grand.id] && !sectionChildren[Grand.id]) ? (loading2? <><LoadingSpinner caues="cardOpen"/>  <ArrowDown style={{visibility:"hidden"}} className={`${styles['height-section-svg']} ${styles['style-svg']}`} /></>: <ArrowDown className={`${styles['height-section-svg']} ${styles['style-svg']}`} />) :(selected[Grand.id] ?  <ArrowDown className={`${styles['height-section-svg']} ${styles['style-svg']} ${styles['fa-rotate-30']}`} /> : <ArrowDown className={`${styles['height-section-svg']} ${styles['style-svg']} `} style={{transition: "all 100ms"}}/>) } */}

  <ModalIcon  data-tooltip-id={Grand.id+Grand.id}   className={styles['section-icons-modal']}  alt="Modal Icon" onClick={() => toggleModal(Grand.is_have_note,Grand.id)} />


  {/* <Tooltip
className='my-custom-tooltip '
id={Grand.id+Grand.id}
content="ملاحظات القسم"
place="bottom"
/>  */}

</span>

</div>

{sections && selectedModl === Grand.id+1+1+1 &&  <ModalView checkSection={selectedCard[Grand.id]}  display="block" singleNote={singleNote} isNoteHave={Grand.is_have_note}  toggleModal={toggleModal}  ownerID={Grand.id} isSection={true}  />  }

                </div>


            <div className={styles['second-child']} style={{borderTop : ((!sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? '' :'none'}}>


            <div className={`${styles.content} ${styles.show}`}>
            {((loading2 ===true && !sectionChildren[Grand.id] )||!sectionChildren[Grand.id] )&& selectedCard[Grand.id] ?

                <SkeletonSubAccordion/>
               :
            selectedCard[Grand.id]  && sectionChildren[Grand.id] &&
            sectionChildren[Grand.id].map((papa,ii) =>(

              <div key={papa.id} className={styles['parent-one']}>
  {console.log('chapter:',papa)}

              <div id={`${papa.id+Grand.id}`} className={styles['parent-one-content']} onClick={()=>{dispatch(toggleOpenShare(null))}}>
              <span onClick={() => toggle1(papa.id+Grand.id,papa.id)} className={styles['parent-one-plus']} >
                  {
                    parentTwo[papa.id] && selectedCard[papa.id+Grand.id] ?
                    // <MinusIcon className={styles['parent-one-icons-plus']} />
                    <div className={`${styles['parent-one-icons-plus']} ${styles['active']}`}>

                    </div>
                    :
                    <div className={`${styles['parent-one-icons-plus']}`}>

                    </div>
                    // <PlusIcon className={styles['parent-one-icons-plus']} />
                  }
              </span>

              <div   className={styles['parent-one-content-title']}  >

                <div className={styles['parent-one-info']} onClick={() => toggle1(papa.id+Grand.id,papa.id)}>
                {/* <span className={styles['parent-one-number']} style={parentTwo[papa.id] && selected[papa.id+Grand.id]  ? {backgroundColor:"#FCC401", color:'#fff'} :{}} >{papa.id}</span> */}
                <span className={styles['parent-one-number']} >{papa.id}</span>
                <h2 id= {`${papa.id+papa.id+Grand.id+papa.id}`} className={styles['parent-one-title']}>  {papa.label}</h2>
                </div>

                <div className={styles['parent-one-icons']}>
              {/* <ModalIcon  className={styles['parent-one-icons-modal']} data-tooltip-id={papa.id+papa.id}  data-tooltip-delay-hide={150}   alt="Modal Icon" onClick={() => toggleModal(papa.id,Grand.id)} /> */}

              <span  className={styles['parent-one-icons-arrow']}>


                <ModalIcon  className={styles['parent-one-icons-modal']} data-tooltip-id={papa.id+papa.id}     alt="Modal Icon" onClick={() => toggleModal(true,papa.id,Grand.id)} />

                </span>
                {/* <Tooltip
              className='my-custom-tooltip'
                id={papa.id+papa.id}
                content="ملاحظات الفصل"
                place="bottom"
                /> */}
                </div>

              </div>

              {selectedModl === papa.id+Grand.id+1+1  &&  <ModalView checkSection={selectedCard[Grand.id]} singleNote={singleNote}  display="block" isNoteHave={true} toggleModal={toggleModal} ownerID={papa.id} isSection={false} />  }

              </div>


                <div className={`${styles.content} ${styles.show}`}>

                {((loading3 ===true && !parentTwo[papa.id] )||!parentTwo[papa.id] )&& selectedCard[papa.id+Grand.id] ?
              (
              <SkeletonSubAccordion/>
              ) :

                  selectedCard[papa.id+Grand.id] && parentTwo[papa.id] &&
       parentTwo[papa.id]
  ?.filter(item => {
    const sons = parentFinal[item.id] || [];
    return !sons.some(son => 
      (son.type === undefined || son.type === null) && son.id_parent_3 === item.id
    );
  })
  .map((item, iii) => (
    <div key={item.id} className={styles['parent2']}>
{console.log('sup-chapter:',item)}

                      <div    className={styles['parent-two']}>
                        <div id={item.id+papa.id+Grand.id} className={styles['parent-two-content']} onClick={()=>{dispatch(toggleOpenShare(null))}}>

                        <span onClick={() => toggle2(item.id+papa.id+Grand.id,item.id)} className={styles['parent-one-plus']} >
                  {
                    parentFinal[item.id] && selectedCard[item.id+papa.id+Grand.id] ?
                    // <MinusIcon className={styles['parent-one-icons-plus']} />
                    <div className={`${styles['parent-one-icons-plus']} ${styles['active']}`}>

                    </div>
                    :
                    <div className={`${styles['parent-one-icons-plus']}`}>

                    </div>
                    // <PlusIcon className={styles['parent-one-icons-plus']} />
                  }
                        </span>

                        <div className={styles['parent-two-content-title']}   >
                        <div className={styles['parent-two-info']} >
                            <span onClick={() => toggle2(item.id+papa.id+Grand.id,item.id)} className={styles['parent-two-number']}  >{formatDateString(item.id)}</span>

                            <h2  id= {`${item.id+papa.id+Grand.id+item.id}`}  className={styles['parent-two-title']}>
                              <span className={styles['title-cursor']}  onClick={() => toggle2(item.id+papa.id+Grand.id,item.id)}>
                               {item.label}
                              </span>


                              {item.review !=="" && item.review !=="null" &&
                              (<span  onClick={item.review !=="" && item.review !=="null"  && item.review_value==="0"  ? () => toggleModal(true,item.id,Grand.id,papa.id) : ()=>{toggle2(item.id+papa.id+Grand.id,item.id)}} className={item.review?.length>0 && item.review_value==="0" ?`${styles['parent-review']} ${styles['active']}` : `${styles['parent-review']}`} >

                                {item.review !=="" && item.review !=="null"  && item.review}

                                {item.review !=="" && item.review !=="null"  && item.review_value==="0" && <ModalIcon className={styles['review-icon']} data-tooltip-id={item.id+item.id}     alt="Modal Icon" />}
                              </span>)}

                            </h2>

                        </div>

                        <div onClick={() => toggle2(item.id+papa.id+Grand.id,item.id)} className={`${styles['parent-two-icons']} ${styles['title-cursor']}`}>


                            <span  className={styles['parent-two-icons-arrow']} style={selectedCard[item.id+papa.id+Grand.id]  && !parentFinal[item.id]  &&loading4 ? {visibility:'visible' } : {visibility:'hidden'}}>
                              </span>
                        </div>

                        </div>


                        {selectedModl === item.id+Grand.id+papa.id+1    &&  <ModalView checkSection={selectedCard[Grand.id]} singleNote={singleNote}  display="block" isNoteHave={true} toggleModal={toggleModal} ownerID={item.id} isSection={false} />  }
                        {/* {selectedModl === item.id+Grand.id+papa.id   && loading5===false &&  <ModalView singleNote={singleNote}  display="block" toggleModal={toggleModal} ownerID={item.id} />  } */}

                        </div>



                        <div className={`${styles.content} ${styles.show}`}>

                        {((loading4 ===true && !parentFinal[item.id] )||!parentFinal[item.id] )&& selectedCard[item.id+papa.id+Grand.id]
                        // ||(isSearch &&(loading4  && !parentFinal[item.id] ))
                        ?
                            (
                              <SkeletonSubAccordion/>
                            ) :
                          selectedCard[item.id+papa.id+Grand.id]&& parentFinal[item.id] &&

                              parentFinal[item.id]  .filter(son => son.active === true && son.type !== null && son.type !== undefined)
                              .map((son, iiii) => (
                              <div key={son.id} className={`${styles['parent-finish']}  ${selectedCard[item.id+papa.id+Grand.id+son.id] ? styles['parent-finish-active'] : ''}`}>
                              <div id={item.id+papa.id+Grand.id+son.id} className={styles['parent-finish-content']} onClick={()=>{dispatch(toggleOpenShare(null))}}>

                              <span onClick={() => toggle3(item.id+papa.id+Grand.id+son.id,son.id)} className={styles['parent-one-plus']} >
                                      {
                              selectedCard[item.id+papa.id+Grand.id+son.id]  ?
                                    // <MinusIcon className={styles['parent-one-icons-plus']} />
                                    <div className={`${styles['parent-one-icons-plus']} ${styles['active']}`}>

                                    </div>
                                    :
                                    <div className={`${styles['parent-one-icons-plus']}`}>

                                    </div>
                                  // <PlusIcon className={styles['parent-one-icons-plus']} />
                                    }
                              </span>

                          <div  className={styles['parent-finish-content-title']}   >
                            <div className={styles['parent-finish-info']}>
                            <span onClick={() => toggle3(item.id+papa.id+Grand.id+son.id,son.id)} className={styles['parent-finish-number']} >{formatDateString2(son.hs_code)}</span>
                            {/* display the 8 digits code (hs_code) */}

                            <h2 className={styles['parent-finish-title']}>

                              <span  className={styles['title-cursor']} onClick={() => toggle3(item.id+papa.id+Grand.id+son.id,son.id)}>
                              { son.label  }
                              </span>

                              {son.review !=="" && son.review !=="null" &&
                              (<span  onClick={son.review !=="" && son.review !=="null" && son.review_value==="0"  ? () => toggleModal(true,son.id,item.id,papa.id,Grand.id) : ()=>{toggle3(item.id+papa.id+Grand.id+son.id,son.id)}} className={son.review?.length>0 && son.review_value==="0" ?`${styles['parent-review']} ${styles['active']}` : `${styles['parent-review']}`} >
                                {son.review !=="" && son.review !=="null" && son.review}
                                {son.review !=="" && son.review !=="null" && son.review_value==="0" && <ModalIcon className={styles['review-icon']} data-tooltip-id={son.id+son.id}     alt="Modal Icon" />}
                              </span>)}

                            </h2>
                            </div>

                            <div onClick={() => toggle3(item.id+papa.id+Grand.id+son.id,son.id)} className={`${styles['parent-two-icons']} ${styles['title-cursor']}`}>



                          </div>

                          {selectedModl === son.id+item.id+papa.id+Grand.id    &&  <ModalView checkSection={selectedCard[Grand.id]} singleNote={singleNote}  display="block" isNoteHave={true} toggleModal={toggleModal} ownerID={son.id} isSection={false} />  }

                      </div>



                              </div>

                            <div  className={ selectedCard[item.id+papa.id+Grand.id+son.id] ?`${styles.content} ${styles.show}` : styles.content}>

                                <LastChild objectChild={son}  />
                                
{                                console.log("Son Son in parent:", son)}
                            </div>

                        </div>
                            ))
                          }

                          </div>

                        </div>
                    </div>


                    ))
                  } {/*map for parent 3 */}


                </div>{/*end content for parent 2 */}

            {/*parent-two 2 */}
              </div>


            ))}
             {/*map for parents 2 */}

            </div>

            </div>
{/*end content for parent 1 */}
            {/* </div>below  parent 1 */}
            </div>
            )

          }):
          (
            isSearch===true && <p className={styles['empty-search']}>{t('labelProhibitedPage.noResults')}</p>
          )
        }

      </div>
      </SkeletonAccordion>
      {/* <picture>

      </picture> */}

    </div>

  )
}

export default Accordion3


