import styles from './SelectBox.module.css';
import { useTranslation } from 'react-i18next';
export const CustomLoadingIndicator = () => (
    <div className="bouncing-loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
  );


  export const formatLabelMoveType = ({from,to, fromIcon , toIcon  }) => (

    <div className={styles['select-option']}>
      <div className={styles['select-from']}>
      <span>{from}</span>

      <div className={styles['select-flag']}>
      {fromIcon}
      </div>

      </div>


      <div className={styles['select-to']} >

      <div   className={styles['select-flag']} >
      {toIcon}
      </div>

      <span >{to}</span>
      </div>

    </div>
  );

  export const formatLabelGoodsType = ({label }) => (

    <div className={styles['select-goods']}>

      <div className={styles['select-label']}>
      <span >{label}</span>

      </div>

    </div>
  );


  export const formatLabelPort = ({origin,name}) => (
        <div className={styles['select-goods']}>
          <div className={styles['select-name']}>
          <span >{name}</span>
          </div>

          <div className={styles['select-name']}>
          <span >{origin?.label}</span>
          </div>


        </div>
  );

  export const formatLabelContainer = ({img,title,details,unit},{context}) => (
    <div className={styles['select-container']}>

    {context === 'menu' &&
    <div>
    <img className={styles['flag-img']} src={img} alt='icon container' />
    </div>
    }

    <div className={styles['container-details']}>
    <span>{title}</span>

    {context === 'menu' &&
    <span style={{color:'#a3a1a1'}}>
      {details} {unit}<sup>3</sup>
    </span>
    }
    </div>

    </div>
);

  export const customStyle =(IconMobile,Padding,cursor,errorValue,value,Icon,isRtl) => {
    return{
    singleValue: (provided , {selectProps }) => ({
      ...provided,
      span: {
        // backgroundColor: selectProps.menuIsOpen  ? '#fcc400' : 'initial',
        marginTop:'5px',
				color:'#0d3453',
      },
    }),

    container: (provided) => ({
      ...provided,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      padding: '0px',
      '@media (max-width: 480px)': { padding:'3px' },

    }),

    valueContainer:(provided) =>({
      ...provided,
      padding:'2px 8px'

    }),


    clearIndicator: (prevStyle) =>({
      ...prevStyle,
      display:'none',
    }),

    control: (prevStyle, { isFocused , isDisabled , selectProps}) => ({
      ...prevStyle,
      cursor:'pointer',
      borderRadius:'9px',
      // borderRadius:  errorOrigin !==null &&  errorOrigin !==null ? '7px' : '9px',
      fontSize: 'var(--font-size-input)',
      color: '#000',
      // border: '1px soild #b5b5b58c ',
      // borderBottomWidth: errorOrigin !==null &&  errorOrigin !==null ? '1px' : '2px',
      boxShadow: (isFocused ) ? '0px 0.5px 3px #ffc400' : '0px 0.5px 3px rgba(0,0,0,0.16)',
      background: '#fff',
      touchAction:'manipulation',
      width: '100% ',
      height: 'var(--height-input)',
      padding:  Padding?"12px 0px 0px 43px": (Icon) ? 'var(--padding-search-input-rtl)' :  '0px',
      '@media (max-width: 480px)': { padding:!IconMobile && '0px' },
      flexWrap:'none',
      borderColor:  (errorValue &&!value)? '#f60000': (isFocused ) ? '#ffc400' : '#b5b5b58c'  ,
      ':hover': {
        borderColor: errorValue &&!value? '#f60000': isFocused ? '#ffc400' : '#b5b5b58c',},

      }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: 'none',
      }),

      placeholder: (provided, state) => ({
        ...provided,
        color: 'rgba(114, 114, 114, 0.5)',
      }),
      
      option: (styles, {isSelected, isFocused}) => ({
        ...styles,
        backgroundColor:
        (isFocused && 'transparent') ||'transprearent',
        color:'#000c37',
        cursor:'pointer',
        fontSize:'14px',
				borderBottom :'1px solid #eaeaea' , // Add a separator line except for the last item

        "&:hover": {
        background: "#fffdaf"
      }
      }),
      menuList: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
        height: isRtl ? '12rem' : '12rem', // Determine the height of the selector in main page
        width:'100%',



      }),
      menu: (provided) => ({
        ...provided,
        zIndex:13,
        // position:'relative'
      }),
      loadingIndicator: (provided, state) => ({
      color: '#000',
      fontSize:'8px',
      paddingLeft:'10px',
      display:'none'

      }),

  }};

