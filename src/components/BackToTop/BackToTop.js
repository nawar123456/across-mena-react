import './BackToTop.css';

import { ReactComponent as ArrowUpDouble} from '../../assets/icons/arrow-up-double-line.svg';

const BackToTop = ({showGoTop,scrollUp}) => {

    return (
      <>
        <div className={showGoTop} onClick={scrollUp}>
          <button className="goTop">
            <ArrowUpDouble className='goTop-icon'/>
          </button>
        </div>
      </>
    );
  };
  export default BackToTop;



