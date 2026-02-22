import React, { useEffect } from "react";

const GreenTick = ({ w, h }) => {
  useEffect(() => {
    // Load the external script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
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
        src="https://lottie.host/45541cce-0738-420a-b53c-6e5880fb87aa/2kHeS7FqJL.json"
        background="transparent"
        speed="1"
        style={{ width: w, height: h }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default GreenTick;


