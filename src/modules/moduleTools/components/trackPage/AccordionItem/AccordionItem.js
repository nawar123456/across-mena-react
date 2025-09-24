import { useEffect, useRef } from 'react';
import './AccordionItem.css';
import {ReactComponent as Arrow } from '../../../../../assets/icons/arrow-down-final.svg';
import {ReactComponent as ContainerIcon } from '../../../../../assets/icons/original_container.svg';

import TrackTabelDetails from '../TrackTabelDetails/TrackTabelDetails';
import { t } from 'i18next';

const AccordionItem = ({assign_stations,updateBillRow, index ,arrayObjectsContainerTable,setArrayObjectsContainerTable,activeContainerNoAuto, handleToggle, active, itemObject }) => {

    const contentEl = useRef();
    const { container_number,container_type, id } = itemObject;

    //fill values depends on Object item
    useEffect(()=>{

        if(activeContainerNoAuto === index && active===null){
            const updatedBills = [...arrayObjectsContainerTable];
            updateBillRow(updatedBills,0,itemObject?.type_of_goods);
            updateBillRow(updatedBills,1,itemObject?.number_of_packages_in_container);
            updateBillRow(updatedBills,2,itemObject?.gross_weight);

            setArrayObjectsContainerTable(updatedBills);

        }else if (active?.id === id){
            const updatedBills = [...arrayObjectsContainerTable];

            updateBillRow(updatedBills,0,itemObject?.type_of_goods);
            updateBillRow(updatedBills,1,itemObject?.number_of_packages_in_container);
            updateBillRow(updatedBills,2,itemObject?.gross_weight);

            setArrayObjectsContainerTable(updatedBills);

        }
    
    },[active?.id])

    const styleTable = {
        background:'transparent',
        boxShadow:'none',
        padding:'0px',
        borderTop:'1px solid rgba(168, 168, 168, 0.7)',

    }


    return (
    <div  className={`rc-accordion-card ${active?.id === id ? 'active' : ''} `} >
    <div className="rc-accordion-header">
        <div className={`rc-accordion-toggle p-3 ${active?.id === id ? 'active' : ''} `} onClick={() => handleToggle(index,id,itemObject)}>
            <h5 className="rc-accordion-title">
            <div className='rc-accordion-secondtitle'>
                
                <ContainerIcon className='rc-accordion-secondtitle__icon'/>
                <span className='rc-accordion-secondtitle__text'>
                {container_number}
                </span>

                <span className='rc-accordion-secondtitle__type'>
                    {container_type}
                </span>

            </div>
                
            {assign_stations===true ?
            (
            (itemObject?.station_set?.length > 0 && index > 0) &&
            <span className='rc-accordion-editpath'>
                (
                    {t('labelTrackPage.changeContainer')}
                )
            </span>
            ) :
            ""
            }

            </h5>


            <Arrow className='rc-accordion-icon'/>

        </div>
    </div>
    <div ref={contentEl} className={`rc-collapse ${active?.id === id  ? 'show ' : ''} `} >

        
        
        <div className="rc-accordion-body">
        <TrackTabelDetails arrayObjects={arrayObjectsContainerTable} styleTable={styleTable} />

        </div>
        
    </div>
</div>
    )
}

export default AccordionItem
