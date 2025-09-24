
import {createBrowserRouter  } from 'react-router-dom'
import  {  lazy } from 'react';
import ResultsBook from '../modules/moduleMain/pages/ResultsBook/ResultsBook';
import Home  from '../modules/moduleMain/pages/Home';
import AddBook from '../modules/moduleMain/pages/AddBook';
// import ProhibitedPermitted from '../modules/moduleTools/pages/ProhibitedPermitted';
import CustomsCalculator from '../modules/moduleTools/pages/CustomsCalculator';
import { Suspense } from 'react';
import CountryPortsAutocomplete from '../modules/moduleServices/components/common/AutoCompleteText/CountryPortsAutocomplete'
import CountryCitySelector from '../modules/moduleServices/components/common/AutoCompleteText/CountryCitySelector.js'
import TripleCountryCitySelector from '../modules/moduleServices/components/common/AutoCompleteText/TripleCountryCitySelector.js'


// import RequireAuth from '../modules/moduleAuth/components/RequireAuth';
import Logout from '../modules/moduleAuth/components/Logout';
import ImportExport from '../modules/moduleServices/pages/ImportExport/ImportExport.js';
import MainImpExp from '../modules/moduleTools/pages/ImportExport/MainImpExp.js'
// import { AuthProvider } from '../modules/moduleAuth/components/Auth';
// import ServiceLand from '../modules/moduleServices/pages/ServiceLand/ServiceLand';
// import ServiceSea from '../modules/moduleServices/pages/ServiceSea/ServiceSea';
// import ServiceAirPort from '../modules/moduleServices/pages/ServiceAirPort/ServiceAirPort';

const Track = lazy(()=> import('../modules/moduleTools/pages/Track/Track'));


const NotFound = lazy(() => import('../layout/NotFound/NotFound'));
const AuthLayout = lazy(() => import('../layout/AuthLayout/AuthLayout'));
// const  Login  = lazy(() => import('../modules/moduleAuth/pages/Login/Login'));
const  SignUp = lazy(() => import('../modules/moduleAuth/pages/SignUp/SignUp'));

const ContactUs = lazy(() => import('../modules/moduleMain/components/ContactUS/ContactUs.js'));
const AboutUs = lazy(() => import('../modules/moduleMain/components/AboutAs/AboutUs.js'));
const PrivacyPolicy = lazy(() => import('../modules/moduleMain/pages/PrivacyPolicy/PrivacyPolicy.js'));

const RootLayout = lazy(() => import('../layout/RootLayout/RootLayout'));
const PlainLayout = lazy(() => import('../layout/RootLayout/PlainLayout'));
// const CustomsCalculator = lazy(() => import('../modules/moduleTools/pages/CustomsCalculator'));
const ProhibitedPermitted = lazy(() => import('../modules/moduleTools/pages/ProhibitedPermitted'));
const MaherTariffa = lazy(() => import('../modules/moduleTools/pages/ProhibitedPermitted/maher.js'));
const ShippingCalculators = lazy(() => import('../modules/moduleTools/pages/ShippingCalculators/ShippingCalculators.js'));
const ContainerTypes = lazy(() => import('../modules/moduleTools/pages/ContainerTypes/ContainerTypes.js'));
const Incoterms = lazy(() => import('../modules/moduleTools/pages/Incoterms/Incoterms.js'));
const TradeTerms = lazy(() => import('../modules/moduleTools/pages/TradeTerms/TradeTerms.js'));
const TruckTypes = lazy(() => import('../modules/moduleTools/pages/TruckTypes/TruckTypes.js'));


// const Home = lazy(() => import('../modules/moduleMain/pages/Home'));
const ServiceSea = lazy(() => import('../modules/moduleServices/pages/ServiceSea/ServiceSea'));
const ServiceAirPort = lazy(() => import('../modules/moduleServices/pages/ServiceAirPort/ServiceAirPort'));
const ServiceLand = lazy(() => import('../modules/moduleServices/pages/ServiceLand/ServiceLand'));
const CustomsClearance = lazy(() => import('../modules/moduleServices/pages/CustomsClearance/Customsclearance.js'));

// const ResultsBook = lazy(() => import('../modules/moduleMain/pages/ResultsBook/ResultsBook'));


// const ServiceLand = lazy(() => import('../modules/moduleServices/pages/ServiceLand/ServiceLand'));
// const AddBook = lazy(() => import('../modules/moduleMain/pages/AddBook'));
const DetailsBook = lazy(() => import('../modules/moduleMain/pages/DetailsBook'));

