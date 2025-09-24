import { memo, useState, useCallback, useRef, useEffect } from "react";
import "./LastChild_GrandChild.css";
import { ReactComponent as PenIcon } from "../../../../../assets/icons/commercial_desc.svg";
import { ReactComponent as ImportCondtion } from "../../../../../assets/icons/import_conditions.svg";
import { ReactComponent as ExportCondtion } from "../../../../../assets/icons/export_conditions.svg";
import { ReactComponent as CalculatorIcon } from "../../../../../assets/icons/calculator.svg";
import { ReactComponent as ShareIcon } from "../../../../../assets/icons/share.svg";
import { ReactComponent as ImpoetExportConditions } from "../../../../../assets/icons/export_import_conditions.svg";
import { ReactComponent as ImpoetExportCorrect } from "../../../../../assets/icons/correct_import_export.svg";
import { ReactComponent as ImpoetExportError } from "../../../../../assets/icons/error_import_export.svg";
import { ReactComponent as ImpoetLicenseConditions } from "../../../../../assets/icons/import_license_condition.svg";
import { ReactComponent as AgriculturalQuarantine } from "../../../../../assets/icons/agricultural_quarantine.svg";
import { ReactComponent as Finance } from "../../../../../assets/icons/finance.svg";
import { ReactComponent as FinanceTerm } from "../../../../../assets/icons/finance_term.svg";
import Left from '../../../../../assets/images/left Arrow.png'

import { toast } from "react-toastify";

