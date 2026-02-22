import React, { useEffect } from "react";

const RedCross = ({w, h}) => {
  useEffect(() => {
    // Load the external script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <dotlottie-player
        src="https://lottie.host/161a67d6-0fd1-4d34-aa3d-ed6ef18ce83b/p5HhsyWoe6.json"
        background="transparent"
        speed="1"
        style={{ width: w, height: h }} // Fixed style syntax
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default RedCross;
