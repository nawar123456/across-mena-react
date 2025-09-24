import { useEffect, useState } from 'react';
import imageTest from '../../../../assets/images/HeroHome.png';
import styles from './Hero.module.css';
import Part from './Part';
import { useTranslation } from 'react-i18next';



const Hero = ({image,image2,title,subTitle}) => {
  const { t, i18n } = useTranslation();

    let titleMobile = t('title.subtitlemainMobile');
    const [titleState, setTitle] = useState(title);
	// useEffect(() => {
  //       // Function to update the title based on window width
  //       const updateTitle = () => {
  //         if (window.innerWidth <=  450) {
  //           setTitle(titleMobile); // Replace with the title you want for screens <=  450px
  //         } else {
  //           setTitle(title);
  //         }
  //       };

  //       // Call the function initially to set the correct title
  //       updateTitle();

  //       // Add the event listener
  //       window.addEventListener('resize', updateTitle);

  //       // Cleanup function to remove the event listener
	// 			document.addEventListener("DOMContentLoaded", () => {
	// 				const globe = document.getElementById("globe");
	// 				const text = document.getElementById("text");

	// 				// Start animation after a delay (or immediately)
	// 				setTimeout(() => {
	// 					// Move the globe to the text
	// 					globe.style.transition = "top 2s ease-in-out";
	// 					globe.style.top = "50px"; // Same as text's `top`

	// 					// Wait for the animation to complete
	// 					setTimeout(() => {
	// 						// Hide the globe and enlarge the text
	// 						globe.style.opacity = "0"; // Hide globe
	// 						text.style.fontSize = "48px"; // Enlarge text
	// 					}, 2000); // Match the duration of the globe animation (2s)
	// 				}, 500); // Optional delay before starting the animation
	// 			});

  //       return () => {
  //         window.removeEventListener('resize', updateTitle);
  //       };
  //     }, [title]);


    // useEffect(() => {
    //     // Function to update the title based on window width
    //     const updateTitle = () => {
    //       if (window.innerWidth <=  450) {
    //         setTitle(titleMobile); // Replace with the title you want for screens <=  450px
    //       } else {
    //         setTitle(title);
    //       }
    //     };

    //     // Call the function initially to set the correct title
    //     updateTitle();

    //     // Add the event listener
    //     window.addEventListener('resize', updateTitle);

    //     // Cleanup function to remove the event listener
    //     return () => {
    //       window.removeEventListener('resize', updateTitle);
    //     };
    //   }, [title]);

  return (
    <>

    <div className={styles.banner}>
    <Part/>
    {/* <div className="text-overlay">Across-MENA your choise for global</div> */}
        <img src={imageTest} alt={title}  className={styles.slide1} id="globe" />
        {/* <img src={image2} alt={title}  className={styles.slide2} /> */}

        <div className={styles.content} style={{ direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
  <div className={styles.textoverlay} id='text'>Across-MENA your Best choise for Shipment</div>

  <h1 className={styles['content-title']}>{title}</h1>

  <hr className={styles.separator} />

  <p className={styles['content-sutbtitle']}>{subTitle}</p>
</div>

    </div>
    </>
)
}

export default Hero
