import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Loader } from '@googlemaps/js-api-loader';
import { setIsLoadedMap } from '../modules/moduleServices/store/seaTap/seaTap.slice';

export default function useLoadGoogleMaps() {
 const dispatch = useDispatch();
 const {isLoadedMap} = useSelector((state) => state.moduleServices.seaFormSlice);

 useEffect(() => {
  if (!isLoadedMap) {
    const loader = new Loader({
      apiKey: "AIzaSyDzQtgN_A7oFQlXrOJruKBVALWwdcjL23Q",
      libraries: ["places"],
    });

    loader.load().then((google) => {
      dispatch(setIsLoadedMap(true));
    }).catch((err) => {
      toast.error("Error loading Google Maps API", {
        position: "bottom-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        className: 'toast-message',
        progressClassName: 'toast-message-progress',
      });
    });

  }

 }, [dispatch, isLoadedMap]);

}