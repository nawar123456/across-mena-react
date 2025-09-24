function getProperty(obj, path) {
    return path.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);
  }

//return an array 
export function createNestedStructure(data, levels , name) {
    const nestedGroups =  data.reduce((result, student) => {
      let current = result;
  
      levels.forEach((level, i) => {
        const value = getProperty(student.data[0], level);
  
        if (i === levels.length - 1) {
          if (value !== undefined) {
            if (!current[value]) {
              current[value] = {};
            }

            switch(name){
              case "HsCode":
                current[value] = (student.data[0] );
                break
              case "Sub_Chapter":
                current[value] = ({ id: student.data[0].id , label: student.data[0].label ,review: student.data[0].review,review_value: student.data[0].review_value  });
                break
              case "Chapter":
                current[value] = ({ id: student.data[0].id , label: student.data[0].label  });
                break

              default://section
                current[value].push({ id: student.data[0].id , label: student.data[0].label ,name: student.data[0].name , image: student.data[0].image ,start: student.data[0].start , end: student.data[0].end  });
                break
            }

            

          }


        } else {
          const id = getProperty(student.data[0], level.slice(0, -3) + '.id');
          const label = getProperty(student.data[0], level.slice(0, -3) + '.label');
          const name = getProperty(student.data[0], level.slice(0, -3) + '.name');
          const image = getProperty(student.data[0], level.slice(0, -3) + '.image');
          const start = getProperty(student.data[0], level.slice(0, -3) + '.start');
          const end = getProperty(student.data[0], level.slice(0, -3) + '.end');

          const review = getProperty(student.data[0], level.slice(0, -3) + '.review');
          const review_value = getProperty(student.data[0], level.slice(0, -3) + '.review_value');


          if (value !== undefined) {
            if (!current[value]) {
              current[value] = { id,label,name,image,start,end,review,review_value, children: {} };
            }
            current = current[value].children;

          }
        }
      });
  
      return result;
    }, {});

    return nestedGroups

    // const arrayOfObjects = [];

    // for (const key in nestedGroups) {
    //   if (nestedGroups.hasOwnProperty(key)) {
    //     arrayOfObjects.push( {[key]:{ ...nestedGroups[key]}});
    //   }
    // }
    
    // return arrayOfObjects

  }


  export function groupDataByKeys(data) {
    const groupedData = {};
  
    data.forEach((item) => {
      const level1Key = Object.keys(item)[0];
      if (!groupedData[level1Key]) {
        groupedData[level1Key] = { ...item[level1Key] };
        groupedData[level1Key].children = {};
      }

  
      const level2Keys = Object.keys(item[level1Key].children || {});
  
      level2Keys.forEach((level2Key) => {
        if (!groupedData[level1Key].children[level2Key]) {
          groupedData[level1Key].children[level2Key] = { ...item[level1Key].children[level2Key] };
          groupedData[level1Key].children[level2Key].children = {};
        }
  
        const level3Keys = Object.keys(item[level1Key].children[level2Key].children || {});
  
        level3Keys.forEach((level3Key) => {
          if (!groupedData[level1Key].children[level2Key].children[level3Key]) {
            groupedData[level1Key].children[level2Key].children[level3Key] = { ...item[level1Key].children[level2Key].children[level3Key] };
          } else {
            groupedData[level1Key].children[level2Key].children[level3Key] = {
              ...groupedData[level1Key].children[level2Key].children[level3Key],
              ...item[level1Key].children[level2Key].children[level3Key],
            };
          }
        });
      });
    });

      // Convert the values of groupedData into an array
    const resultArray = Object.values(groupedData);
  
    return resultArray;
  }
  