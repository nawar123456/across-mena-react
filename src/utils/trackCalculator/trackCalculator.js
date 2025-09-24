export const calculateProgress = (currentDate, nextDate , startDate) => {
  //nextDate : new Date(obj2?.arrival_date
  //startDat : new Date(obj1?.gatein_date)
    currentDate.setHours(0, 0, 0, 0);
    nextDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);



    let totalDays = (nextDate - startDate) / (1000 * 60 * 60 * 24);

    if(totalDays===0){// arrice and gatein same day will give 0 days as total so need to convert to 1 day -_-
      totalDays=1;
    }



    let currentDays = (currentDate - startDate) / (1000 * 60 * 60 * 24);//8
    // console.log("currentDays",currentDays)

    
    if(Math.round(currentDays) ===0)
    currentDays=1;

    if(currentDays <0 )// statr > current ==> - numbars OR NaN : when 23 -23 are same givs NaN
    currentDays =0;


    // console.log(currentDays,totalDays, "totalDays" )
    let percentage = Math.round((currentDays / totalDays) * 100);

    // console.log("percentage",percentage)
    // if(Number.isNaN(percentage) || percentage <=0){
    //   percentage=0;
    // }

    return Math.min(percentage,100);
  };