import {useRouteError, useNavigate} from 'react-router-dom';
import   './NotFound.css';
import GoToTop from '../../components/GoToTop/GoToTop';
import useQuery from '../../hooks/useQuery';

const NotFound = () => {
    const error = useRouteError();
    const navigate =useNavigate();

    const queryUrl= useQuery();


    const handleNavigate = ()=>{
        
        if(queryUrl.has("param"))
        navigate(`${'/'}?param=across-mean` , { replace: true });
        else
        navigate('/', { replace: true })
    }


    return (
        <>
            <GoToTop/>
            <div style={{marginTop:"20px",gap:'20px', textAlign:"center", display:'flex',justifyContent:"center",alignItems:"center", flexDirection:'column'}}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has ocuurred.</p>
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>

                <button className='btn-not-found' onClick={handleNavigate}>
                    Back
                </button>
            </div>
        </>

  )
}

export default NotFound
