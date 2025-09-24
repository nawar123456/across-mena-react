import './AccordionCalc.css';

import { useEffect, useRef, useState  } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import {storeSelected, fetchChildSection,fetchSections ,fetchParentTwo,fetchParentFinal,resetSelectedSons, clearSelectedCard, clearData } from '../../../store/prohibitedTab/accordion.slice';
import Mark from "mark.js";


import SkeletonSubAccordion from '../../../../../components/Skeletons/SkeletonSubAccordion';
import SkeletonAccordion from '../../../../../components/Skeletons/SkeletonAccordion';
import DialogAgree from '../DialogAgree/DialogAgree';

import { ReactSVG } from 'react-svg'


const AccordionCalc = ({valueSearch , closeModalText}) => {
  const {
    selectedCard,
    sections,
    sectionChildren,
    parentTwo,
    parentFinal,
    loading,
    loading2,
    loading3,
    loading4,
    error,
    // error2,
    isSearch,
    searchInfo,
  } = useSelector((state) => state.accordion);
  
  const dispatch = useDispatch();
  const [selectedCheckbox, setSelectedCheckbox] = useState(-1);
  const [toggleModalAgree , setToggleModalAgree] = useState(false);
  const sonObject = useRef({});

  const resultSearch = useRef(null);

  useEffect(() => {

    if(searchInfo===undefined || searchInfo===null)
      return;
    
    if(Object.keys(searchInfo)?.length >0 && selectedCard ){
    const markInstance = new Mark(resultSearch.current);
    markInstance.unmark({
      done: () => {
        markInstance.mark(valueSearch);
      }
    });
  }
    // eslint-disable-next-line
  }, [searchInfo,selectedCard]);


  const handleCheckboxChange = (e,index,son) => {
    e.preventDefault();
    sonObject.current = son;
    setSelectedCheckbox((prevState => prevState===index ? -1 : index));
  };

  useEffect(()=>{
    if(selectedCheckbox !== -1)
    setToggleModalAgree(true)
    else
    setToggleModalAgree(false)

  },[selectedCheckbox]);




  const fetchchild =   (async (id)=>{

    try{
    // setSelectedFetchId(id);

    if(sectionChildren[id]) //حاليا رح علقها 
    return


    await dispatch(fetchChildSection(id)).unwrap();

    }catch(err){
      return "eee";
    }

  });

  const gethParentTwo = (async (id)=>{

    // setSelectedFetchId(id);
    try{
    
      if(parentTwo[id]) //حاليا رح علقها 
      return
  
      await dispatch(fetchParentTwo(id)).unwrap();
    
    }catch(err){
      return "eee";
    }

  });



  const gethParentFinal = (async (id)=>{

    // setSelectedFetchId(id);

      // setSelectedFetchId(id);
      try{

        if(parentFinal[id]) //حاليا رح علقها 
        return

        await dispatch(fetchParentFinal(id)).unwrap();
        

      }catch(err){
        return "eee";
      }

  });

  useEffect(()=>{
  
    let revokeRequest = false;
    if(!revokeRequest  )
        {//Object.keys(sections).length === 0

            dispatch(clearSelectedCard());
            dispatch(clearData());
            dispatch(fetchSections());
        }
    return () =>{
      revokeRequest =true;
    }
    // eslint-disable-next-line
  },[dispatch]);

  const toggle =  async (secondId,id) =>{ 
    if(!selectedCard[secondId] && !sectionChildren[id]){ //for close 

      dispatch(storeSelected(secondId));
      // console.log("first")
      if(await fetchchild(id) ==="eee"){
        // alert("ffff")
        dispatch(storeSelected(secondId));

        return;
    }
    
      }else{ // for keep 
        if(sectionChildren[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close 

          dispatch(storeSelected(secondId));
          // console.log("for keep")

        }
        // else{ // for error 
          
        //   console.log("for error")
        //   fetchchild(id)
        //   dispatch(storeSelected(secondId));

          // setSelected((prevState => ({...prevState, [secondId]: (prevState[secondId])}))); /// for close 

        // }

    }

    // if(currentRequestId !==undefined){
    //   // setSelected((prevState => ({...prevState, [currentRequestId]: !(prevState[currentRequestId])}))); /// for close 
    //   dispatch(storeSelected2(secondId));
    //   console.log("currentRequestId",currentRequestId)
    // }
    // }

  }

  const toggle1 = async (secondId,id) =>{


    if(!selectedCard[secondId] && !parentTwo[id]){ //for close 

      dispatch(storeSelected(secondId));
      // console.log("first")
      if(await gethParentTwo(id) ==="eee"){
        // alert("ffff")
        dispatch(storeSelected(secondId));

        return;
    }
    dispatch(resetSelectedSons(id))

    dispatch(storeSelected(secondId));

    
      }else{ // for keep 
        if(parentTwo[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close 

          dispatch(storeSelected(secondId));
          // console.log("for keep")

        }
        // else{ // for error 
          
        //   console.log("for error")
        //   fetchchild(id)
        //   dispatch(storeSelected(secondId));

          // setSelected((prevState => ({...prevState, [secondId]: (prevState[secondId])}))); /// for close 

        // }

    }
  }

  const toggle2 = async (secondId,id) =>{

    if(!selectedCard[secondId] && !parentFinal[id]){ //for close 

      dispatch(storeSelected(secondId));
      // console.log("first")
      if(await gethParentFinal(id) ==="eee"){
        // alert("ffff")
        dispatch(storeSelected(secondId));

        return;
    }
    dispatch(resetSelectedSons(id))

    dispatch(storeSelected(secondId));

    
      }else{ // for keep 
        if(parentFinal[id]){
          // setSelected((prevState => ({...prevState, [secondId]: !(prevState[secondId])}))); /// for close 

          dispatch(storeSelected(secondId));
          // console.log("for keep")

        }
        // else{ // for error 
          
        //   console.log("for error")
        //   fetchchild(id)
        //   dispatch(storeSelected(secondId));

          // setSelected((prevState => ({...prevState, [secondId]: (prevState[secondId])}))); /// for close 

        // }

    }
  }



  return (
    <div className='wrapper'>

    <SkeletonAccordion loading={loading} error={error}>
    <div ref={resultSearch} className='accordion-calc'>

    {
          sections.length > 0?
          sections.map((Grand,i) =>{

            return(
              <div key={i} className='calc-section'>

              <div className="calc-section-content" onClick={() =>  toggle(Grand.id,Grand.id)}>
          
                <div className='section-content-title'>
          
                <div className="section-info">
                          {/* <Logo1 className="section-info-logo" style={sectionChildren[Grand.id] && selected[Grand.id] ? {fill: '#fcc400'}:{}}  /> */}
                        <ReactSVG  className="section-info-logo" src={isSearch===true? "https://across-mena.com"+Grand.image : Grand.image} />
                          <div>
                          <h2 className="section-info-department">{Grand.name}</h2>
                          <p className="section-info-count">
                            ({Grand.end}
                                <span className='count-arrow'>
                                &#8592;
                                </span>
                            {Grand.start})
                          </p>
                          </div>
          
                </div>
          
                <h2 className={`section-info-title ${((loading2 ===true && !sectionChildren[Grand.id] ) ||sectionChildren[Grand.id] )&& selectedCard[Grand.id] ? "":"limit-text"} `}>{Grand.label}</h2>
        
                </div>
              
              </div>
          
          
                {/* first content inside .section  01 ....etc  */}
                <div className='calc-content calc show'> 
          
                {((loading2 ===true && !sectionChildren[Grand.id] )||!sectionChildren[Grand.id] )&& selectedCard[Grand.id] ?

                
                 <SkeletonSubAccordion/>
                
              
               :
            selectedCard[Grand.id]  && sectionChildren[Grand.id] &&
            sectionChildren[Grand.id].map((papa,ii) =>(
                <div key={ii} className='calc-parent-one'>
          
                  <div className='parent-one-content' onClick={() => toggle1(papa.id+Grand.id,papa.id)} >
          
                    <div className='parent-one-content-title'>
          
                      <div className='parent-one-info'>
                      <span className={`parent-one-number parent-one-padding ${((loading3 ===true && !parentTwo[papa.id] ) ||parentTwo[papa.id] )&& selectedCard[papa.id+Grand.id] ? 'border-number' :''}`} >{papa.id}</span>
                      <h2  className='parent-one-title'> {papa.label} </h2>
          
                      </div>
          
                    </div>
          
                  </div>
          
                {/* second content inside parent-one  0101 .....etc */}
                <div className='calc-content calc show'> 
                {((loading3 ===true && !parentTwo[papa.id] )||!parentTwo[papa.id] )&& selectedCard[papa.id+Grand.id] ?
              (
              <SkeletonSubAccordion/>
              ) :
                    selectedCard[papa.id+Grand.id] && parentTwo[papa.id] &&
                    parentTwo[papa.id].map((item,iii) =>(
                    <div key={iii} className='calc-parent-two'>
          
                    <div className='parent-one-content' onClick={() => toggle2(item.id+papa.id+Grand.id,item.id)} >
          
                    <div className='parent-one-content-title'>
          
                      <div className='parent-one-info'>
                      <span className={`parent-one-number parent-two-padding ${((loading4 ===true && !parentFinal[item.id] ) ||parentFinal[item.id] )&& selectedCard[item.id+papa.id+Grand.id] ? 'border-number' :''}`} >{item.id}</span>
                      <h2  className='parent-one-title'>{item.label}</h2>
          
                      </div>
          
                    </div>
          
                  </div>
          
                      {/* third content   01012100 .....etc */}
                      <div className='calc-content calc show'> 

                      {((loading4 ===true && !parentFinal[item.id] )||!parentFinal[item.id] )&& selectedCard[item.id+papa.id+Grand.id] ?
                            (
                              <SkeletonSubAccordion/>
                            ) :
                          selectedCard[item.id+papa.id+Grand.id]&& parentFinal[item.id] &&
                        
                        parentFinal[item.id].map((son,iiii) =>(
                        <div key={iiii} className='calc-parent-finish'>
          
                    <div className='parent-one-content'>
          
                    <div className='parent-one-content-title'>
          
                      <div className='parent-one-info'>

                      <label className="form-control">
                        <input className="parent-finish-checkbox" type="checkbox" checked={selectedCheckbox === iiii}  onChange={(e) => handleCheckboxChange(e,iiii,son)} name="checkbox-checked"  />
                      </label>

                      <span className='parent-one-number parent-finish-padding' onClick={(e) => handleCheckboxChange(e,iiii,son)}  >{son.id}</span>
                      <h2  className='parent-one-title'> {son.label}</h2>
          
                      </div>
          
                    </div>
                      
                  </div>
          
                        </div>
                        ))
                        }
                        
          
          
                      </div>
          
                    </div>
                    ))
                  }
                  </div>
          
                </div>
              ))}

          
                </div>
          
              </div>
            )
          }
          
          
          ):(
            <p className='empty-search'>لا يوجد نتائج</p>
          )

          }

          {
            toggleModalAgree && <DialogAgree toggleModalAgree={toggleModalAgree} handleCheckboxChange = {handleCheckboxChange} closeModalText={closeModalText} sonObject={sonObject}/>
          }
    </div>

    </SkeletonAccordion>
    </div>

  )
}

export default AccordionCalc;
