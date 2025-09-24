

export const containersArray = (containers,typeForm)=>{

    const transformedArray = containers.filter(item => item.valueCount > 0)
    .map(item =>
          {
        
        if(typeForm==="seaForm")
        return ({ container_type: item.title , container_number: item.valueCount , length:"0",width:"0",height:"0"})
        
        else if(typeForm==="landForm")
          return ({ truck_type: item.title , truck_number: item.valueCount })
        
          return null
         }
        )
         
        
  

      return transformedArray
}

