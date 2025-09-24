import { memo , Fragment } from 'react';
import './ModalView.css';
import { useSelector } from 'react-redux';
import Table11 from '../Table11/Table11';
import Table74 from '../Tabel74/Table74';
import SkeletonModal from '../../../../../components/Skeletons/SkeletonModal';
import { useTranslation } from 'react-i18next';


const ModalView = ({checkSection,isNoteHave , display , ownerID ,isSection , toggleModal, singleNote}) => {

  const {loading5} = useSelector((state) => state.accordion);

const keysToCheck = isSection===true ?  ["note_a", "note_b", "note_c"] : ["note_a", "note_b", "note_c", "note_d","note_e"] ;
const keysSubChapeter= ownerID.toString().length ===8 ?  ["name_a","note_a","name_b","note_b","name_addition","additional_note"] : ["name_a","note_a","name_addition","additional_note"];

const {t,i18n} = useTranslation();


const fetchData = (key,notes)=>{

  return (
    notes[key].split("#").map((item, i) => 
  {
  if(i===0)
  return (
    <li className='note-content' style={{display:'inline-block' }} key={i} >    

    {item.split("$$$").map((part,index)=>(
      <Fragment key={index}>
      {(index > 0 && i18n.language==="ar") && <Table11 />} 
      {part} 
    </Fragment>
    ))}


    </li>
  )

  else{
    let itemTable =item.split('$$$');

    return(
      itemTable.map((part,partIndex)=>(
        <Fragment key={partIndex}>
        {(partIndex > 0 && i18n.language==="ar") && <Table74 />}

        
        { part.split('$').map((el,i)=>{

              if(i===0)
              return <p key={i} style={{ marginRight: i18n.language==="ar" ? '25px': '0px' , marginLeft: i18n.language==="ar" ?'0px' : '25px'}}>{el}</p>

              else{
                return(
                  el.split('@').map((ell,i)=>{

                    if(i===0)
                    return <p key={i} style={{ marginRight: i18n.language==="ar" ? '35px': '0px' , marginLeft: i18n.language==="ar" ?'0px' : '35px'}}>{ell}</p>
                    else{
                      return <p key={i} style={{ marginRight: i18n.language==="ar" ? '45px': '0px' , marginLeft: i18n.language==="ar" ?'0px' : '45px'}}>{ell}</p>
          
                    }

                  })
                )
              }
  })}

        </Fragment>
    )))
  }
  }
  
  
  )
  
  )
}

// results for section and chapter 
const result = ()=> (
  singleNote.map((noteObject,rowIndex) => {

    let innerResult = [];
  
    for (let i = 0; i < keysToCheck.length; i++) {
  
      if ( noteObject[keysToCheck[i]] === "") {
        break; // Exit the inner loop
      }
  
  
      innerResult.push(fetchData(keysToCheck[i],noteObject));
  
    }
  
    return (
      <Fragment key={rowIndex}>
        <h3 className='note-number'>{noteObject.note_num}</h3>
        
        {innerResult}
  
      </Fragment>
    );
  })
  
)

//result for subChapter 
const result2 = ()=> (
  singleNote.map((noteObject,rowIndex) => {

    let innerResult = [];
  
    innerResult= keysSubChapeter.map((item,index) => {
  

  
      if((noteObject[item]?.length > 0 && item==="name_a") ||(noteObject[item]?.length > 0 && item==="name_b") || (noteObject[item]?.length > 0 &&item==="name_addition") )
      return(
        <h3 key={index} className='note-number'>{noteObject[item]}</h3> 
      )
      
      else if((noteObject[item]?.length > 0 && item==="note_a") || (noteObject[item]?.length > 0 && item==="note_b") || (noteObject[item]?.length > 0 && item==="additional_note"))
      return (
          fetchData(item,noteObject)
      )

      else return null

  })
  
    return (
      <Fragment key={rowIndex}>
        
  
        {innerResult}
  
      </Fragment>
    );
  })
  
)

// height: ownerID.toString()==="11"||ownerID.toString()==="74" ? '400px' : singleNote?.length ===0  ? 'auto' : singleNote?.length<=3 ? '450px':'450px' }
  return (
    <div className="modal" style={{ height:(isNoteHave===false || singleNote?.length ===0 || singleNote?.length <=3)  &&'auto' ,top: (checkSection && isSection && window.innerWidth <450) && "27%" , width: checkSection===true ? "99%":"100.8%",right:checkSection===true ?"0.5%":"-0.5%" ,display :display }}>
      
        <div className="modal-content">
            <div className="modal-description">
            
            {loading5===true ? 
            
            (
            
                <ul className="modal-info">
                
                <SkeletonModal ownerId={ownerID}/>

                </ul>
            )
            :
            (
            singleNote?.length > 0 && isNoteHave===true?
              <ul className="modal-info">
              {ownerID.toString().length < 3 ? result() : result2() }

              </ul>
              
              :<h2 className="modal-title">{t('labelProhibitedPage.notnotes')}</h2>
            )
            
            }
            </div>

            {/* <p onClick={()=>toggleModal(ownerID)} className="modal-close">اغلاق</p> */}
            <div className='modal-btn'>
            <button className='modal-close' onClick={()=>toggleModal(false,ownerID)}>
            {t('actions.buttonclose')}
            </button>
            </div>
        </div>
    
    </div>
  )
  
}

export default memo(ModalView)
