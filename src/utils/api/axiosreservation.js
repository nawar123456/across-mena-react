import axios from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import API_BASE_URL from "../../dbconfig";  // Adjust the import DB Used

const swalStyle = document.createElement('style');
swalStyle.innerHTML = `
    .swal2-confirm {
    background-color: #fcc400 !important;
    color:            white !important;
    border:           none ;
    width:            250px !important;
    font-size:        2em !important; /* Set font size */
    margin-left:80px;
    margin-right:80px;
    position:fixed;
    z-index:2000;
    }
`;
if (!document.querySelector('#swal-custom-style')) {
    const style = document.createElement('style');
    style.id = 'swal-custom-style';
    style.textContent = `
    .swal2-confirm {
    background-color: #fcc400 !important;
    color: white !important;
    border: none ;
    width: 225px !important;          /*work*/
    height:50px !important;
    font-size: 26px !important; /* change the size of the button  work*/
    margin-left:80px;
    margin-right:80px;
    margin-top:-20px
        }
    `;
    document.head.appendChild(style);
}
let baseURL=API_BASE_URL;
const headers = {
    language: 'ar',
    // Add any other headers you may need
  };

// Create an Axios instance
const axiosReservation = axios.create({
    baseURL,
    headers,
    withCredentials: true, // 👈 Required for CSRF

    }
    );

// Add a request interceptor to dynamically set the Content-Type header
axiosReservation.interceptors.request.use(
    (config) => {


        config.headers['language'] = localStorage.getItem('language');

        return config;
    },
    (error) => {
                console.log(Promise.reject(error));

        // return Promise.reject(error);
        // console.log(Promise.reject(error));
        // return Promise.reject(error);
    }
);

axiosReservation.interceptors.response.use(
    (response) => {
        const url = response.config.url; // Accessing the URL from the request config
        // console.log(url,"url",url.split('?')[0],"Sea_Shipping/FeedBack/")

        if(url=== "Sea_Shipping/helper/" || url==="Sea_Shipping/contact_us/" || url=== "Sea_Shipping/FeedBack/" || url.split('?')[0] ==="Sea_Shipping/booking/" || url.split('?')[0] ==="Sea_Shipping/sea_shipping/" || url.split('?')[0] ==="Sea_Shipping/land_shipping/" ||url.split('?')[0] ==="Sea_Shipping/air_freight/"){




            Swal.fire({
                title: t('actions.titleSwa'),
                text: t('actions.titleSwaReservation'),
                icon: "success",
                confirmButtonText: t('actions.buttonSwa'),
                customClass: {
                confirmButton: 'custom-swal-confirm' // Apply the custom CSS class
                },
                didOpen: () => {
                    const confirmButton = document.querySelector('.swal2-confirm');
                    if (confirmButton) {
                        confirmButton.blur(); // Remove focus from the button
                    }
                }


            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace('/');
                    // window.location.href = '/'; // Redirect to the homepage
                }
            });
        }

        return response;
    },

    (error) => {

        if (axios.isCancel(error)) {
            // Handle cancellation as needed
            return Promise.reject(error);
        }

        const url = error.config.url;



        if( url.split('?')[0] ==="Sea_Shipping/booking/" || url ==="Sea_Shipping/contact_us/" || url==="Sea_Shipping/FeedBack/" || url.split('?')[0] ==="Sea_Shipping/sea_shipping/" || url.split('?')[0] ==="Sea_Shipping/land_shipping/"||url.split('?')[0] ==="Sea_Shipping/air_freight/"){

            Swal.fire({
                title: "خطأ!",
                text: "الرجاء اعاده المحاوله",
                icon: "error",
                confirmButtonText:"موافق",
                customClass: {
                    confirmButton: 'swal2-confirm'
                }


            });

            return Promise.reject(error);
        }

        if(url.split('?')[0] ==='Fee_calculator/search' ||url ==='Sea_Shipping/sea_shipping/' || url === '/tree_view/sections' || url === '/tree_view/search' || url === '/Fee_calculator/fees' || url ==='/Fee_calculator/origin')
        return Promise.reject(error);

        toast.error(error.message, {
            position: "bottom-right",
            autoClose: 1800,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            className : 'toast-message',
            progressClassName: 'toast-message-progress',
        })

        return Promise.reject(error);
    }
);

export {axiosReservation}
