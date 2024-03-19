import React from 'react';

export default function VideoBackground() {
  return (
    
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
            {/* <source src="/path/to/your/video.mp4" type="video/mp4" /> */}
            <source src="../assets/shoppingCart.webm" type="video/webm" />
            Your browser does not support the video tag.
        </video>      
  )
}