const router = createBrowserRouter ([

    {
        path: '/:lang?',
        element:(
            // <Suspense fallback={<LoaderModal/>}>
             <RootLayout/>
            //  </Suspense>
             ),
        errorElement:  <NotFound/>,
        children :
        [
            {
                index:true,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                     <Home/>
                    //  </Suspense>
                     ) ,
            },
            {
                path :"prohibited-permitted-materials/:id" ,
                element: (
                    // <Suspense fallback={<LoaderModal/>}>
                        <ProhibitedPermitted/>
                    // </Suspense>
                ) ,

            },

            {
                path :"A.Maher-Tariffa/:id" ,
                element: (
                    // <Suspense fallback={<LoaderModal/>}>
                        <MaherTariffa/>
                    // </Suspense>
                ) ,

            },


            {
                path :"customs-duties-calculator/:id" ,
                element: (
                    // <Suspense fallback={<LoaderModal/>}>
                        <CustomsCalculator/>
                    // </Suspense>
                ),
            },

            {
                path :"services/sea-shipping" ,
                element: (
                    // <Suspense fallback={<LoaderModal/>}>
                        <ServiceSea/>
                    // </Suspense>
                ) ,
            },
            {
                path :"services/land-shipping" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                        <ServiceLand/>
                    // </Suspense>
                ) ,
            },
            {
                path :"services/airport-shipping" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <ServiceAirPort/>
                    // </Suspense>
                ),
            },

            {
                path :"services/customs-clearance" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <CustomsClearance/>
                    // </Suspense>
                ),
            },


            {
                path :"tools/container-types" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <ContainerTypes/>
                    // </Suspense>
                ),
            },

            
            {
                path :"tools/incoterms" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <Incoterms/>
                    // </Suspense>
                ),
            },

            
            {
                path :"tools/shipping-calculators" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <ShippingCalculators/>
                    // </Suspense>
                ),
            },

            {
                path :"tools/trade-terms" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <TradeTerms/>
                    // </Suspense>
                ),
            },

            {
                path :"tools/truck-types" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <TruckTypes/>
                    // </Suspense>
                ),
            },

             




            {
                path :"results-book" ,
                element:(
<ResultsBook/>

                    // </Suspense>
                ),
            },
            {
                path: "results-book/:slug",
                element: (
                  <Suspense fallback={<div>Loading booking page...</div>}>
                    <AddBook />
                  </Suspense>
                )
            },
            {
                path :"results-book/:slug/:slug" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                    // <RequireAuth>
                    <DetailsBook/>
                    // </RequireAuth>
                    // </Suspense>
                ),
            },
            {
                path:"contact-us",
                element: <ContactUs/>
            },

            {
                path:"about-us",
                element: <AboutUs/>
            },
            
            {
                path:"privacy-policy",
                element: <PrivacyPolicy/>
            },
             {
                path :"tools/import-export" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <CountryPortsAutocomplete/>
                    // </Suspense>
                ),
            },

            

            {
                path :"tools/main-import-export" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <MainImpExp/>
                    // </Suspense>
                ),
            },
            {

                
                
                path:"track",
                element: <Track/>
            }
        ]


    },
    
    // {
    //     path: '/:lang?/',
    //     element:(
    //          <AuthLayout/>
    //          ),
    //     errorElement:  <NotFound/>,
    //     children :
    //     [
    //         {
    //         path :"login" ,
    //         element: (
    //                 <Login/>
    //             ),
    //         },
    //         {
    //             path :"register" ,
    //             element: (
    //                     <SignUp/>
    //                 ),
    //         },
    //         {
    //             path :"logout" ,
    //             element: (
    //                     <Logout/>

    //                 ),
    //         },
    //         ]
	// 	},
 {
                path :"test/select-country-city" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <CountryCitySelector/>
                    // </Suspense>
                ),
            },

            {
                path :"test/triple-select-country-city" ,
                element:(
                    // <Suspense fallback={<LoaderModal/>}>
                       <TripleCountryCitySelector/>
                    // </Suspense>
                ),
            },
		{
			path: '/:lang?',
			element: <PlainLayout />,  // Using PlainLayout for routes without navbar and header
			children: [
				{
					path: 'tariffa-nawar/:id',  // Path without leading '/' for nested route
					element: <ProhibitedPermitted />,},
			],
		},
       
], {
  basename: '/'   // ✅ HERE YOU ADD IT
});
export default router;
