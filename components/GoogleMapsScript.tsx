import React, { useEffect } from "react";

const GoogleMapsScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ6er_oEOeaAkaFAWtDvxiOaOF7D-NIKM&libraries=places`;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  console.log("GoogleMapsScript");
  return null;
};

export default GoogleMapsScript;
