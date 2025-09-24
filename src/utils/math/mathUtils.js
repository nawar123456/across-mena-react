export const roundDollar = (result) => {

    const decimalPlaces = 2;
    const multiplier = 10 ** decimalPlaces;
    const roundedResult = Math.round(result * multiplier) / multiplier;

    return roundedResult ;

}

//بلاها
export const mathCeil = (resultFormatted) => {

    // let resultNearstTen =  Math.round(Math.ceil(resultFormatted) / 10) * 10;
    let resultNearstTen =  Math.ceil(resultFormatted)

    return resultNearstTen ;

}

export const formatNumber = (input) => {

    if(input.trim().length===0)
    return input;

    const sanitizedInput = input.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-point characters
    const parts = sanitizedInput.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands
    let fomattedPoint = parts.length > 1 ? parts.join('.') : parts[0];

    if ((fomattedPoint.match(/\./g) || []).length <= 1) {

        if (fomattedPoint === '.') {
            fomattedPoint = ''; // Prevent input from having just a decimal point
        }

    return fomattedPoint;


}


}

export const formatIntgerObly = (input)=>{

    if (/^\d*$/.test(input)) {
        
        return input
    }
}