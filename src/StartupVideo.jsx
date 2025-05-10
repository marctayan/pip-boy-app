import React, { useRef, useEffect } from 'react';

function StartupVideo({ onVideoEnd }){

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
    
        const handleEnded = () => {
          if (onVideoEnd) onVideoEnd();
        };
    
        if (video) {
          video.addEventListener('ended', handleEnded);
        }
    
        return () => {
          if (video) {
            video.removeEventListener('ended', handleEnded);
          }
        };
      }, [onVideoEnd]);

    return (
        <div
              className="startup"
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black', // optional for clean black background
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                id="video"
                width="800"
                height="480"
                style={{
                  display: 'block',
                }}
              >
                <source src='src/assets/startup.mp4' type="video/mp4"/>
              </video>
            </div>
    );
}

export default StartupVideo;