import { ReactComponent as LinkChain } from "../../../../../assets/icons/link-chain.svg";
import { ReactComponent as LinkBroken } from "../../../../../assets/icons/link-broken.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommerial,
  toggleOpenShare,
  toggleReset,
  saveScrollValue,
  storeTabLastChild,
  storeTabActiveLastChild,
  toggleTabLastChild,
  storeObjectFeesModal,
} from "../../../store/prohibitedTab/accordion.slice";
import SkeletonCommercial from "../../../../../components/Skeletons/SkeletonCommercial";
import { useTranslation } from "react-i18next";
import useQuery from "../../../../../hooks/useQuery";
import { useParams } from "react-router-dom";
const LastChild = ({ objectChild }) => {
  // console.log('objectChild:', objectChild); // ✅ This is valid

  // useEffect(() => {
  //   console.log('objectChild (on mount):', objectChild); // ✅ Also valid
  // }, [objectChild]);
  const { t, i18n } = useTranslation();
  const queryUrl=useQuery();
  const { lang } = useParams();

  const [isCopied, setIsCopied] = useState(false);



  const dispatch = useDispatch();
  const {
    isOpenShare,
    isResetIcon,
    singleCommerical,
    loadingCommercial,
    isOpen,
    activeTab,
  } = useSelector((state) => state.accordion);

  // const [activeTab, setActiveTab] = useState('');
  // const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
  console.log("👀 objectChild (Live):", objectChild);
}, [objectChild]);

  const handleTabClick = async (tabId, idChild = 1) => {
    if ((tabId === "tab5" && idChild !== null) || idChild === 1) {
      dispatch(toggleOpenShare(idChild));
      return;
    } else if (idChild === null) {
      dispatch(toggleOpenShare(idChild));
    }

    if (activeTab[objectChild.id] === tabId) {
      //منشان نعرف اول مرة بيفتح وبعدها تحول الى تغول

      // setIsOpen((prevState) => !prevState);
      // setIsOpen({...isOpen, [objectChild.id]: !(isOpen[objectChild.id])});
      dispatch(toggleTabLastChild(objectChild.id));

      // state.selectedCard = ({...state.selectedCard, [action.payload]: !(state.selectedCard[action.payload])})

      // if(tabId==="tab2"){
      //   setHeightCommerial(listRef.current.clientHeight);
      //   return;
      // }

      if (isOpen[objectChild.id] === false)
        if (tabId === "tab1") {
          try {

            if (singleCommerical[objectChild.id]) return;

            await dispatch(fetchCommerial(objectChild.id)).unwrap();
            setHeightCommerial(listRefCommerical.current.clientHeight);
          } catch (err) {
            toast.error(err, {
              position: "bottom-right",
              autoClose: 1800,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
          }
        }
    } else {
      //هنا الخطا للوصف تع ال ووودينغ

      // setActiveTab(tabId);
      // setActiveTab({...activeTab, [objectChild.id]: tabId});
      dispatch(storeTabActiveLastChild({ id: objectChild.id, tabId: tabId }));

      // if(tabId==="tab2"){
      //   setHeightCommerial(listRef.current.clientHeight);
      // }

      // setIsOpen(true);
      // setIsOpen({...isOpen, [objectChild.id]: true});
      dispatch(storeTabLastChild(objectChild.id));

      if (tabId === "tab1") {
        try {

          if (singleCommerical[objectChild.id]) return;

          await dispatch(fetchCommerial(objectChild.id)).unwrap();
          setHeightCommerial(listRefCommerical.current.clientHeight);
        } catch (err) {
          toast.error(err, {
            position: "bottom-right",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }

    if (tabId === "tab2") {
      setTimeout(() => {

        // setHeightCommerial2(listRef.current?.clientHeight);
      }, 10);
    }

    if (tabId === "tab3") {
      setTimeout(() => {

        // setHeightCommerial3(listRefExport.current?.clientHeight);
      }, 10);
    }
  };



  const [showReadMore, setShowReadMore] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const [showReadMore2, setShowReadMore2] = useState(false);
  const [isReadMore2, setIsReadMore2] = useState(false);

  const [showReadMore3, setShowReadMore3] = useState(false);
  const [isReadMore3, setIsReadMore3] = useState(false);

  const [getHeightCommerical, setHeightCommerial] = useState(0);



  const [getHeightCommerical2, setHeightCommerial2] = useState(0);
  const [getHeightCommerical3, setHeightCommerial3] = useState(0);

  const listRef = useRef();
  const listRefLines = useRef();
  const listRefLines2 = useRef();
  const listRefLines3 = useRef();

  const listRefCommerical = useRef();
  const listRefExport = useRef();
  useEffect(() => {
    if (listRef.current && activeTab[objectChild.id] === "tab2") {
      // Check the height of the list when it renders
      // const listHeight = listRef.current.clientHeight;
      // setShowReadMore(listHeight > 125);
      // setHeightCommerial(listRef.current.clientHeight);

      const divHeight = +listRef.current.offsetHeight
      const lineHeight = parseInt(window.getComputedStyle(listRef.current).lineHeight);
      listRefLines.current=divHeight / lineHeight;

      if(listRefLines.current > 4){

        setIsReadMore(true)
        setHeightCommerial(parseInt(window.getComputedStyle(listRef.current).lineHeight) * 4);

      }else{
        // setIsReadMore(false)
      }




    }

    if (listRefExport.current && activeTab[objectChild.id] === "tab3") {
      // Check the height of the list when it renders
      const divHeight = +listRefExport.current.offsetHeight
      const lineHeight = parseInt(window.getComputedStyle(listRefExport.current).lineHeight);
      listRefLines2.current=divHeight / lineHeight;

      if(listRefLines2.current > 4){
        setIsReadMore2(true)
        setHeightCommerial2(parseInt(window.getComputedStyle(listRefExport.current).lineHeight) * 4);

      }else{
        // setIsReadMore(false)
      }
    }

    if (listRefCommerical.current && activeTab[objectChild.id] === "tab1" &&singleCommerical[objectChild.id]  ) {
      const divHeight = +listRefCommerical.current.offsetHeight
      const lineHeight = parseInt(window.getComputedStyle(listRefCommerical.current).lineHeight);
      listRefLines3.current=divHeight / lineHeight;

      if(listRefLines3.current > 4){
        setIsReadMore3(true)
        setHeightCommerial3(parseInt(window.getComputedStyle(listRefCommerical.current).lineHeight) * 4);

      }else{
        // setIsReadMore(false)
      }
    }
  }, [activeTab,objectChild.id,loadingCommercial,singleCommerical]);

  const handleCalculator = (subChapterId, tab) => {
    dispatch(saveScrollValue(window.scrollY));

    dispatch(toggleOpenShare(null));

    handleTabClick(tab);

    let id = subChapterId.trim();

    // navigate(`/customs-duties-calculator/${id}`);
    if(queryUrl.has("param")){
      if(lang===undefined)
          window.open(`/customs-duties-calculator/${id}?param=across-mean`, '_blank');
      else
          window.open(`/${i18n.language}/customs-duties-calculator/${id}?param=across-mean`, '_blank');


    // window.open(`/${i18n.language}/customs-duties-calculator/${id}?param=across-mean`, '_blank');
    }
    else {
      if(lang===undefined)
          window.open(`/customs-duties-calculator/${id}`, '_blank');
      else
          window.open(`/${i18n.language}/customs-duties-calculator/${id}`, '_blank');


    // window.open(`/${i18n.language}/customs-duties-calculator/${id}`, '_blank');
    }

  };

  const getActiveClass = (tabName, className) =>
    activeTab[objectChild.id] === tabName && isOpen[objectChild.id]
      ? className
      : "";

  const onCopy = useCallback(async  (e,text) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error('Unable to copy to clipboard.', err);
      setIsCopied(false); // Reset copy status on failure
    }


    // setCopied(true);
    dispatch(toggleReset());

    setTimeout(()=>{
      handleTabClick("tab5", objectChild.id)
    },[500])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

const handleShowFeedBack = (objectFees,nameTap) =>{

  if(nameTap===t('labelProhibitedPage.exportConditions')){
    dispatch(storeObjectFeesModal(
      {
        data:objectFees?.id,
        nameTap:nameTap,
        options: [
          t('labelProhibitedPage.exportConditions'),
          t('labelProhibitedPage.exportRestrictions'),
          t('labelProhibitedPage.agriculturalQuarantine'),
          t('labelProhibitedPage.finance')
      ]

      }
    ))
  }else{

    dispatch(storeObjectFeesModal(
      {
        data:objectFees?.id,
        nameTap:nameTap,
        options: [
          t('labelProhibitedPage.importRestrictions'),
          t('labelProhibitedPage.importConditionsLabel'),
          t('labelProhibitedPage.agriculturalQuarantine'),
          t('labelProhibitedPage.finance')
      ]

      }
    ))
  }


}

  return (
    <div className="last-child ">
                      {/* {console.log(objectChild)} */}

      <ul className="tabs-list">
        <li
          className={`last-child-icons`}
          onClick={() => handleTabClick("tab1", null)}
        >
          <div
            style={{display: i18n.language==='en' &&'none'}}
            className={`final-title  ${getActiveClass(
              "tab1",
              "active-selected"
            )}`}
          >
            <PenIcon className="final-logo" />
            <span className="final-line">{t('labelProhibitedPage.commercialDescription')}</span>
          </div>
        </li>

        {isOpen[objectChild.id] && (
          <div
            className={`content-tab ${getActiveClass(
              "tab1",
              "active-content"
            )}`}
          >
            {!singleCommerical[objectChild.id] && loadingCommercial ? (
              <SkeletonCommercial />
            ) : (
              singleCommerical[objectChild.id] && (
                <>
                  <div className="import-row4">
                    {/* <div className="import-row4-col1">
                      <SecondDescIcon className="col1-icon" />

                      <span className="col1-title">الوصف</span>
                    </div> */}

                    <div className="import-row4-col2" style={{flex:'0 1 98%'}}>
                      {singleCommerical[objectChild.id][
                        "commercial_descriptions"
                      ]?.length > 0 ? (
                        <ul
                          className="row4-list-numbers"
                          ref={listRefCommerical}
                          style={{
                            maxHeight: !isReadMore3||showReadMore3 ? "none":`${getHeightCommerical3.toString()+"px"}`  ,
                            overflow: "hidden",
                          }}
                        >
                          {singleCommerical[
                            objectChild.id
                          ].commercial_descriptions[0].second_description
                            .split("#")
                            .map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                        </ul>
                      ) : (
                        <span className="licsense-empty">{t('labelProhibitedPage.nothing')}</span>
                      )}

                    {isReadMore3 &&
                   (
                    <button
                      className="row4-btn"
                      onClick={() => setShowReadMore3(!showReadMore3)}
                    >
                      {showReadMore3 ? t('actions.readLess') : t('actions.readMore')}
                    </button>
                  )
                  }
                    </div>

                    <div className="btn-tab3" onClick={()=>handleShowFeedBack(objectChild,t('labelProhibitedPage.commercialDescription'))}>
                <button className="btn-tab3__button" >
                  {t('actions.feedback')}
                </button>
                    </div>


                  </div>


                </>
              )
            )}
          </div>
        )}

        {/* <span className="last-child-border" >|</span> */}

        <li
          className={`last-child-icons `}
          onClick={() => handleTabClick("tab2", null)}
        >
          <div
            className={`final-title ${getActiveClass(
              "tab2",
              "active-selected"
            )}`}
          >
            <ImportCondtion className="final-logo" />
            <span className="final-line">{t('labelProhibitedPage.importConditions')}</span>
          </div>
        </li>
        {isOpen[objectChild.id] && (
          <div
            className={`content-tab ${getActiveClass(
              "tab2",
              "active-content"
            )}`}
          >
            <div className="import-row-no-line">
              <div className="import-col">
                <span className="import-col-text">رسم الاستيراد:</span>

                <span className="import-col-icon">
            {objectChild.import_fee}
                </span>
              </div>

              <div className="import-col border-right">
                <div className="import-parent-text">
                <span className="import-col-text">رسم الخدمات:</span>
                <span className="import-col-text2">
                {/* {objectChild.full_import_fee} */}
                </span>
                </div>

                <span className="import-col-icon">
                               {objectChild.ser_all}

                </span>
              </div>
                   <div className="import-col border-right">
                <div className="import-parent-text">
                <span className="import-col-text">الواحدة:</span>
                <span className="import-col-text2">
                {/* {objectChild.full_import_fee} */}
                </span>
                </div>

                <span className="import-col-icon">
                               {objectChild.type}

                </span>
              </div>
            </div>
                   
                    <div className="import-row123">
              <div className="import-col">
                          <img src={Left} alt="Arrow Result"  className="rightImage"/>

                <span className="import-col-text">رسم الاستيراد الكامل :</span>

                <span className="import-col-icon">
  {parseInt(objectChild.full_import_fee)} $
                </span>
                 <span className="import-col-icon">
لكل 
                </span>
<span className="import-col-icon">
  {objectChild.type === "وزن" ? "طن" : objectChild.type}
</span>

                <img src={Left} alt="Arrow Result"  className="leftImage"/>
              </div>
              </div>

            <div className="import-row2">
              <div className="import-row2-col1">
                <ImpoetExportConditions className="row-col1-icon" />

                <span className="col1-title">{t('labelProhibitedPage.importRestrictions')}</span>
              </div>

              <div className="import-row2-col2">
{objectChild.import_fees?.length > 0 && objectChild.import_fees[0]?.import_allowed ? (
                  <>
                    <ImpoetExportCorrect className="col1-icon" />
                    <span className="col2-title">{t('labelProhibitedPage.importAllowed')}</span>
                  </>
                ) : (
                  <>
                    <ImpoetExportError className="col1-icon" />
                    <span className="col2-title">{t('labelProhibitedPage.importProhibited')}</span>
                  </>
                )}
              </div>

              <div className="btn-tab3" onClick={()=>handleShowFeedBack(objectChild,t('labelProhibitedPage.importConditions'))}>
                <button className="btn-tab3__button">
                  {t('actions.feedback')}
                </button>
              </div>

            </div>

   {objectChild.import_fees?.length > 0 ? (
  (objectChild.import_fees[0]?.restriction_import || objectChild.import_fees[0]?.document_import) ? (
    <div className="import-row3">
      <div className="import-row3-col1">
        <ImpoetLicenseConditions className="col1-icon" />
        <span className="col1-title">{t('labelProhibitedPage.importConditionsLabel')}</span>
      </div>

      <ul className="import-row3-col2">
        {objectChild.import_fees[0]?.restriction_import && (
          <li>{objectChild.import_fees[0].restriction_import}</li>
        )}
        {objectChild.import_fees[0]?.document_import && (
          <li>{objectChild.import_fees[0].document_import}</li>
        )}
      </ul>
    </div>
  ) : (
    <span></span>
  )
) : null}


            {objectChild.stone_farming?.length > 0 && (
              <div className="import-row4">
                <div className="import-row4-col1">
                  <AgriculturalQuarantine className="col1-icon" />

                  <span className="col1-title">{t('labelProhibitedPage.agriculturalQuarantine')}</span>
                </div>

                <div
                 className="import-row4-col2">
                  <ul
                    className="row4-list"
                    ref={listRef}
                    style={{
                      maxHeight: !isReadMore||showReadMore ? "none":`${getHeightCommerical.toString()+"px"}`  ,
                      overflow: "hidden",
                    }}
                  >
                   {objectChild.stone_farming[0]["ston_import"] && <li>{objectChild.stone_farming[0]["ston_import"]}</li>}
                    {objectChild.stone_farming[0]["ston_import_notes"] && <li>{objectChild.stone_farming[0]["ston_import_notes"]}</li>}
                  </ul>
                  {isReadMore &&
                   (
                    <button
                      className="row4-btn"
                      onClick={() => setShowReadMore(!showReadMore)}
                    >
                      {showReadMore ? t('actions.readLess') : t('actions.readMore')}
                    </button>
                  )
                  }
                </div>
              </div>
            )}

            {objectChild.finance?.length > 0 && (
              <div className="import-row5">
                <div className="import-row5-col1">
                  <Finance className="col1-icon" />

                  <span className="col1-title">{t('labelProhibitedPage.finance')}</span>
                </div>

                <div className="import-row5-col2">
                  <div className="row5-finance">
                    <ImpoetExportCorrect className="col1-icon" />
                    <span className="col2-title">{t('labelProhibitedPage.needsfinancing')}</span>
                  </div>

                  <div className="row5-finance">
                    <FinanceTerm className="col1-icon" />
                   { objectChild.finance[0]["finance"]&&
                    <span className="col2-title">
                      {t('labelProhibitedPage.financingTerm')}
                      <span className="finiace-number">
                        {objectChild.finance[0]["finance"]}
                      </span>
                    </span>
                   }
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* <span className="last-child-border" >|</span> */}

        <li
          className={`last-child-icons`}
          onClick={() => handleTabClick("tab3", null)}
        >
          <div
            className={`final-title ${getActiveClass(
              "tab3",
              "active-selected"
            )}`}
          >
            <ExportCondtion className="final-logo" />
            <span className="final-line">{t('labelProhibitedPage.exportConditions')}</span>
          </div>
        </li>
        {isOpen[objectChild.id] && (
          <div
            className={`content-tab ${getActiveClass(
              "tab3",
              "active-content"
            )}`}
          >
              <div className="import-row-no-line">
              <div className="import-col">
                <span className="import-col-text">رسم التصدير:</span>

                <span className="import-col-icon">
            {objectChild.export_fee}
                </span>
              </div>

              <div className="import-col border-right">
                <div className="import-parent-text">
                <span className="import-col-text">رسم الخدمات:</span>
                <span className="import-col-text2">
                {/* {objectChild.full_import_fee} */}
                </span>
                </div>

                <span className="import-col-icon">
  {objectChild.exp_se_Fe ?? "0"}

                </span>
              </div>
                   <div className="import-col border-right">
                <div className="import-parent-text">
                <span className="import-col-text">الواحدة:</span>
                <span className="import-col-text2">
                {/* {objectChild.full_import_fee} */}
                </span>
                </div>

                <span className="import-col-icon">
                               {objectChild.type}

                </span>
              </div>
            </div>
                   
                    <div className="import-row123">
              <div className="import-col">
                                <img src={Left} alt="Arrow Result"  className="rightImage"/>

                <span className="import-col-text">رسم التصدير الكامل  :</span>

                <span className="import-col-icon">
  {
    `${(Number(objectChild.export_fee || 0) + Number(objectChild.exp_se_Fe || 0)).toFixed(2)} $`
  }                </span>
                 <span className="import-col-icon">
لكل 
                </span>
<span className="import-col-icon">
  {objectChild.type === "وزن" ? "طن" : objectChild.type}
</span>

                <img src={Left} alt="Arrow Result"  className="leftImage"/>
              </div>
              </div>
            <div className="import-row2">
              <div className="import-row2-col1">
                <ImpoetExportConditions className="row-col1-icon" />

                <span className="col1-title">{t('labelProhibitedPage.exportRestrictions')}</span>
              </div>

              <div className="import-row2-col2">
{objectChild.export_fees?.length > 0 && objectChild.export_fees[0]?.export_allowed ? (
                  <>
                    <ImpoetExportCorrect className="col1-icon" />
                    <span className="col2-title"> {t('labelProhibitedPage.exportAllowed')}</span>
                  </>
                ) : (
                  <>
                    <ImpoetExportError className="col1-icon" />
                    <span className="col2-title">{t('labelProhibitedPage.exportProhibited')}</span>
                  </>
                )}
              </div>

              <div className="btn-tab3" onClick={()=>handleShowFeedBack(objectChild,t('labelProhibitedPage.exportConditions'))}>
                <button className="btn-tab3__button">
                  {t('actions.feedback')}
                </button>
              </div>

            </div>

          {objectChild.export_fees?.length > 0 ? (
  objectChild.export_fees[0]?.restriction_export ? (
    <div className="import-row3">
      <div className="import-row3-col1">
        <ImpoetLicenseConditions className="col1-icon" />
        <span className="col1-title">{t('labelProhibitedPage.exportConditions')}</span>
      </div>

      <ul className="import-row3-col2">
        <li>{objectChild.export_fees[0].restriction_export}</li>
      </ul>
    </div>
  ) : (
    <span></span>
  )
) : null}


            {objectChild.stone_farming?.length > 0 && (
              <div className="import-row4">
                <div className="import-row4-col1">
                  <AgriculturalQuarantine className="col1-icon" />

                  <span className="col1-title">{t('labelProhibitedPage.agriculturalQuarantine')}</span>
                </div>

                <div className="import-row4-col2">
                  <ul
                    className="row4-list"
                    ref={listRefExport}
                    style={{
                      maxHeight: !isReadMore2||showReadMore2 ? "none":`${getHeightCommerical2.toString()+"px"}`  ,
                      overflow: "hidden",
                    }}
                  >
                   {objectChild.stone_farming[0]["ston_export"] && <li>{objectChild.stone_farming[0]["ston_export"]}</li>}
                    {objectChild.stone_farming[0]["ston_export_notes"] &&<li>{objectChild.stone_farming[0]["ston_export_notes"]}</li>}
                  </ul>

                 {isReadMore2 &&
                   (
                    <button
                      className="row4-btn"
                      onClick={() => setShowReadMore2(!showReadMore2)}
                    >
                      {showReadMore2 ? t('actions.readLess') : t('actions.readMore')}
                    </button>
                  )
                  }
                </div>
              </div>
            )}
          </div>
        )}

        {/* <span className="last-child-border" >|</span> */}

        {/* <li
          className={`last-child-icons ${getActiveClass(
            "tab4",
            "active-selected"
          )}`}
          onClick={() => handleCalculator(objectChild.id, "tab4")}
        >
          <div className="final-title">
            <CalculatorIcon className="final-logo" />
            <span className="final-line">{t('labelProhibitedPage.feeCalculation')}</span>
          </div>
        </li> */}

        {/* <span className="last-child-border" >|</span> */}

        <li
          className={`last-child-icons `}
          onClick={() => handleTabClick("tab5", objectChild.id)}
        >
          <div className={`final-title`}>
            <ShareIcon className="final-logo" />
            <span className="final-line">{t('labelProhibitedPage.share')}</span>
          </div>

          {isOpenShare === objectChild.id && (
          <div
            className="dropdown-content"
            style={{
              top:
                (isOpen[objectChild.id] && window.innerWidth > 1000 && "100%") ||
                (isOpen[objectChild.id] && window.innerWidth < 1000 && "100%"),
            }}
          >
            <div onClick={(e)=> onCopy(e,lang===undefined ? `https://acrossmena.net/prohibited-permitted-materials/${objectChild.id}` : `https://acrossmena.net/${i18n.language}/prohibited-permitted-materials/${objectChild.id}`)} >

              <li className="info-copied">
                <span className="info-text">{t('labelProhibitedPage.copyItemLink')}</span>
                {isCopied && isResetIcon === false ? (
                  <LinkBroken className="info-icon" />
                ) : (
                  <LinkChain className="info-icon" />
                )}
              </li>
            </div>

          </div>
        )}
        </li>


      </ul>
    </div>
  );
};

export default LastChild;
