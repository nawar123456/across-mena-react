import './Counter.css';
import {ReactComponent as PlusThin } from '../../../../../assets/icons/plus-thin.svg';
import {ReactComponent as MinusThin } from '../../../../../assets/icons/minus-thin.svg';

const Counter = ({styleLand ,min,max,count,setIncrement,setDecrement,handleCountText,index,nameClass}) => {

    const handleIncrement = (e)=>{
        e.preventDefault();
        if (count < max) {
            // setCount(count + 1);
            setIncrement(index);
        }
    }

    const handleDecrement = (e)=>{
        e.preventDefault();
        if (count > min) {
            // setCount(count - 1);
            setDecrement(index);
        }
    }

    const handleCount = (e)=>{
        e.preventDefault();

        let number = Number(e.target.value);

        if (number >= min && number <= max) {
            handleCountText(index,number);
        }

        
        
    }



    return (
    <div className='counter' style={{width:styleLand?.styleWidth , flexDirection:styleLand?.dirction}}>

    <div className={`plus-number ${nameClass}`} style={{ border:styleLand?.styleBorderHide , borderTop:styleLand?.styleBorder }}  onClick={handleIncrement}>
        <PlusThin/>
    </div>

    <div className={`counter-line ${nameClass}`} >
                <input
                className={`counter-input ${nameClass}`}
                    type="number"
                    value={count}
                    onChange={handleCount}
                    min={0}
                    max={40}

                    style={{border:styleLand?.styleBorder , borderBottom:styleLand?.styleBorderHide}}
                />
    </div>

    <div className={`minus-number ${nameClass}`} style={{  border:styleLand?.styleBorderHide, borderTop:styleLand?.styleBorder  }} onClick={handleDecrement}>
        <MinusThin/>
    </div>
    
    </div>
    )
}

export default Counter
