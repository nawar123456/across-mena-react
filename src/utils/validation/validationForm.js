import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validForm = (objectForm,typeForm)=>{
    let errorObject = {};
    

    // console.log(objectForm)
    //Type Of Move 
    if((objectForm.typeMove ===null &&typeForm !== "landForm") || (objectForm.typeMove ===undefined && typeForm !== "landForm")){
        errorObject.typeMove = "نوع الحركة مطلوب"
    }

    if(objectForm.selectFromPort ===null || objectForm.selectFromPort ===undefined){
        errorObject.selectFromPort = "هذا الحقل مطلوب"
    }
    if(objectForm.selectToPort ===null || objectForm.selectToPort ===undefined){
        errorObject.selectToPort = "هذا الحقل مطلوب"
    }

    //Weight Text 
    if (objectForm?.textWeightValue?.trim()?.length === 0 && typeForm !=="airport"){
        errorObject.textWeightValue = " وزن البضاعة مطلوب"
    }

    //Unit value 
    if((objectForm?.selectUnit ===null || objectForm?.selectUnit ===undefined)&& typeForm !=="airport" ){
        errorObject.selectUnit = "واحدة الوزن مطلوب"
    }

    //Date 
    if((objectForm?.selectDate ===null || objectForm?.selectDate===undefined)){
        
        errorObject.selectDate = " تاريخ وصول البضاعة مطلوب"
    }
    //Type of Goods 
    if((objectForm?.selectTypeGoods ===null || objectForm?.selectTypeGoods===undefined)&& typeForm !=="airport"){
        errorObject.selectTypeGoods = "فئة البضاعة مطلوب"
    }
    //Description of Goods
    // if(objectForm.textDescriptionGoods.trim().length === 0){
    //     errorObject.textDescriptionGoods = "وصف البضاعة مطلوب"
    // }
    
    //Profile Info name , company , phone , email
    if(objectForm.textPersonName.trim().length ===0){
        errorObject.textPersonName = "الاسم مطلوب"
    }
    // if(objectForm.textCompanyName.trim().length===0){
    //     errorObject.textCompanyName = "اسم الشركة مطلوب"
    // }
    if(objectForm.textPersonEmail.trim().length===0){
        // errorObject.textPersonEmail = "الايميل مطلوب"
    }
    else if(!validateEmail(objectForm.textPersonEmail)){
        errorObject.textPersonEmailValid = "الايميل غير صالح "
    }
    if(objectForm.textPhoneNumber.trim().length===0){
        errorObject.textPhoneNumber = "الهاتف مطلوب"
    }else if(!parsePhoneNumberFromString("+"+objectForm.textPhoneNumber)?.isValid()){
        errorObject.textPhoneNumberValid = "رقم الهاتف غير صالح "
    }

    if(objectForm?.counter?.length > 0){
        const allZeros = objectForm.counter.every(item => item.valueCount === 0);

        if(allZeros){
            errorObject.counter = "الرجاء إداخال عدد الحاويات"
        }
    }

    return errorObject;
}



export const validateEmail = (email) => {
    /* eslint-disable-next-line */
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };