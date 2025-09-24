import { t } from 'i18next';
import './CardItem.css';
import { useTranslation } from 'react-i18next';


const CardItem = ({title,info,days,styleTitle,styleInfo,address,container,weight,unit,info2,info3}) => {
	const {t, i18n} = useTranslation();
	const isBookingTitle = title === t('bookingTitles.bookingPart');
	const isNameTitle = title === t('labelServices.name');
	const isEmailTitle = title === t('bookingTitles.labelEmail');
	const isPhoneTitle = title === t('labelServices.phone');

	const isPriceInfo = title === t('bookingTitles.labelTotalPrice');
	const isUSDUnit = title === t('bookingTitles.labelTotalPrice');

	// unit={t('bookingTitles.priceUnit')}

  return (
<div className={`${ isNameTitle || isEmailTitle ||isPhoneTitle ? 'card-item2' : 'card-item'}`}>
<span className='card-item_title'
		//  style=
		// {{styleTitle,
		// 	position: isBookingTitle ? 'relative' : 'inherit' ,
		// 	top: isBookingTitle ? '-70px' : 'inherit' ,
		// 	fontSize: isBookingTitle ? '20px' : '18px' ,
		// }}
		>
            {title}
        </span>


        <span className='card-item_info' style={styleInfo}>

            <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            {weight &&<span style={{fontWeight:'normal'}}>{weight}</span>}
            {unit&& <span   style=
			{{
				fontWeight:'normal',
				color: isUSDUnit ? '#0D3453' : '#727272' ,


				}}>{unit}</span>}
            </div>

            <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style=
			{{fontWeight:'normal',
				color: isPriceInfo ? '#0D3453' :  '#727272',
				fontWeight: isPriceInfo ? 'normal' :  'normal',
				fontSize: isPriceInfo ? '20px' :  '18px',



			}}>
            {info}
            </span>
            {container &&<span style={{fontWeight:'normal'}}>{container}</span>}
            </div>




            {days && <span >{days}</span>}


            {

            // (info2 && info3) &&
            // <div style={{display:'flex',flexDirection:'column'}} >
            // <span style={{fontWeight:'bold'}} className='three-contact-value'>
			// 	<span style={{fontWeight:'normal'}} className='three-contact-label1'>{t('labelServices.name')}:</span> {address}</span>
			// <br></br>
            // <span style={{fontWeight:'bold'}} className='three-contact-value'>
			// 	<span style={{fontWeight:'normal'}} className='three-contact-label2'>{t('bookingTitles.labelEmail')}:</span> {info2}</span>
			// <br></br>

            // <span style={{fontWeight:'bold'}} className='three-contact-value'>
			// 	<span style={{fontWeight:'normal'}} className='three-contact-label3'>{t('labelServices.phone')}:</span> {info3}</span>
            // </div>
            }
        </span>

    </div>
)
}

export default CardItem
