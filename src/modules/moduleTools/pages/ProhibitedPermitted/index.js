import './loadingVideo.css'
import loadingVideo from '../../../../assets/images/loading.mp4'

import { useEffect,useRef } from 'react';
const ProhibitedPermitted = () => {
	const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, []);
	return (
    <div className="video-container">
      <video
			ref={videoRef}
			className="fullscreen-video"
			loop={true} muted={true} autoplay={true} playsinline={true} autoPlay
			>
        <source src={loadingVideo} type="video/mp4"
				 />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default ProhibitedPermitted;
